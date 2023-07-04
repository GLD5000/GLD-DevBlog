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
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = tagObject.backgroundColour;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
        }}
        type="button"
        key={tagObject.id}
        className={`my-auto flex h-fit w-fit items-center justify-center rounded-full  border-2 border-transparent px-2 text-center hover:border-current hover:transition focus:border-current focus:transition `}
        style={{
          textDecoration: `${tagObject.backgroundColour}`,
          textDecorationLine: `underline`,
          textDecorationThickness: `4px`,
          textDecorationSkipInk: "none",
          backgroundColor: `${tagObject.backgroundColour}00`,
        }}
      >
        {`#${tagObject.name}`}
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
    <div className="mx-auto flex w-fit flex-row flex-wrap gap-2 bg-transparent p-2">
      {returnArray}
    </div>
  );
}
