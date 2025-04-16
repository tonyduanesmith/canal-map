import { useEffect, useRef } from "react";
import { StyledMapContainer } from "./styled";
import { getGeoLocationWithCache } from "./utils";
import lockClusterImageArray from "../icons/lock-cluster";
import windingImage from "../icons/winding/winding.svg";
import bridgeImageArray from "../icons/bridge";
import { useIsMapkitLoaded } from "../../utils/helpers/hooks";
import { Coordinate, dijkstra, findPlacesNearPath, getCoordinatesToOverlay } from "../../pages/main/utils";
import Supercluster from "supercluster";

// GPU acceleration hint for MapKit annotations
const annotationGpuStyle = `
  .mktk-map .mktk-annotation-layer .mktk-annotation,
  .mktk-map .mktk-annotation-layer .mktk-annotation img {
    will-change: transform, opacity;
    backface-visibility: hidden;
    transform: translateZ(0);
  }
`;
const styleEl = document.createElement("style");
styleEl.textContent = annotationGpuStyle;
document.head.appendChild(styleEl);

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

  // Canvas clustering state
  const clusterIndexRef = useRef<any>(null);

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
          // Center map on initial region
          mapRef.current.region = currentRegion;

          // Build Supercluster index (once)
          if (!clusterIndexRef.current) {
            clusterIndexRef.current = new Supercluster({
              radius: 60,
              maxZoom: 16,
            }).load(
              annotations.map(ann => ({
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [ann.coordinate.longitude, ann.coordinate.latitude],
                },
                properties: { id: ann.data.id, annotation: ann, type: (ann as any).clusteringIdentifier },
              })),
            );
          }

          mapRef.current.addOverlays(overlays);

          // Function to update clusters as annotations
          const updateClusters = () => {
            // disable built-in clustering for raw annotations
            annotations.forEach(a => {
              (a as any).clusteringIdentifier = null;
            });

            const region = mapRef.current!.region;
            const width = mapRef.current!.element.clientWidth;
            const zoom = Math.floor(Math.log2((width * 360) / (region.span.longitudeDelta * 256)));
            const CLUSTER_ZOOM_THRESHOLD = 12;
            console.log(zoom);
            if (zoom > CLUSTER_ZOOM_THRESHOLD) {
              // at high zoom, skip clustering—show raw annotations in view
              const north = region.center.latitude + region.span.latitudeDelta / 2;
              const south = region.center.latitude - region.span.latitudeDelta / 2;
              const east = region.center.longitude + region.span.longitudeDelta / 2;
              const west = region.center.longitude - region.span.longitudeDelta / 2;
              const visible = annotations.filter(ann => {
                const lat = ann.coordinate.latitude;
                const lng = ann.coordinate.longitude;
                return lat >= south && lat <= north && lng >= west && lng <= east;
              });
              mapRef.current!.removeAnnotations(mapRef.current!.annotations);
              mapRef.current!.addAnnotations(visible);
              return;
            }

            const bbox = [
              region.center.longitude - region.span.longitudeDelta / 2,
              region.center.latitude - region.span.latitudeDelta / 2,
              region.center.longitude + region.span.longitudeDelta / 2,
              region.center.latitude + region.span.latitudeDelta / 2,
            ];
            const raw = (clusterIndexRef.current as any).getClusters(bbox, zoom);
            const anns = raw.map((c: any) => {
              if (c.properties.cluster) {
                // Determine cluster type and a representative angle
                const leaves = (clusterIndexRef.current as any).getLeaves(c.properties.cluster_id, Infinity);
                const first = leaves[0].properties as any;
                const type = first.type;
                const angle = first.annotation.data.angle ?? 0;

                // Choose the correct icon for this cluster
                let url: mapkit.ImageAnnotationConstructorOptions["url"];
                if (type === "lock") {
                  url = { 1: lockClusterImageArray[angle] };
                } else if (type === "winding") {
                  url = { 1: windingImage };
                } else if (type === "bridge") {
                  url = { 1: bridgeImageArray[angle] };
                } else {
                  url = { 1: lockClusterImageArray[0] };
                }

                return new mapkit.ImageAnnotation(
                  new mapkit.Coordinate(c.geometry.coordinates[1], c.geometry.coordinates[0]),
                  {
                    animates: false,
                    url,
                    size: { width: 20, height: 20 },
                    anchorOffset: new DOMPoint(0, -10),
                    data: { count: c.properties.point_count },
                  },
                );
              } else {
                // individual point
                return c.properties.annotation as mapkit.ImageAnnotation;
              }
            });
            // batch update
            mapRef.current!.removeAnnotations(mapRef.current!.annotations);
            mapRef.current!.addAnnotations(anns);
          };

          mapRef.current.addEventListener("region-change-end", updateClusters);
          // Use requestAnimationFrame for live cluster updates at 60fps
          let scheduled = false;
          (mapRef.current as any).addEventListener("region-change", () => {
            if (scheduled) return;
            scheduled = true;
            requestAnimationFrame(() => {
              updateClusters();
              scheduled = false;
            });
          });

          // Initial render
          updateClusters();
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
