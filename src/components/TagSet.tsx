import { Tag } from "@prisma/client";
import PostTag from "./PostTag";

function getArrayTags(
  arrayIn: {
    tag: Tag | null;
  }[]
) {
  return arrayIn.map((tag) => {
    if (!tag.tag) return null;
    const tagObject = tag.tag;
    return <PostTag key={tagObject.id} tagObject={tagObject} />;
  });
}

export default function TagSet({
  tagsObject,
}: {
  tagsObject: {
    tag: Tag | null;
  }[];
}) {
  const returnArray = getArrayTags(tagsObject);
  return (
    <div className="mx-auto flex w-fit flex-row flex-wrap gap-2 bg-transparent p-2">
      {returnArray}
    </div>
  );
}
