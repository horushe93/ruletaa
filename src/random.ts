/**
 * Get a random index from the weights array
 * @param weights
 * @returns
 */
export function getSecureWeightedRandom(weights: number[]) {
  let sum = weights.reduce((acc, val) => acc + val, 0); // Calculate the sum of weights

  // Generate a secure random number (range 0 ~ sum-1)
  let array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  let rand = array[0] / (0xFFFFFFFF + 1) * sum; // Normalize to [0, sum)

  // Traverse the weights array to find the corresponding random index
  let cumulative = 0;
  for (let i = 0; i < weights.length; i++) {
      cumulative += weights[i];
      if (rand < cumulative) {
          return i;
      }
  }
  return getWeightedRandom(weights);
}

/**
 * Get a random index from the weights array
 * @param weights
 * @returns
 */
function getWeightedRandom(weights: number[]) {
  const total = weights.reduce((acc, curr) => acc + curr, 0);
  const random = Math.random() * total;
  let sum = 0;
  for (let i = 0; i < weights.length; i++) {
    sum += weights[i];
    if (random < sum) {
      return i;
    }
  }
}