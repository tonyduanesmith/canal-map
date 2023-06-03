export const getGeoLocationWithCache = async (): Promise<GeolocationCoordinates> => {
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

export const gettingGeoCoordinates = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => resolve(position),
      (error: GeolocationPositionError) => reject(error),
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 30000 },
    );
  });
};
