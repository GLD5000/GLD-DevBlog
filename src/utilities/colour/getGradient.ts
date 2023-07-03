import { Tag } from "@prisma/client";

export default function getGradient(
  tags: {
    tag: Tag;
  }[]
) {
  if (!tags.length) return { background: `linear-gradient(10deg, #934, #756)` };
  const coloursString = tags
    .map((tag) => {
      if (!tag.tag) return null;
      const tagObject = tag.tag;
      return tagObject.backgroundColour;
    })
    .join(",");
  return {
    background: `linear-gradient(90deg, #fff5, #fff0, #fff0, #fff0, #fff5), linear-gradient(#fff5, #fff0, #fff0, #fff0, #fff5), linear-gradient(35deg, ${coloursString})`,
  };
}
