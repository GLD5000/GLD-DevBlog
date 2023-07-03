import getRandomColour from "./randomColour";
import AutoTextColour from "./autoTextColour";

export default function makeNewTag(tagArray: string[]) {
  // mid colour lum 17.6 - 18.1%
  const backgroundColour = tagArray[1];
  // console.log('backgroundColour:', backgroundColour);
  const newTag = {
    name: tagArray[0].trim(),
    backgroundColour,
  };

  return newTag;
}
