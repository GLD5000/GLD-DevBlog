import { luminanceMatcherHsl } from "@/utilities/colour/luminanceMatch";
import getRandomNumberBetween, {getRandomNumbersBetween} from "@/utilities/number/randomNumber";

describe("luminanceMatcherHsl", () => {
  it.skip("is truthy", async () => {
    expect(luminanceMatcherHsl).toBeTruthy();
  });
  for (let i = 0; i <20; i++){

    it("is truthy", async () => {
      expect(
        luminanceMatcherHsl(getRandomNumbersBetween([[0,360], [20,100], [1,99]]), getRandomNumberBetween([0.177,0.18],4))
      ).toBeTruthy();
    });
  }
  // it("is truthy", async () => {
  //   expect(
  //     luminanceMatcherHsl([187, 90, 90], 0.18)
  //   ).toBeTruthy();
  // });

  // it("is truthy", async () => {
  //   expect(
  //     luminanceMatcherHsl([123, 70, 10], 0.546)
  //   ).toBeTruthy();
  // });
  // it("is truthy", async () => {
  //   expect(
  //     luminanceMatcherHsl([223, 30, 10], 0.573)
  //   ).toBeTruthy();
  // });
  // it("is truthy", async () => {
  //   expect(
  //     luminanceMatcherHsl([223, 30, 10], 0.23)
  //   ).toBeTruthy();
  // });
  // it("is truthy", async () => {
  //   expect(
  //     luminanceMatcherHsl([223, 70, 10], 0.07)
  //   ).toBeTruthy();
  // });
  // it.skip("is not white", async () => {
  //   expect(luminanceMatcherHsl([123, 70, 80], 0.178)).not.toBe(
  //     "#ffffff"
  //   );
  // });
  // it.skip("is not white", async () => {
  //   expect(luminanceMatcherHsl([123, 70, 80], 0.178)).not.toBe(
  //     "#ffffff"
  //   );
  // });
});
