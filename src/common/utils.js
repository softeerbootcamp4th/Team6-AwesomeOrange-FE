export function clamp(target, min, max) {
  if (target < min) return min;
  if (target > max) return max;
  return target;
}

export function linearMap(ratio, min, max) {
  return ratio * (max - min) + min;
}
