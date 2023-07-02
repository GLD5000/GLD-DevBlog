import makeNewTag from "@/utilities/colour/newTagMaker";

describe('makeNewTag', () => {
  it.skip('is truthy', async () => {
    expect(makeNewTag).toBeTruthy();
  });
  it.skip('is not white', async () => {
    expect(makeNewTag("bob").backgroundColour).not.toBe('#ffffff');
  });

});
