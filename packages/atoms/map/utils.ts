export const gettingGeoCoordinates = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => resolve(position),
      (error: GeolocationPositionError) => reject(error),
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 30000 },
    );
  });
};
