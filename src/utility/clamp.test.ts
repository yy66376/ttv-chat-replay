import { it, expect, describe } from "vitest";
import clamp from "./clamp";

describe("clamp", () => {
  it("should return the minimum value if the given value is smaller.", () => {
    const clampedVal = clamp(-1, 0, 10);
    expect(clampedVal).toBe(0);
  });

  it("should return the minimum value if the given value is equal to the minimum value.", () => {
    const clampedVal = clamp(0, 0, 10);
    expect(clampedVal).toBe(0);
  });

  it("should return the maximum value if the given value is bigger.", () => {
    const clampedVal = clamp(11, 0, 10);
    expect(clampedVal).toBe(10);
  });

  it("should return the maximum value if the given value is equal to the maximum value.", () => {
    const clampedVal = clamp(10, 0, 10);
    expect(clampedVal).toBe(10);
  });

  it("should return the given value if the given value is between the minimum and maximum values.", () => {
    const clampedVal = clamp(5, 0, 10);
    expect(clampedVal).toBe(5);
  });
});
