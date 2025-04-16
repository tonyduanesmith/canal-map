import { useEffect, useRef } from "react";
import { StyledMapContainer } from "./styled";
import { getGeoLocationWithCache } from "./utils";
import lockClusterImageArray from "../icons/lock-cluster";
import windingImage from "../icons/winding/winding.svg";
import bridgeImage from "../icons/bridge/bridge.svg";
import { useIsMapkitLoaded } from "../../utils/helpers/hooks";
import { Coordinate, dijkstra, findPlacesNearPath, getCoordinatesToOverlay } from "../../pages/main/utils";

type MapProps = {
  token: string;
  id: string;
  showsUserLocation?: boolean;
  annotations: Array<mapkit.ImageAnnotation>;
  overlays: Array<mapkit.PolylineOverlay>;
  centerCoords: mapkit.Coordinate | null;
  startCoords: Coordinate | null;
  endCoords: Coordinate | null;
  path: Array<Coordinate>;
};

const Map = ({
  token,
  id,
  showsUserLocation = false,
  annotations,
  overlays,
  centerCoords,
  startCoords,
  endCoords,
  path,
}: MapProps) => {
  const pathOverlayRef = useRef<mapkit.PolylineOverlay>();
  const mapRef = useRef<mapkit.Map>();
  const isLoaded = useIsMapkitLoaded({ token: import.meta.env.VITE_TOKEN });
  const renderQueue = useRef<mapkit.ImageAnnotation[]>([]);
  const isRendering = useRef(false);
  const visibleAnnotations = useRef(new Set<mapkit.ImageAnnotation>());

  const isAnnotationInView = (annotation: mapkit.ImageAnnotation, region: mapkit.CoordinateRegion) => {
    const { latitude, longitude } = annotation.coordinate;
    const north = region.center.latitude + region.span.latitudeDelta / 2;
    const south = region.center.latitude - region.span.latitudeDelta / 2;
    const east = region.center.longitude + region.span.longitudeDelta / 2;
    const west = region.center.longitude - region.span.longitudeDelta / 2;

    return latitude >= south && latitude <= north && longitude >= west && longitude <= east;
  };

  const throttle = <T extends any[]>(func: (...args: T) => void, delay: number) => {
    let timeout: NodeJS.Timeout | null = null;
    return function (...args: T) {
      if (!timeout) {
        timeout = setTimeout(() => {
          func(...args);
          timeout = null;
        }, delay);
      }
    };
  };

  const renderAnnotations = () => {
    if (isRendering.current) return;

    isRendering.current = true;
    requestAnimationFrame(() => {
      const annotationsToRender = renderQueue.current.slice(0, 20); // Render 10 annotations at a time
      renderQueue.current = renderQueue.current.slice(20);

      annotationsToRender.forEach(annotation => {
        if (!visibleAnnotations.current.has(annotation)) {
          mapRef.current?.addAnnotation(annotation);
          visibleAnnotations.current.add(annotation);
        }
      });

      isRendering.current = false;

      if (renderQueue.current.length > 0) {
        renderAnnotations();
      }
    });
  };

  const handleZoomChange = throttle(() => {
    const currentRegion = mapRef.current?.region;

    if (currentRegion && currentRegion.span.latitudeDelta < 0.5) {
      // Determine which annotations should be visible
      const newVisibleAnnotations = annotations.filter(annotation => isAnnotationInView(annotation, currentRegion));

      // Add new annotations that are now in view
      const newAnnotations = newVisibleAnnotations.filter(annotation => !visibleAnnotations.current.has(annotation));
      renderQueue.current.push(...newAnnotations);

      // Remove annotations that are no longer in view
      visibleAnnotations.current.forEach(annotation => {
        if (!isAnnotationInView(annotation, currentRegion)) {
          mapRef.current?.removeAnnotation(annotation);
          visibleAnnotations.current.delete(annotation);
        }
      });

      renderAnnotations();
    } else {
      visibleAnnotations.current.forEach(annotation => {
        mapRef.current?.removeAnnotation(annotation);
      });
      visibleAnnotations.current.clear();
    }
  }, 100);

  useEffect(() => {
    if (isLoaded) {
      const initializeMap = async () => {
        const result = await getGeoLocationWithCache();
        const { longitude, latitude } = result;
        const currentRegion = new mapkit.CoordinateRegion(
          new mapkit.Coordinate(latitude, longitude),
          new mapkit.CoordinateSpan(0.167647972, 0.354985255),
        );

        if (mapRef.current === undefined) {
          mapRef.current = new mapkit.Map(id, {
            colorScheme: mapkit.Map.ColorSchemes.Dark,
          });
        }

        if (mapRef.current) {
          mapRef.current.annotationForCluster = clusterAnnotation => {
            if (clusterAnnotation.clusteringIdentifier === "lock") {
              const angle = clusterAnnotation.memberAnnotations[0]?.data?.angle ?? 0;
              return new mapkit.ImageAnnotation(clusterAnnotation.coordinate, {
                url: {
                  1: lockClusterImageArray[angle],
                },
                size: {
                  width: 20,
                  height: 20,
                },
                anchorOffset: new DOMPoint(0, -10),
                animates: false, // Disable animation for cluster annotations
              });
            }
            if (clusterAnnotation.clusteringIdentifier === "winding") {
              return new mapkit.ImageAnnotation(clusterAnnotation.coordinate, {
                url: {
                  1: windingImage,
                },
                size: {
                  width: 20,
                  height: 20,
                },
                anchorOffset: new DOMPoint(0, -10),
                animates: false, // Disable animation for cluster annotations
              });
            }
            if (clusterAnnotation.clusteringIdentifier === "bridge") {
              return new mapkit.ImageAnnotation(clusterAnnotation.coordinate, {
                url: {
                  1: bridgeImage,
                },
                size: {
                  width: 20,
                  height: 20,
                },
                anchorOffset: new DOMPoint(0, -10),
                animates: false, // Disable animation for cluster annotations
              });
            }
          };

          mapRef.current.region = currentRegion;
          mapRef.current.showsUserLocation = showsUserLocation;
          handleZoomChange(); // Initialize with the correct annotations in view
          mapRef.current.addOverlays(overlays);

          mapRef.current.addEventListener("region-change-end", handleZoomChange);
          // @ts-ignore
          mapRef.current._allowWheelToZoom = true;
        }
      };

      initializeMap();
    }
  }, [isLoaded, annotations, overlays]);

  useEffect(() => {
    if (mapRef.current && centerCoords) {
      const newRegion = new mapkit.CoordinateRegion(
        centerCoords,
        new mapkit.CoordinateSpan(0.0030647972, 0.00104985255),
      );
      mapRef.current.region = newRegion;
    }
  }, [centerCoords]);

  useEffect(() => {
    if (startCoords && endCoords && path && mapRef.current) {
      const pathOverlayStyle = new mapkit.Style({
        lineWidth: 8,
        lineJoin: "round",
        strokeColor: "blue",
        strokeOpacity: 0.5,
      });

      const pathOverlay = getCoordinatesToOverlay(path, pathOverlayStyle);

      if (pathOverlayRef.current) {
        mapRef.current.removeOverlay(pathOverlayRef.current);
      }

      mapRef.current.addOverlay(pathOverlay);

      pathOverlayRef.current = pathOverlay;

      // Calculate the region to zoom to
      const midLat = (startCoords[0] + endCoords[0]) / 2;
      const midLng = (startCoords[1] + endCoords[1]) / 2;
      const latSpan = Math.abs(startCoords[0] - endCoords[0]) * 1.5;
      const lngSpan = Math.abs(startCoords[1] - endCoords[1]) * 1.5;

      const region = new mapkit.CoordinateRegion(
        new mapkit.Coordinate(midLat, midLng),
        new mapkit.CoordinateSpan(latSpan, lngSpan),
      );

      // Set the map's region to zoom to the calculated area
      mapRef.current.setRegionAnimated(region);
    } else if (!startCoords && !endCoords && pathOverlayRef.current && mapRef.current) {
      mapRef.current.removeOverlay(pathOverlayRef.current);
    }
  }, [path]);

  return <StyledMapContainer id={id} />;
};

export default Map;
