export class LerpMinMaxMismatchError extends Error {
  constructor() {
    super("value of `min` must be less than value of `max`");
  }
}
