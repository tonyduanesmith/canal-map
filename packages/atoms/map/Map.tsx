import { useEffect, useRef } from "react";
import { StyledMapContainer } from "./styled";
import { getGeoLocationWithCache } from "./utils";
import lockClusterImageArray from "../icons/lock-cluster";
import windingImage from "../icons/winding/winding.svg";
import { useIsMapkitLoaded } from "../../utils/helpers/hooks";

interface Props {
  token: string;
  id: string;
  showsUserLocation?: boolean;
  annotations: Array<mapkit.ImageAnnotation>;
  overlays: Array<mapkit.PolylineOverlay>;
  centerCoords: mapkit.Coordinate | null;
}

const Map = ({ token, id, showsUserLocation = false, annotations, overlays, centerCoords }: Props) => {
  const mapRef = useRef<mapkit.Map>();
  const isLoaded = useIsMapkitLoaded({ token: import.meta.env.VITE_TOKEN });
  const zoomThreshold = new mapkit.CoordinateSpan(0.3, 0.3);

  const handleZoomChange = () => {
    const currentSpan = mapRef.current?.region.span;

    if ((currentSpan?.latitudeDelta ?? 0) < zoomThreshold.latitudeDelta && 
        (currentSpan?.longitudeDelta ?? 0) < zoomThreshold.longitudeDelta) {
        // Show annotations
        mapRef.current?.addAnnotations(annotations);
    } else {
        // Hide annotations
        mapRef.current?.removeAnnotations(annotations);
    }
  }

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
          mapRef.current = new mapkit.Map(id);
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
                  width: 30,
                  height: 30,
                },
                anchorOffset: new DOMPoint(0, -15),
                animates: false,
              });
            }
            if (clusterAnnotation.clusteringIdentifier === "winding") {
              return new mapkit.ImageAnnotation(clusterAnnotation.coordinate, {
                url: {
                  1: windingImage,
                },
                size: {
                  width: 30,
                  height: 30,
                },
                anchorOffset: new DOMPoint(0, -15),
                animates: false,
              });
            }
          };

          mapRef.current.region = currentRegion;
          mapRef.current.showsUserLocation = showsUserLocation;

          mapRef.current.addOverlays(overlays);

          mapRef.current.addEventListener('region-change-end', handleZoomChange);
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

  return <StyledMapContainer id={id} />;
};

export default Map;
