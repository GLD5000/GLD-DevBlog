export default function makeNewTag(tagArray: string[]) {
  const backgroundColour = tagArray[1];
  const newTag = {
    name: tagArray[0].trim(),
    backgroundColour,
  };
  return newTag;
}
