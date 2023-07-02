import {luminance} from "@/utilities/colour/luminance";

describe("luminance", () => {
  it.skip("is truthy", async () => {
    expect(luminance).toBeTruthy();
  });
  it.skip("is not black", async () => {
    expect(luminance.convertLumToSrgbGreyscale(0.178)).not.toBe([0, 0, 0]);
  });
});
