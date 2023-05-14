import { useState, useMemo } from "react";

import Map from "../../atoms/map";
import BottomSheet from "../../atoms/bottom-sheet";
import locksGeoJSON from "../../app/canalMap/public/assets/locks.json";
import canalGeoJSON from "../../app/canalMap/public/assets/canals.json";
import { getGeoJsonLockToAnnotations, getGeoJsonToOverlays } from "./utils";
import { useIsMapkitLoaded } from "../../utils/helpers/hooks";
import { StyledContainer } from "./styled";
import Search from "../../atoms/search";

const Main = () => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const isLoaded = useIsMapkitLoaded({ token: import.meta.env.VITE_TOKEN });

  const canalOverlayStyle = useMemo(() => {
    if (!isLoaded) return null;

    return new mapkit.Style({
      lineWidth: 4,
      lineJoin: "round",
      strokeColor: "#0000FF",
      strokeOpacity: 0.5,
    });
  }, [isLoaded]);

  const locksAnnotations = useMemo(() => {
    if (!isLoaded) return null;
    return getGeoJsonLockToAnnotations(locksGeoJSON as GeoJSON.FeatureCollection);
  }, [locksGeoJSON, isLoaded]);

  const canalOverlay = useMemo(() => {
    if (!isLoaded || !canalOverlayStyle) return null;
    return getGeoJsonToOverlays(canalGeoJSON as GeoJSON.FeatureCollection, canalOverlayStyle);
  }, [canalGeoJSON, canalOverlayStyle, isLoaded]);

  const handleOnSearchBlur = () => {
    setIsBottomSheetOpen(false);
  };
  const handleOnSearchFocus = () => {
    setIsBottomSheetOpen(true);
  };

  if (!isLoaded) return null;

  return (
    <StyledContainer>
      <Map
        id="canal-map"
        token={import.meta.env.VITE_TOKEN}
        showsUserLocation
        annotations={locksAnnotations ?? []}
        overlays={canalOverlay ?? []}
      />
      <BottomSheet snapPoints={[0, 50, 80]} isOpen={isBottomSheetOpen}>
        <Search onSearchBlur={handleOnSearchBlur} onSearchFocus={handleOnSearchFocus} />
      </BottomSheet>
    </StyledContainer>
  );
};

export default Main;
