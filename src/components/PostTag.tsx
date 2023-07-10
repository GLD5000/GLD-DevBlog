"use client";

import { SyntheticEvent } from "react";
import { useStore } from "@/store/zustand";

export default function PostTag({
  tagObject,
}: {
  tagObject: {
    id: string;
    name: string;
    backgroundColour: string;
  };
}) {
  const { searchTags } = useStore();

  const clickHandler = (e: SyntheticEvent) => {
    const target = e.currentTarget as HTMLButtonElement;
    const { value } = target;
    const valueIsInString = searchTags.includes(value);
    if (searchTags && !valueIsInString) {
      useStore.setState({
        searchTags: `${searchTags} ${target.value}`,
      });
      return;
    }

    if (searchTags && valueIsInString) {
      const regularExpression = new RegExp(
        `^${target.value}[ ]? |[ ]?${target.value}`
      );
      const replaceValueString = searchTags.replace(regularExpression, "");
      useStore.setState({
        searchTags: replaceValueString,
      });
      return;
    }
    useStore.setState({ searchTags: target.value });
  };

  return (
    <button
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = tagObject.backgroundColour;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "transparent";
      }}
      onClick={clickHandler}
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
      value={tagObject.name}
    >
      {`#${tagObject.name}`}
    </button>
  );
}
