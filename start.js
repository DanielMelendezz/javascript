function calculateDistance(p1, p2) {
  return Math.sqrt(Math.pow(p2.coordinates[0] - p1.coordinates[0], 2) + Math.pow(p2.coordinates[1] - p1.coordinates[1], 2));
}

function calculatePathWeight(path, points) {
  let weight = 0.0;
  for (let i = 0; i < path.length - 1; ++i) {
    weight += calculateDistance(points[path[i]], points[path[i + 1]]);
  }
  weight += calculateDistance(points[path[path.length - 1]], points[path[0]]);
  return weight;
}

function tspBruteForce(n, points) {
  const path = Array.from({ length: n }, (_, i) => i);
  let minWeight = Number.MAX_SAFE_INTEGER;
  let minPath;

  do {
    const weight = calculatePathWeight(path, points);
    if (weight < minWeight) {
      minWeight = weight;
      minPath = path.slice();
    }
  } while (nextPermutation(path));

  const optimalPath = minPath.map((index) => points[index]);
  return { path: optimalPath, weight: minWeight };
}

function nearestNeighborTSP(n, points) {
  let unvisited = new Set([...Array(n).keys()]);
  const path = [];
  let current = 0; // Start from node 0

  while (unvisited.size > 1) {
    path.push(current);
    unvisited.delete(current);

    let nearest = null;
    let minDistance = Number.MAX_VALUE;

    for (let node of unvisited) {
      const distance = calculateDistance(points[current], points[node]);
      if (distance < minDistance) {
        minDistance = distance;
        nearest = node;
      }
    }

    current = nearest;
  }

  // Add the last node to complete the cycle
  path.push(current);

  const optimalPath = path.map((index) => points[index]);
  const weight = calculatePathWeight(path, points);

  return { path: optimalPath, weight };
}

// Function to generate permutations
function nextPermutation(arr) {
  let i = arr.length - 2;
  while (i >= 0 && arr[i] >= arr[i + 1]) {
    i--;
  }

  if (i >= 0) {
    let j = arr.length - 1;
    while (j > i && arr[j] <= arr[i]) {
      j--;
    }
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  const reverseTail = arr.splice(i + 1).reverse();
  arr.push(...reverseTail);

  return i >= 0;
}

// Example usage:
function coordinatesToString(coordinates) {
  return `[${coordinates[0]}, ${coordinates[1]}]`;
}

// Example usage:
const newWaypoint1 = {
  coordinates: [0, 0],
  label: 'Custom Waypoint 1'
};
const newWaypoint2 = {
  coordinates: [3, 0],
  label: 'Custom Waypoint 2'
};
const newWaypoint3 = {
  coordinates: [0, 4],
  label: 'Custom Waypoint 3'
};
const waypoints = [newWaypoint1, newWaypoint2, newWaypoint3];

const n = waypoints.length;

// Get results using the two algorithms directly
const bruteForceResult = tspBruteForce(n, waypoints);
const tspResult = nearestNeighborTSP(n, waypoints);

console.log("Brute Force Result:", {
  path: bruteForceResult.path.map((point) => ({
    label: point.label,
    coordinates: coordinatesToString(point.coordinates)
  })),
  weight: bruteForceResult.weight
});
console.log("TSP Result:", {
  path: tspResult.path.map((point) => ({
    label: point.label,
    coordinates: coordinatesToString(point.coordinates)
  })),
  weight: tspResult.weight
});