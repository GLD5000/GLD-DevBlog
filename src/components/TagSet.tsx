"use client";

import { Tag } from "@prisma/client";

function getArrayTags(
  arrayIn: {
    tag: Tag | null;
  }[]
) {
  return arrayIn.map((tag) => {
    if (!!!tag.tag) return null;
    const tagObject = tag.tag;
    return (
      <button
        className={`rounded border-2 border-transparent text-center flex  items-center justify-center h-fit my-auto w-fit px-2 `}
        // style={{
        //   color: `${tagObject.textColour}`,
        //   borderColor: `${tagObject.textColour}`,
        // }}
      >
        {`#${tagObject.name}`}
        <style jsx>
          {`
            button:hover, button:focus {
              color: ${tagObject.textColour};
              background-color: ${tagObject.backgroundColour};
              border-color: ${tagObject.textColour};
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
  return <div className="flex flex-row flex-wrap gap-2">{returnArray}</div>;
}
