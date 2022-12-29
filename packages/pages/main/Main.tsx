import React from "react";
import Map from "../../atoms/map";
import locksGeoJSON from "../../app/canalMap/public/assets/locks.json";
import { getGeoJsonToAnnotations } from "./utils";
import { useIsMapkitLoaded } from "../../utils/helpers/hooks";

const Main = () => {
  const isLoaded = useIsMapkitLoaded({ token: import.meta.env.VITE_TOKEN });
  if (isLoaded) {
    const locksAnnotations = getGeoJsonToAnnotations(locksGeoJSON as GeoJSON.FeatureCollection);
    return <Map id="canal-map" token={import.meta.env.VITE_TOKEN} showsUserLocation annotations={locksAnnotations} />;
  }
  return null;
};

export default Main;
