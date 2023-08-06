import { useEffect, useState, useRef } from "react";

const getGeoLocationWithCache = async (): Promise<GeolocationCoordinates> => {
  const cache = localStorage.getItem("geoLocation");

  // Define a function to update the location in local storage
  const updateLocation = async () => {
    const geoLocation = await gettingGeoCoordinates();

    const { latitude, longitude } = geoLocation.coords;
    localStorage.setItem("geoLocation", JSON.stringify({ latitude, longitude }));
    return geoLocation.coords;
  };

  // If cache exists, return it immediately and update the location in the background
  if (cache) {
    updateLocation();
    return JSON.parse(cache);
  }

  // If no cache, get the location and return it
  return await updateLocation();
};

const gettingGeoCoordinates = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => resolve(position),
      (error: GeolocationPositionError) => reject(error),
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 30000 },
    );
  });
};

export const useCurrentLocation = () => {
  const [currentLocation, setCurrentLocation] = useState<GeolocationCoordinates>({longitude: 0, latitude: 0, accuracy: 0, altitude: null, altitudeAccuracy: null, heading: null, speed: null});
  const [error, setError] = useState<unknown | null>(null);

  useEffect(() => {
    const main = async () => {
      try{
        const result = await getGeoLocationWithCache();
        setCurrentLocation(result);
      } catch (error) {
        setError(error)
      }
    };

    main();
  }, []);
return {currentLocation, error}
}