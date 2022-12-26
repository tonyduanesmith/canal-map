import React, { useEffect, useRef } from "react";

import { StyledMapContainer } from "./styled";
import { gettingGeoCoordinates } from "./utils";

interface Props {
  token: string;
  id: string;
  showsUserLocation?: boolean;
}

const Map = ({ token, id, showsUserLocation = false }: Props) => {
  const mapRef = useRef<mapkit.Map>();

  useEffect(() => {
    const setupMapKitJs = async () => {
      console.log("setup");
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
      console.log("main");
      await setupMapKitJs();

      const result = await gettingGeoCoordinates();
      const { coords } = result;

      const currentRegion = new mapkit.CoordinateRegion(
        new mapkit.Coordinate(coords.latitude, coords.longitude),
        new mapkit.CoordinateSpan(0.167647972, 0.354985255),
      );

      // Create a map in the element whose ID is "map-container"
      if (mapRef.current === undefined) {
        console.log("new map");
        mapRef.current = new mapkit.Map(id);
      }
      if (mapRef.current) {
        console.log("add cup");
        mapRef.current.region = currentRegion;
        mapRef.current.showsUserLocation = showsUserLocation;
        console.log(mapRef.current.annotations);
      }
    };

    main();
  }, []);
  return <StyledMapContainer id={id} />;
};

export default Map;
