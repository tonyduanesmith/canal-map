import { useState, useMemo, useEffect } from "react";
import { FixedSizeList as List, ListOnScrollProps } from "react-window";
import { useMediaQuery } from "react-responsive";
import { useTheme } from "styled-components";

import Map from "../../atoms/map";
import BottomSheet from "../../atoms/bottom-sheet";
import locksGeoJSON from "../../app/canalMap/public/assets/locks.json";
import bridgesGeoJSON from "../../app/canalMap/public/assets/bridges.json";
import canalGeoJSON from "../../app/canalMap/public/assets/canals.json";
import windingGeoJSON from "../../app/canalMap/public/assets/winding.json";
import trainsGeoJSON from "../../app/canalMap/public/assets/trains.json";
import {
  Coordinate,
  dijkstra,
  findPlacesNearPath,
  getClosestLocation,
  getGeoJsonLockToAnnotations,
  getGeoJsonBridgesToAnnotations,
  getGeoJsonToOverlays,
  getGeoJsonToTrainsAnnotations,
  getGeoJsonWindingToAnnotations,
} from "./utils";
import { useCurrentLocation } from "../../utils/helpers/hooks";
import Search from "../../atoms/search";
import Button from "../../atoms/button";
import Box from "../../atoms/box/Box";
import { StyledContainer, StyledLocationWrapper } from "./styled";
import { getGeoLocationWithCache } from "../../atoms/map/utils";
import SearchList from "../../organisms/search-list";
import ClosestSection from "../../organisms/closest-section";
import SelectedAnnotation from "../../organisms/selected-annotation";
import RouteSelector from "../../organisms/route-selector";
import Route from "../../organisms/route";
import { Place } from "./utils";
import IconButton from "../../atoms/icon-button";

type MainProps = {
  isLoaded: boolean;
};

const Main = ({ isLoaded }: MainProps) => {
  const [routeDistance, setRouteDistance] = useState(0);
  const [routePath, setRoutePath] = useState<Array<Coordinate>>([]);
  const [routeLocks, setRouteLocks] = useState<Array<Place>>([]);
  const [startAnnotation, setStartAnnotation] = useState<mapkit.Annotation | null>(null);
  const [endAnnotation, setEndAnnotation] = useState<mapkit.Annotation | null>(null);
  const [startSearchValue, setStartSearchValue] = useState("");
  const [endSearchValue, setEndSearchValue] = useState("");
  const [startCoords, setStartCoords] = useState<Coordinate | null>(null);
  const [endCoords, setEndCoords] = useState<Coordinate | null>(null);
  const [isStartSearchFocused, setIsStartSearchFocused] = useState(false);
  const [isEndSearchFocused, setIsEndSearchFocused] = useState(false);

  const isMobile = useMediaQuery({ maxWidth: 760 });
  const [firstScroll, setFirstScroll] = useState(true);
  const [selectedAnnotation, setSelectedAnnotation] = useState<mapkit.Annotation | null>(null);
  const [selectedCoords, setSelectedCoords] = useState<mapkit.Coordinate | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [filteredSearchAnnotations, setFilteredSearchAnnotations] = useState<mapkit.ImageAnnotation[]>([]);
  const [filteredStartSearchAnnotations, setFilteredStartSearchAnnotations] = useState<mapkit.ImageAnnotation[]>([]);
  const [filteredEndSearchAnnotations, setFilteredEndSearchAnnotations] = useState<mapkit.ImageAnnotation[]>([]);
  const [snapPoint, setSnapPoint] = useState({ snapPoint: 50, forceUpdate: false });
  const [disableGesture, setDisableGesture] = useState(false);
  const isScrollable = snapPoint.snapPoint === 7;
  const { currentLocation } = useCurrentLocation();
  const theme = useTheme();

  useEffect(() => {
    if (startCoords && endCoords) {
      const startCoordsOrdered: Coordinate = [startCoords[1], startCoords[0]];
      const endCoordsOrdered: Coordinate = [endCoords[1], endCoords[0]];

      const { path, distance } = dijkstra(startCoordsOrdered, endCoordsOrdered);
      const routeLocks = findPlacesNearPath(path, locksGeoJSON);
      setRouteDistance(distance);
      setRoutePath(path);
      setRouteLocks(routeLocks);
    }
  }, [startCoords, endCoords]);

  const canalOverlayStyle = useMemo(() => {
    if (!isLoaded) return null;

    return new mapkit.Style({
      lineWidth: 4,
      lineJoin: "round",
      strokeColor: theme.palette.system.blue.main,
      strokeOpacity: 0.5,
    });
  }, [isLoaded]);

  const locksAnnotations = useMemo(() => {
    if (!isLoaded) return [];
    return getGeoJsonLockToAnnotations(locksGeoJSON as GeoJSON.FeatureCollection) ?? [];
  }, [locksGeoJSON, isLoaded]);

  const bridgesAnnotations = useMemo(() => {
    if (!isLoaded) return [];
    return getGeoJsonBridgesToAnnotations(bridgesGeoJSON as GeoJSON.FeatureCollection) ?? [];
  }, [locksGeoJSON, isLoaded]);

  const windingAnnotations = useMemo(() => {
    if (!isLoaded) return [];
    return getGeoJsonWindingToAnnotations(windingGeoJSON as GeoJSON.FeatureCollection) ?? [];
  }, [windingGeoJSON, isLoaded]);

  const trainsAnnotations = useMemo(() => {
    if (!isLoaded) return [];
    return getGeoJsonToTrainsAnnotations(trainsGeoJSON as GeoJSON.FeatureCollection);
  }, [trainsGeoJSON, isLoaded]);

  const combinedMapAnnotations = useMemo(() => {
    return [...locksAnnotations, ...windingAnnotations, ...bridgesAnnotations];
  }, [locksAnnotations, windingAnnotations]);

  const combinedSearchAnnotations = useMemo(() => {
    return [...locksAnnotations, ...windingAnnotations, ...trainsAnnotations, ...bridgesAnnotations];
  }, [locksAnnotations, windingAnnotations, trainsAnnotations]);

  const canalOverlay = useMemo(() => {
    if (!isLoaded || !canalOverlayStyle) return [];
    return getGeoJsonToOverlays(canalGeoJSON as GeoJSON.FeatureCollection, canalOverlayStyle);
  }, [canalGeoJSON, canalOverlayStyle, isLoaded]);

  const getFilteredSearchAnnotations = useMemo(() => {
    if (!searchValue) return combinedSearchAnnotations;
    return filteredSearchAnnotations;
  }, [filteredSearchAnnotations, combinedSearchAnnotations, searchValue]);

  const getFilteredStartAnnotations = useMemo(() => {
    if (!startSearchValue) return combinedSearchAnnotations;
    return filteredStartSearchAnnotations;
  }, [filteredStartSearchAnnotations, combinedSearchAnnotations, startSearchValue]);

  const getFilteredEndAnnotations = useMemo(() => {
    if (!endSearchValue) return combinedSearchAnnotations;
    return filteredEndSearchAnnotations;
  }, [filteredEndSearchAnnotations, combinedSearchAnnotations, endSearchValue]);

  const handleOnSearchCancel = () => {
    setSnapPoint({ snapPoint: 50, forceUpdate: true });
    setDisableGesture(false);
    setSearchValue("");
    setSelectedAnnotation(null);
  };
  const handleOnSearchFocus = () => {
    setSnapPoint({ snapPoint: 7, forceUpdate: true });
    setSelectedAnnotation(null);
  };

  const handleOnSearchChange = async (value: string) => {
    const filteredSearchAnnotations = combinedSearchAnnotations?.filter(
      annotation =>
        annotation.title.toLowerCase().includes(value.toLowerCase()) ||
        annotation.data?.address?.subLocality?.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredSearchAnnotations(filteredSearchAnnotations ?? []);
    setSearchValue(value);
  };

  const handleOnStartAnnotationChange = async (value: string) => {
    const filteredStartSearchAnnotations = combinedSearchAnnotations?.filter(annotation => {
      return (
        annotation.title.toLowerCase().includes(value.toLowerCase()) ||
        annotation.data?.address?.subLocality?.toLowerCase().includes(value.toLowerCase())
      );
    });
    setFilteredStartSearchAnnotations(filteredStartSearchAnnotations ?? []);
    setStartSearchValue(value);
  };

  const handleOnEndAnnotationChange = async (value: string) => {
    const filteredEndSearchAnnotations = combinedSearchAnnotations?.filter(
      annotation =>
        annotation.title.toLowerCase().includes(value.toLowerCase()) ||
        annotation.data?.address?.subLocality?.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredEndSearchAnnotations(filteredEndSearchAnnotations ?? []);
    setEndSearchValue(value);
  };

  const closestLock = getClosestLocation(currentLocation, locksAnnotations ?? []);
  const closestWinding = getClosestLocation(currentLocation, windingAnnotations ?? []);
  const closestTrains = getClosestLocation(currentLocation, trainsAnnotations ?? []);

  const handleOnListItemClick = (annotation: mapkit.ImageAnnotation) => {
    setTimeout(() => {
      setSnapPoint({ snapPoint: 70, forceUpdate: true });
    }, 16);
    setSelectedCoords(annotation.coordinate);
    setSelectedAnnotation(annotation);
    setDisableGesture(false);
  };

  const handleStartAnnotationItemClick = (annotation: mapkit.ImageAnnotation) => {
    setTimeout(() => {
      setSnapPoint({ snapPoint: 70, forceUpdate: true });
    }, 16);
    setIsStartSearchFocused(false);
    setSelectedCoords(annotation.coordinate);
    setStartAnnotation(annotation);
    setStartSearchValue(annotation.title);
    setDisableGesture(false);
    setStartCoords([annotation.coordinate.latitude, annotation.coordinate.longitude]);
  };

  const handleEndAnnotationItemClick = (annotation: mapkit.ImageAnnotation) => {
    setTimeout(() => {
      setSnapPoint({ snapPoint: 70, forceUpdate: true });
    }, 16);
    setIsEndSearchFocused(false);
    setSelectedCoords(annotation.coordinate);
    setEndAnnotation(annotation);
    setEndSearchValue(annotation.title);
    setDisableGesture(false);
    setEndCoords([annotation.coordinate.latitude, annotation.coordinate.longitude]);
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
    if (newSnapPoint.snapPoint === 7) {
      setFirstScroll(true);
    }
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

  const handleSetStartAnnotation = () => {
    if (selectedAnnotation) {
      setStartAnnotation(selectedAnnotation);
      setStartSearchValue(selectedAnnotation?.title ?? "");
      setStartCoords([selectedAnnotation.coordinate.latitude, selectedAnnotation.coordinate.longitude]);
    }
  };

  const handleSetEndAnnotation = () => {
    if (selectedAnnotation) {
      setEndAnnotation(selectedAnnotation);
      setEndSearchValue(selectedAnnotation?.title ?? "");
      setEndCoords([selectedAnnotation.coordinate.latitude, selectedAnnotation.coordinate.longitude]);
    }
  };

  const handleCancelRoute = () => {
    setEndAnnotation(null);
    setStartAnnotation(null);
    setStartSearchValue("");
    setEndSearchValue("");
    setStartCoords(null);
    setEndCoords(null);
    setSelectedAnnotation(null);
    setSearchValue("");
  };

  const handleEndSearchFocus = () => {
    setIsEndSearchFocused(true);
    setIsStartSearchFocused(false);
  };

  const handleStartSearchFocus = () => {
    setIsStartSearchFocused(true);
    setIsEndSearchFocused(false);
  };

  const handleSetSelectedAnnotation = (): void => {
    setSelectedAnnotation(null);
  };

  return (
    <Box width="100%" height="100%" position="relative">
      <Map
        id="canal-map"
        token={import.meta.env.VITE_TOKEN}
        showsUserLocation
        annotations={combinedMapAnnotations}
        overlays={canalOverlay}
        centerCoords={selectedCoords}
        startCoords={startCoords}
        endCoords={endCoords}
        path={routePath}
      />
      {/* <StyledLocationWrapper>
        <LocationButton onClick={handleOnLocationClick} />
      </StyledLocationWrapper> */}
      {isMobile ? (
        <BottomSheet
          snapPoints={[7, 50, 70]}
          setSnapPoint={snapPoint}
          onSnapPointChange={handleSnapPointChange}
          disableGesture={disableGesture}
        >
          {startAnnotation || endAnnotation ? (
            <>
              <RouteSelector
                startSearchValue={startSearchValue}
                endSearchValue={endSearchValue}
                onStartSearchValueChange={handleOnStartAnnotationChange}
                onEndSearchValueChange={handleOnEndAnnotationChange}
                onCancelRoute={handleCancelRoute}
                onStartSearchFocus={handleStartSearchFocus}
                onEndSearchFocus={handleEndSearchFocus}
              />
              {isStartSearchFocused && (
                <SearchList
                  isScrollable
                  onScroll={handleOnScroll}
                  itemCount={getFilteredStartAnnotations?.length ?? 0}
                  items={getFilteredStartAnnotations ?? []}
                  onClick={handleStartAnnotationItemClick}
                  currentLocation={currentLocation}
                />
              )}
              {isEndSearchFocused && (
                <SearchList
                  isScrollable
                  onScroll={handleOnScroll}
                  itemCount={getFilteredEndAnnotations?.length ?? 0}
                  items={getFilteredEndAnnotations ?? []}
                  onClick={handleEndAnnotationItemClick}
                  currentLocation={currentLocation}
                />
              )}
              {routeDistance !== 0 && !isStartSearchFocused && !isEndSearchFocused && (
                <Route distance={routeDistance} routeLocks={routeLocks} />
              )}
            </>
          ) : (
            <>
              {selectedAnnotation ? (
                <Box>
                  <Box display="flex" justifyContent="flex-end">
                    <IconButton code="close" onClick={handleSetSelectedAnnotation} variant="grey" />
                  </Box>
                  <SelectedAnnotation
                    title={selectedAnnotation?.title}
                    coords={[selectedAnnotation.coordinate.latitude, selectedAnnotation.coordinate.longitude]}
                    onSetEndAnnotation={handleSetEndAnnotation}
                    onSetStartAnnotation={handleSetStartAnnotation}
                    address={selectedAnnotation.data.address}
                  />
                </Box>
              ) : (
                <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
                  <Search
                    onSearchFocus={handleOnSearchFocus}
                    value={searchValue}
                    onChange={handleOnSearchChange}
                    marginRight="md"
                  />
                  <Button onClick={handleOnSearchCancel}>Cancel</Button>
                </Box>
              )}
              {snapPoint.snapPoint === 7 && !selectedAnnotation && (
                <SearchList
                  isScrollable={isScrollable}
                  onScroll={handleOnScroll}
                  itemCount={getFilteredSearchAnnotations?.length ?? 0}
                  items={getFilteredSearchAnnotations ?? []}
                  onClick={handleOnListItemClick}
                  currentLocation={currentLocation}
                />
              )}
              {snapPoint.snapPoint !== 7 && !selectedAnnotation && (
                <ClosestSection
                  closestLock={closestLock}
                  onClick={handleOnListItemClick}
                  closestWinding={closestWinding}
                  closestTrains={closestTrains}
                />
              )}
            </>
          )}
        </BottomSheet>
      ) : (
        <StyledContainer>
          {startAnnotation || endAnnotation ? (
            <>
              <RouteSelector
                startSearchValue={startSearchValue}
                endSearchValue={endSearchValue}
                onStartSearchValueChange={handleOnStartAnnotationChange}
                onEndSearchValueChange={handleOnEndAnnotationChange}
                onCancelRoute={handleCancelRoute}
                onStartSearchFocus={handleStartSearchFocus}
                onEndSearchFocus={handleEndSearchFocus}
              />
              {isStartSearchFocused && (
                <SearchList
                  isScrollable
                  onScroll={handleOnScroll}
                  itemCount={getFilteredStartAnnotations?.length ?? 0}
                  items={getFilteredStartAnnotations ?? []}
                  onClick={handleStartAnnotationItemClick}
                  currentLocation={currentLocation}
                />
              )}
              {isEndSearchFocused && (
                <SearchList
                  isScrollable
                  onScroll={handleOnScroll}
                  itemCount={getFilteredEndAnnotations?.length ?? 0}
                  items={getFilteredEndAnnotations ?? []}
                  onClick={handleEndAnnotationItemClick}
                  currentLocation={currentLocation}
                />
              )}
              {routeDistance !== 0 && !isStartSearchFocused && !isEndSearchFocused && (
                <Route distance={routeDistance} routeLocks={routeLocks} />
              )}
            </>
          ) : (
            <>
              {selectedAnnotation ? (
                <Box>
                  <Box display="flex" justifyContent="flex-end">
                    <IconButton code="close" onClick={handleSetSelectedAnnotation} variant="grey" />
                  </Box>

                  <SelectedAnnotation
                    title={selectedAnnotation?.title}
                    coords={[selectedAnnotation.coordinate.latitude, selectedAnnotation.coordinate.longitude]}
                    onSetEndAnnotation={handleSetEndAnnotation}
                    onSetStartAnnotation={handleSetStartAnnotation}
                    address={selectedAnnotation.data.address}
                  />
                </Box>
              ) : (
                <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
                  <Search
                    onSearchFocus={handleOnSearchFocus}
                    value={searchValue}
                    onChange={handleOnSearchChange}
                    marginRight="md"
                  />
                  <Button onClick={handleOnSearchCancel}>Cancel</Button>
                </Box>
              )}
              {searchValue && !selectedAnnotation && (
                <SearchList
                  isScrollable={isScrollable}
                  onScroll={handleOnScroll}
                  itemCount={getFilteredSearchAnnotations?.length ?? 0}
                  items={getFilteredSearchAnnotations ?? []}
                  onClick={handleOnListItemClick}
                  currentLocation={currentLocation}
                />
              )}
              {!searchValue && !selectedAnnotation && (
                <ClosestSection
                  closestLock={closestLock}
                  onClick={handleOnListItemClick}
                  closestWinding={closestWinding}
                  closestTrains={closestTrains}
                />
              )}
            </>
          )}
        </StyledContainer>
      )}
    </Box>
  );
};

export default Main;
