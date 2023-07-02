import getRandomNumberBetween from "@/utilities/number/randomNumber";
import { Result } from "postcss";

describe("#getRandomNumberBetween", () => {
  it("Number within range", () => {
    expect(`${getRandomNumberBetween([1, 2])}`).toMatch(/^[1-2]$/);
  });

  it("Number within range", () => {
    expect(`${getRandomNumberBetween([1, 5], 3)}`).toMatch(
      /^[1-5].[0-9]{0,3}$/
    );
  });

  it("Number within range", () => {
    expect(`${getRandomNumberBetween([5], 3)}`).toMatch(/^5.[0-9]{0,3}$/);
  });
  for (let index = 0; index < 10; index++) {
    it("Decimal within range", () => {
      const result = getRandomNumberBetween([0.2, 0.3], 5);
      expect(result).toBeGreaterThanOrEqual(0.2);
      expect(result).toBeGreaterThanOrEqual(0.2);
    });
  }
});
