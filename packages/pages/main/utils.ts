import lockImageArray from "../../atoms/icons/lock";

export const getGeoJsonLockToAnnotations = (data: GeoJSON.FeatureCollection) => {
  return data.features.map(feature => {
    const geometry = feature.geometry as GeoJSON.Point;
    const [longitude, latitude] = geometry.coordinates;
    const coords = new mapkit.Coordinate(latitude, longitude);
    const angle = feature.properties?.ANGLE ?? 0;
    const annotation = new mapkit.ImageAnnotation(coords, {
      url: { 1: lockImageArray[0] },
      size: {
        width: 30,
        height: 30,
      },
      data: {
        angle:0,
      },
      anchorOffset: new DOMPoint(0, -15),
      clusteringIdentifier: "lock",
      title: feature.properties?.SAP_DESCRIPTION ?? "",
    });
    return annotation;
  });
};

export const getGeoJsonToOverlays = (data: GeoJSON.FeatureCollection, style: mapkit.Style) => {
  const overlays: Array<mapkit.PolylineOverlay> = [];
  data.features.forEach(feature => {
    if (feature.geometry.type === "LineString") {
      const points = feature.geometry.coordinates;
      const coords = points.map(point => {
        return new mapkit.Coordinate(point[1], point[0]);
      });
      const overlay = new mapkit.PolylineOverlay(coords, { style });
      return overlays.push(overlay);
    } else if (feature.geometry.type === "MultiLineString") {
      feature.geometry.coordinates.forEach(points => {
        const coords = points.map(point => {
          return new mapkit.Coordinate(point[1], point[0]);
        });
        const overlay = new mapkit.PolylineOverlay(coords, { style });
        return overlays.push(overlay);
      });
    }
  });
  return overlays;
};

// export const getTheClosestAnnotation = (currentLocation: GeolocationCoordinates, annotaions: mapkit.Annotation[] | null): mapkit.Annotation => {
//   if (!annotaions) {
//     throw new Error("Annotation is null");
//   }
//   const currentLocationCoordinate = new mapkit.Coordinate(currentLocation.latitude, currentLocation.longitude);
//   const distances = annotaions.map(annotation => {
//     const distance = annotation.coordinate.distanceTo(currentLocationCoordinate);
//     return {
//       annotation,
//       distance,
//     };
//   });
//   const sortedDistances = distances.sort((a, b) => a.distance - b.distance);
//   return sortedDistances[0].annotation;

// };

export type ClosestLocation = {
  location: mapkit.Annotation | null,
  distance: number
};

const toRadians = (angle: number) => {
  return angle * (Math.PI / 180);
}

const getDistanceInMiles = (coord1: GeolocationCoordinates, coord2: GeolocationCoordinates) => {
  const R = 3958.8; // Radius of the earth in miles
  const dLat = toRadians(coord2.latitude - coord1.latitude);
  const dLon = toRadians(coord2.longitude - coord1.longitude);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(coord1.latitude)) * Math.cos(toRadians(coord2.latitude)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in miles
}

export const getClosestLocation = (currentLocation: GeolocationCoordinates, locations: mapkit.Annotation[]): ClosestLocation | null => {
  if (locations.length === 0) {
    return null;
  }

  return locations.reduce<ClosestLocation>((closest, location) => {
    const coordinates: GeolocationCoordinates = {
      latitude: location.coordinate.latitude,
      longitude: location.coordinate.longitude,
      accuracy: 0,
      altitude: null,
      altitudeAccuracy: null,
      heading: null,
      speed: null
    };

    const distance = getDistanceInMiles(currentLocation, coordinates);
    return (distance < closest.distance) ? { location, distance } : closest;
  }, { location: locations[0], distance: Infinity }); // Initialize with first location
}