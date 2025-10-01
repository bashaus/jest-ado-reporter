import { LerpMinMaxMismatchError } from "./math.errors";

/**
 * LERP: Linear interpolation
 */
export const lerp = (min: number, max: number, percent: number) => {
  if (min > max) {
    throw new LerpMinMaxMismatchError();
  }

  return min * (1 - percent) + max * percent;
};
