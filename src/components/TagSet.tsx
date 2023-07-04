"use client";

import { Tag } from "@prisma/client";

function getArrayTags(
  arrayIn: {
    tag: Tag | null;
  }[]
) {
  return arrayIn.map((tag) => {
    if (!tag.tag) return null;
    const tagObject = tag.tag;
    return (
      <button
        type="button"
        key={tagObject.id}
        className={`my-auto flex h-fit w-fit items-center justify-center rounded-full  border-2 border-transparent px-2 text-center hover:transition focus:transition `}
        style={{
          textDecoration: `${tagObject.backgroundColour}`,
          textDecorationLine: `underline`,
          textDecorationThickness: `4px`,
          textDecorationSkipInk: "none",
        }}
      >
        {`#${tagObject.name}`}
        <style>
          {`
            button:hover,
            button:focus {
              color: #000;
              background-color: ${tagObject.backgroundColour};
              border-color: #000;
            }
          `}
        </style>
      </button>
    );
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
    <div className="mx-auto flex w-fit flex-row flex-wrap gap-2 p-2">
      {returnArray}
    </div>
  );
}
