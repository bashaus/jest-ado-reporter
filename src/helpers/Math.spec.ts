import { lerp } from "./Math";

describe("lerp", () => {
  it("should calculate percentage", () => {
    expect(lerp(0, 50, 0.5)).toEqual(25);
    expect(lerp(0, 100, 0.5)).toEqual(50);
  });

  it("should throw an error when max is less than min", () => {
    expect(() => lerp(50, 0, 0.5)).toThrowError();
  });
});
