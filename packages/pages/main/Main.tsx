import { useState, useMemo } from "react";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

import Map from "../../atoms/map";
import BottomSheet from "../../atoms/bottom-sheet";
import locksGeoJSON from "../../app/canalMap/public/assets/locks.json";
import canalGeoJSON from "../../app/canalMap/public/assets/canals.json";
import { getGeoJsonLockToAnnotations, getGeoJsonToOverlays } from "./utils";
import { useIsMapkitLoaded } from "../../utils/helpers/hooks";
import { StyledContainer, StyledSearchContainer } from "./styled";
import Search from "../../atoms/search";
import Button from "../../atoms/button";
import Box from "../../atoms/box/Box";

const Main = () => {
  const [selectedCoords, setSelectedCoords] = useState<mapkit.Coordinate | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [filterLocks, setFilterLocks] = useState<mapkit.ImageAnnotation[]>([]);
  const [snapPoint, setSnapPoint] = useState(1);
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

  const getFilteredLocks = useMemo(() => {
    if (!searchValue) return locksAnnotations;
    return filterLocks;
  }, [filterLocks, locksAnnotations, searchValue]);

  const handleOnSearchCancel = () => {
    setSnapPoint(1);
  };
  const handleOnSearchFocus = () => {
    setSnapPoint(0);
  };

  const handleOnSearchChange = async (value: string) => {
    const filterLocks = locksAnnotations?.filter(annotation =>
      annotation.title.toLowerCase().includes(value.toLowerCase()),
    );
    console.log(filterLocks);
    setFilterLocks(filterLocks ?? []);
    setSearchValue(value);
  };
  if (!isLoaded) return null;

  const handleOnRowClick = (annotation: mapkit.ImageAnnotation) => {
    setSnapPoint(2);
    setSelectedCoords(annotation.coordinate);
    console.log(annotation);
  };

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const annotation = getFilteredLocks?.[index];
    if (!annotation) return null;
    return (
      <div style={style} onClick={() => handleOnRowClick(annotation)}>
        <div>{annotation.title}</div>
      </div>
    );
  };

  return (
    <StyledContainer>
      <Map
        id="canal-map"
        token={import.meta.env.VITE_TOKEN}
        showsUserLocation
        annotations={locksAnnotations ?? []}
        overlays={canalOverlay ?? []}
        centerCoords={selectedCoords}
      />
      <BottomSheet snapPoints={[0, 50, 80]} setSnapPoint={snapPoint}>
        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
          <Search
            onSearchFocus={handleOnSearchFocus}
            value={searchValue}
            onChange={handleOnSearchChange}
            marginRight="md"
          />
          <Button onClick={handleOnSearchCancel}>Cancel</Button>
        </Box>
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={(height ?? 0) - 100}
              itemSize={50}
              itemCount={getFilteredLocks?.length ?? 0}
              width={width ?? 0}
            >
              {Row}
            </List>
          )}
        </AutoSizer>
      </BottomSheet>
    </StyledContainer>
  );
};

export default Main;
