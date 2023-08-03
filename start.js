function calculateDistance(p1, p2) {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
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
  
  // Example usage:
  const n = 4; // Number of nodes/locations
  
  const points = [
    { x: 4.6749, y: -4.788 },
    { x: 1.23, y: 2.45 },
    { x: 3.56, y: 1.0 },
    { x: 2.12, y: 3.78 },
  ];
  
  const bruteForceResult = tspBruteForce(n, points);
  console.log("Brute Force - Optimal Path:", bruteForceResult.path);
  console.log("Brute Force - Total Weight:", bruteForceResult.weight);
  
  const nearestNeighborResult = nearestNeighborTSP(n, points);
  console.log("Nearest Neighbor - Optimal Path:", nearestNeighborResult.path);
  console.log("Nearest Neighbor - Total Weight:", nearestNeighborResult.weight);
