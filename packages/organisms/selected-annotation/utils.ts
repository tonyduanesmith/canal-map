import { Coordinate } from "../../pages/main/utils";

export const getAddress = async (coords: Coordinate) => {
  const geocoder = new window.mapkit.Geocoder();
  const coordinate = new mapkit.Coordinate(coords[0], coords[1]);
  return new Promise<mapkit.GeocoderResponse>((resolve, reject) => {
    geocoder.reverseLookup(coordinate, (error, data) => {
      if (error) {
        reject(error);
      } else if (data) {
        resolve(data);
      } else {
        reject(new Error("No results found"));
      }
    });
  });
};
