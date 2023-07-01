import { luminanceMatch } from "@/utilities/colour/luminanceMatch";

describe('autoContrast', () => {
  it('is truthy', async () => {
    expect(luminanceMatch).toBeTruthy();
  });

});
