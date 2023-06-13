import {  Tag } from "@prisma/client";

function getArrayTags(arrayIn:  {
    tag: Tag | null;
}[]) {
  return arrayIn.map((tag) => {
if (!!!tag.tag) return null;
const tagObject = tag.tag;
   return <button
      className="rounded border-2 text-center flex  items-center justify-center h-10 my-auto w-28"
      style={{
        color: `${tagObject.textColour}`,
        backgroundColor: `${tagObject.backgroundColour}`,
      }}
    >
      {tagObject.name}
    </button>}
  );
}

export default function TagSet({tagsObject}:{tagsObject:  {
    tag: Tag | null;
}[]}) {
  const returnArray = getArrayTags(tagsObject);
  return <div className="flex flex-row flex-wrap gap-4">{returnArray}</div>;
}
