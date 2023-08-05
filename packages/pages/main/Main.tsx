import { useState, useMemo, useRef } from "react";
import { FixedSizeList as List, ListOnScrollProps } from "react-window";

import Map from "../../atoms/map";
import BottomSheet from "../../atoms/bottom-sheet";
import locksGeoJSON from "../../app/canalMap/public/assets/locks.json";
import canalGeoJSON from "../../app/canalMap/public/assets/canals.json";
import { getGeoJsonLockToAnnotations, getGeoJsonToOverlays } from "./utils";
import { useIsMapkitLoaded } from "../../utils/helpers/hooks";
import Search from "../../atoms/search";
import Button from "../../atoms/button";
import Box from "../../atoms/box/Box";
import { StyledLocationWrapper } from "./styled";
import { getGeoLocationWithCache } from "../../atoms/map/utils";
import SearchList from "../../organisms/search-list";
import ClosestSection from "../../organisms/closest-section";

const Main = () => {
  const [firstScroll, setFirstScroll] = useState(true);
  const [selectedCoords, setSelectedCoords] = useState<mapkit.Coordinate | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [filterLocks, setFilterLocks] = useState<mapkit.ImageAnnotation[]>([]);
  const [snapPoint, setSnapPoint] = useState({ snapPoint: 50, forceUpdate: false });
  const [disableGesture, setDisableGesture] = useState(false);
  const isLoaded = useIsMapkitLoaded({ token: import.meta.env.VITE_TOKEN });
  const isScrollable = snapPoint.snapPoint === 7;

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
    setSnapPoint({ snapPoint: 50, forceUpdate: true });
  };
  const handleOnSearchFocus = () => {
    setSnapPoint({ snapPoint: 7, forceUpdate: true });
  };

  const handleOnSearchChange = async (value: string) => {
    const filterLocks = locksAnnotations?.filter(annotation =>
      annotation.title.toLowerCase().includes(value.toLowerCase()),
    );
    setFilterLocks(filterLocks ?? []);
    setSearchValue(value);
  };

  if (!isLoaded) return null;

  const handleOnListItemClick = (annotation: mapkit.ImageAnnotation) => {
    setSnapPoint({ snapPoint: 2, forceUpdate: true });
    setSelectedCoords(annotation.coordinate);
  };

  const handleOnLocationClick = async () => {
    try {
      const result = await getGeoLocationWithCache();
      const { longitude, latitude } = result;
      const mapkitCoords = new mapkit.Coordinate(latitude, longitude);
      setSelectedCoords(mapkitCoords);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSnapPointChange = (newSnapPoint: { snapPoint: number; forceUpdate: boolean }) => {
    setSnapPoint({ snapPoint: newSnapPoint.snapPoint, forceUpdate: false });
  };

  const handleOnScroll = (scrollProps: ListOnScrollProps) => {
    if (firstScroll) {
      setFirstScroll(false);
      return;
    }

    if (scrollProps.scrollOffset === 0 && scrollProps.scrollDirection === "backward") {
      setDisableGesture(false);
    } else {
      setDisableGesture(true);
    }
  };

  return (
    <Box width="100%" height="100%" position="relative">
      <Map
        id="canal-map"
        token={import.meta.env.VITE_TOKEN}
        showsUserLocation
        annotations={locksAnnotations ?? []}
        overlays={canalOverlay ?? []}
        centerCoords={selectedCoords}
      />
      {/* <StyledLocationWrapper>
        <LocationButton onClick={handleOnLocationClick} />
      </StyledLocationWrapper> */}

      <BottomSheet
        snapPoints={[7, 50, 80]}
        setSnapPoint={snapPoint}
        onSnapPointChange={handleSnapPointChange}
        disableGesture={disableGesture}
      >
        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
          <Search
            onSearchFocus={handleOnSearchFocus}
            value={searchValue}
            onChange={handleOnSearchChange}
            marginRight="md"
          />
            <Button onClick={handleOnSearchCancel}>Cancel</Button>
        </Box>
        {snapPoint.snapPoint === 7 && (
          <SearchList
            isScrollable={isScrollable}
            onScroll={handleOnScroll}
            itemCount={getFilteredLocks?.length ?? 0}
            items={getFilteredLocks ?? []}
            onClick={handleOnListItemClick}
          />
        )}
        {snapPoint.snapPoint !== 7 && <ClosestSection />}
      </BottomSheet>
    </Box>
  );
};

export default Main;
