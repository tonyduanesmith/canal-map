import lockImageArray from "../../atoms/icons/lock";
import windingImage from "../../atoms/icons/winding/winding.svg";
import canalGeoJSON from "../../app/canalMap/public/assets/canals.json";

export type Coordinate = [number, number];

interface Edge {
  coord: Coordinate;
  distance: number;
}

interface Graph {
  [key: string]: Edge[];
}

interface Distances {
  [key: string]: number;
}

interface Previous {
  [key: string]: string | null;
}

interface PriorityQueueItem {
  element: string;
  priority: number;
}

export const getGeoJsonLockToAnnotations = (data: GeoJSON.FeatureCollection) => {
  return data.features.map(feature => {
    const geometry = feature.geometry as GeoJSON.Point;
    const [longitude, latitude] = geometry.coordinates;
    const coords = new mapkit.Coordinate(latitude, longitude);
    const angle = feature.properties?.ANGLE ?? 0;
    const annotation = new mapkit.ImageAnnotation(coords, {
      url: { 1: lockImageArray[angle] },
      size: {
        width: 20,
        height: 20,
      },
      data: {
        angle,
        color: "black",
      },
      anchorOffset: new DOMPoint(0, -10),
      clusteringIdentifier: "lock",
      title: feature.properties?.SAP_DESCRIPTION ?? "",
    });
    return annotation;
  });
};

export const getGeoJsonWindingToAnnotations = (data: GeoJSON.FeatureCollection) => {
  return data.features.map(feature => {
    const geometry = feature.geometry as GeoJSON.Point;
    const [longitude, latitude] = geometry.coordinates;
    const coords = new mapkit.Coordinate(latitude, longitude);
    const annotation = new mapkit.ImageAnnotation(coords, {
      url: { 1: windingImage },
      size: {
        width: 20,
        height: 20,
      },
      anchorOffset: new DOMPoint(0, -10),
      clusteringIdentifier: "winding",
      title: feature.properties?.sap_description ?? "",
      data: {
        color: "orange",
      },
    });
    return annotation;
  });
};

export const getGeoJsonToTrainsAnnotations = (data: GeoJSON.FeatureCollection) => {
  return data.features.map(feature => {
    const geometry = feature.geometry as GeoJSON.Point;
    const [longitude, latitude] = geometry.coordinates;
    const coords = new mapkit.Coordinate(latitude, longitude);
    const annotation = new mapkit.ImageAnnotation(coords, {
      url: { 1: windingImage },
      size: {
        width: 20,
        height: 20,
      },
      anchorOffset: new DOMPoint(0, -10),
      clusteringIdentifier: "trains",
      title: feature.properties?.station_name ?? "",
      data: {
        color: "teal",
      },
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

export const getCoordinatesToOverlay = (coordinates: Coordinate[], style: mapkit.Style): mapkit.PolylineOverlay => {
  const coords = coordinates.map(point => {
    return new mapkit.Coordinate(point[1], point[0]); // Convert [longitude, latitude] to mapkit.Coordinate [latitude, longitude]
  });

  // Create and return a polyline overlay
  return new mapkit.PolylineOverlay(coords, { style });
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
  location: mapkit.Annotation | null;
  distance: number;
};

const toRadians = (angle: number) => {
  return angle * (Math.PI / 180);
};

export const getDistanceInMiles = (coord1: GeolocationCoordinates, coord2: GeolocationCoordinates) => {
  const R = 3958.8; // Radius of the earth in miles
  const dLat = toRadians(coord2.latitude - coord1.latitude);
  const dLon = toRadians(coord2.longitude - coord1.longitude);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(coord1.latitude)) *
      Math.cos(toRadians(coord2.latitude)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in miles
};

export const getClosestLocation = (
  currentLocation: GeolocationCoordinates,
  locations: mapkit.Annotation[],
): ClosestLocation | null => {
  if (locations.length === 0) {
    return null;
  }

  return locations.reduce<ClosestLocation>(
    (closest, location) => {
      const coordinates: GeolocationCoordinates = {
        latitude: location.coordinate.latitude,
        longitude: location.coordinate.longitude,
        accuracy: 0,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        speed: null,
      };

      const distance = getDistanceInMiles(currentLocation, coordinates);
      return distance < closest.distance ? { location, distance } : closest;
    },
    { location: locations[0], distance: Infinity },
  ); // Initialize with first location
};

// Function to calculate distance (Haversine formula or similar)
function calculateDistance(coord1: Coordinate, coord2: Coordinate): number {
  const R = 6371e3; // Earth radius in meters
  const φ1 = (coord1[1] * Math.PI) / 180;
  const φ2 = (coord2[1] * Math.PI) / 180;
  const Δφ = ((coord2[1] - coord1[1]) * Math.PI) / 180;
  const Δλ = ((coord2[0] - coord1[0]) * Math.PI) / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in meters
}

// Function to round coordinates to a fixed precision (e.g., 6 decimal places)
function roundCoord(coord: Coordinate, precision = 6): Coordinate {
  return coord.map(num => parseFloat(num.toFixed(precision))) as Coordinate;
}

class PriorityQueue {
  items: PriorityQueueItem[];

  constructor() {
    this.items = [];
  }

  enqueue(element: string, priority: number): void {
    let contain = false;
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].priority > priority) {
        this.items.splice(i, 0, { element, priority });
        contain = true;
        break;
      }
    }
    if (!contain) {
      this.items.push({ element, priority });
    }
  }

  dequeue(): PriorityQueueItem | undefined {
    return this.items.shift();
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

export function dijkstra(start: Coordinate, end: Coordinate): { path: Coordinate[]; distance: number } {
  let distances: Distances = {};
  let prev: Previous = {};
  let pq = new PriorityQueue();
  let graph: Graph = {};

  const geoJSON = canalGeoJSON as GeoJSON.FeatureCollection;

  // Parse the GeoJSON data and build the graph
  geoJSON.features.forEach(feature => {
    if (feature.geometry.type === "LineString") {
      const coordinates = feature.geometry.coordinates as Coordinate[];

      for (let i = 0; i < coordinates.length - 1; i++) {
        const startCoord = roundCoord(coordinates[i]);
        const endCoord = roundCoord(coordinates[i + 1]);

        const startKey = startCoord.join(",");
        const endKey = endCoord.join(",");

        if (!graph[startKey]) graph[startKey] = [];
        if (!graph[endKey]) graph[endKey] = [];

        const distance = calculateDistance(startCoord, endCoord);
        graph[startKey].push({ coord: endCoord, distance });
        graph[endKey].push({ coord: startCoord, distance });
      }
    }
  });

  // Find the nearest nodes to the start and end coordinates
  const startNode = findNearestNode(graph, start);
  const endNode = findNearestNode(graph, end);

  // Initialize distances and priority queue
  Object.keys(graph).forEach(node => {
    distances[node] = Infinity;
    prev[node] = null;
  });
  distances[startNode] = 0;
  pq.enqueue(startNode, 0);

  while (!pq.isEmpty()) {
    let minNode = pq.dequeue()?.element;
    if (!minNode) continue;

    // Check if minNode has any neighbors in the graph
    if (!graph[minNode]) continue;

    if (minNode === endNode) break;

    graph[minNode].forEach(neighbor => {
      let alt = distances[minNode] + neighbor.distance;
      let neighborKey = neighbor.coord.join(",");

      if (alt < distances[neighborKey]) {
        distances[neighborKey] = alt;
        prev[neighborKey] = minNode;
        pq.enqueue(neighborKey, alt);
      }
    });
  }

  // Reconstruct the shortest path and calculate the total distance
  let path: Coordinate[] = [];
  let totalDistance = 0;
  let step = endNode;

  while (prev[step]) {
    path.unshift(step.split(",").map(Number) as Coordinate);

    // Add the distance between this step and the previous step
    const prevStep = prev[step];
    if (prevStep) {
      const prevCoord = prevStep.split(",").map(Number) as Coordinate;
      const currentCoord = step.split(",").map(Number) as Coordinate;
      totalDistance += calculateDistance(prevCoord, currentCoord);
    }

    step = prev[step]!;
  }

  // Add the starting point to the path
  path.unshift(startNode.split(",").map(Number) as Coordinate);

  return { path, distance: totalDistance };
}

// Function to find the nearest node in the graph to a given coordinate
function findNearestNode(graph: Graph, coord: Coordinate): string {
  let nearestNode: string | null = null;
  let nearestDistance = Infinity;

  Object.keys(graph).forEach(nodeKey => {
    const nodeCoord = nodeKey.split(",").map(Number) as Coordinate;
    const distance = calculateDistance(nodeCoord, coord);

    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestNode = nodeKey;
    }
  });

  if (!nearestNode) {
    throw new Error("No nearest node found");
  }

  return nearestNode;
}
