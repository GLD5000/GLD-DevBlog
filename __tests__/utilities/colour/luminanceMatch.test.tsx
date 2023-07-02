import { luminanceMatcherHsl } from "@/utilities/colour/luminanceMatch";
import getRandomNumberBetween, {
  getRandomNumbersBetween,
} from "@/utilities/number/randomNumber";

describe("luminanceMatcherHsl", () => {
  it("is truthy", async () => {
    expect(luminanceMatcherHsl).toBeTruthy();
  });
  for (let i = 0; i < 20; i++) {
    it("is truthy", async () => {
      const targetRelativeLuminance = getRandomNumberBetween([0.01, 0.99], 4);
      const result = luminanceMatcherHsl(
        getRandomNumbersBetween([
          [0, 360],
          [20, 100],
          [1, 99],
        ]),
        targetRelativeLuminance
      );
      expect(
        Math.abs(targetRelativeLuminance - result.currentRl) < 0.001
      ).toBeTruthy();
    });
  }
});
