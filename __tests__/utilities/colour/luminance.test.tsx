import {luminance} from "@/utilities/colour/luminance";

describe("luminance", () => {
  it("is truthy", async () => {
    expect(luminance).toBeTruthy();
  });
  it("is not black", async () => {
    expect(luminance.convertLumToSrgbGreyscale(0.178)).not.toBe([0, 0, 0]);
  });
});
