import Map from "../../atoms/map";
import BottomSheet from "../../atoms/bottom-sheet";
import locksGeoJSON from "../../app/canalMap/public/assets/locks.json";
import canalGeoJSON from "../../app/canalMap/public/assets/canals.json";
import { getGeoJsonLockToAnnotations, getGeoJsonToOverlays } from "./utils";
import { useIsMapkitLoaded } from "../../utils/helpers/hooks";
import { StyledContainer } from "./styled";

const Main = () => {
  const isLoaded = useIsMapkitLoaded({ token: import.meta.env.VITE_TOKEN });
  if (isLoaded) {
    const locksAnnotations = getGeoJsonLockToAnnotations(locksGeoJSON as GeoJSON.FeatureCollection);
    const canalOverlayStyle = new mapkit.Style({
      lineWidth: 4,
      lineJoin: "round",
      strokeColor: "#0000FF",
      strokeOpacity: 0.5,
    });
    const canalOverlay = getGeoJsonToOverlays(canalGeoJSON as GeoJSON.FeatureCollection, canalOverlayStyle);
    return (
      <StyledContainer>
        <Map
          id="canal-map"
          token={import.meta.env.VITE_TOKEN}
          showsUserLocation
          annotations={locksAnnotations}
          overlays={canalOverlay}
        />
        <BottomSheet snapPoints={[0, 50, 80]}>
          <>test</>
        </BottomSheet>
      </StyledContainer>
    );
  }
  return null;
};

export default Main;
