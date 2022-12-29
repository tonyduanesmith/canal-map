import React, { useEffect, useRef } from "react";

import { StyledMapContainer } from "./styled";
import { gettingGeoCoordinates } from "./utils";
import lockClusterImageArray from "../icons/lock-cluster";

interface Props {
  token: string;
  id: string;
  showsUserLocation?: boolean;
  annotations: any;
}

const Map = ({ token, id, showsUserLocation = false, annotations }: Props) => {
  const mapRef = useRef<mapkit.Map>();

  useEffect(() => {
    const setupMapKitJs = async () => {
      //@ts-ignore
      if (!window.mapkit || window.mapkit.loadedLibraries.length === 0) {
        // mapkit.core.js or the libraries are not loaded yet.
        // Set up the callback and wait for it to be called.
        await new Promise(resolve => {
          //@ts-ignore
          window.initMapKit = resolve;
        });

        // Clean up
        //@ts-ignore
        delete window.initMapKit;
      }

      mapkit.init({
        authorizationCallback: done => {
          done(token);
        },
      });
    };

    const main = async () => {
      await setupMapKitJs();

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
        mapRef.current.region = currentRegion;
        mapRef.current.showsUserLocation = showsUserLocation;
        mapRef.current.showItems(annotations);
        mapRef.current.annotationForCluster = clusterAnnotation => {
          if (clusterAnnotation.clusteringIdentifier === "lock") {
            const angle = clusterAnnotation.memberAnnotations[0].data?.angle ?? 0;
            const count = clusterAnnotation.memberAnnotations.length;
            console.log(count);
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
      }
    };

    main();
  }, []);
  return <StyledMapContainer id={id} />;
};

export default Map;
