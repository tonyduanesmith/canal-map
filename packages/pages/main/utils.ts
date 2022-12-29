import lockImageArray from "../../atoms/icons/lock";

export const getGeoJsonLockToAnnotations = (data: GeoJSON.FeatureCollection) => {
  return data.features.map(feature => {
    const geometry = feature.geometry as GeoJSON.Point;
    const [longitude, latitude] = geometry.coordinates;
    const coords = new mapkit.Coordinate(latitude, longitude);
    const angle = feature.properties?.ANGLE ?? 0;
    const annotation = new mapkit.ImageAnnotation(coords, {
      url: { 1: lockImageArray[angle] },
      size: {
        width: 30,
        height: 30,
      },
      data: {
        angle,
      },
      anchorOffset: new DOMPoint(0, -15),
      clusteringIdentifier: "lock",
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
