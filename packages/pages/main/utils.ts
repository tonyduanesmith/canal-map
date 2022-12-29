import lockImageArray from "../../atoms/icons/lock";

export const getGeoJsonToAnnotations = (data: GeoJSON.FeatureCollection) => {
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
    annotation;
    return annotation;
  });
};
