import makeNewTag from "@/utilities/colour/newTagMaker";

describe('makeNewTag', () => {
  it('is truthy', async () => {
    expect(makeNewTag).toBeTruthy();
  });
  it('is not white', async () => {
    expect(makeNewTag("bob").backgroundColour).not.toBe('#ffffff');
  });

});
