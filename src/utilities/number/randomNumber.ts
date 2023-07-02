export default function getRandomNumberBetween(args: number[], decimalPlaces = 0) {
  const min = Math.min(...args);
  const max = Math.max(...args);
  const range = min === max? 1:  max - min;
  const random = Math.random() * range + min;
  if (decimalPlaces === 0) return Math.round(random);
  const multiplier = 10 ** decimalPlaces;
  return Math.round(random * multiplier) / multiplier;
}

export function getRandomNumbersBetween(rangesArray: number[][], decimalPlaces = 0){
  return rangesArray.map(range => getRandomNumberBetween(range,decimalPlaces));
}
