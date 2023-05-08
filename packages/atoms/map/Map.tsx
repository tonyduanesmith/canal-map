import { useEffect, useRef } from "react";

import { StyledMapContainer } from "./styled";
import { gettingGeoCoordinates } from "./utils";
import lockClusterImageArray from "../icons/lock-cluster";
import { useIsMapkitLoaded } from "../../utils/helpers/hooks";

interface Props {
  token: string;
  id: string;
  showsUserLocation?: boolean;
  annotations: Array<mapkit.ImageAnnotation>;
  overlays: Array<mapkit.PolylineOverlay>;
}

const Map = ({ token, id, showsUserLocation = false, annotations, overlays }: Props) => {
  const mapRef = useRef<mapkit.Map>();

  const isLoaded = useIsMapkitLoaded({ token: import.meta.env.VITE_TOKEN });

  useEffect(() => {
    if (isLoaded) {
      const initializeMap = async () => {
        // get current location
        const result = await gettingGeoCoordinates();
        const { coords } = result;
        const currentRegion = new mapkit.CoordinateRegion(
          new mapkit.Coordinate(coords.latitude, coords.longitude),
          new mapkit.CoordinateSpan(0.167647972, 0.354985255),
        );

        // Create a map in the element whose ID is "map-container"
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
          };
          mapRef.current.region = currentRegion;
          mapRef.current.showsUserLocation = showsUserLocation;

          // Add overlays and annotations to the map
          mapRef.current.addOverlays(overlays);
          mapRef.current.addAnnotations(annotations);
        }
      };

      initializeMap();
    }
  }, [isLoaded, annotations, overlays]);

  return <StyledMapContainer id={id} />;
};

export default Map;
