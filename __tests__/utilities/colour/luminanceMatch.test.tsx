import { luminanceMatch } from "@/utilities/colour/luminanceMatch";

describe('luminanceMatch', () => {
  it('is truthy', async () => {
    expect(luminanceMatch).toBeTruthy();
  });
  it('is truthy', async () => {
    expect(luminanceMatch.luminanceMatcherHsl).toBeTruthy();
  });
  it('is truthy', async () => {
    expect(luminanceMatch.luminanceMatcherHsl([123,70,80],17.8)).toBeTruthy();
  });

});
