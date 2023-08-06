"use client";

import { useStore } from "@/store/zustand";
import { Tag } from "@prisma/client";

function getTagOptionList(tagList: Tag[]) {
  return tagList.map((tag) => <option key={tag.id}>{tag.name}</option>);
}

export default function FilterTags() {
  const { searchTags, allTags } = useStore();
  const listOptions = getTagOptionList(allTags);
  return (
    <>
      <input
        onChange={(e) => useStore.setState({ searchTags: e.target.value })}
        placeholder="Filter Tags e.g.: Typescript React"
        type="search"
        value={searchTags}
        className="w-full shrink grow break-words rounded bg-bg-var p-2 text-txt-main dark:bg-bg-var-dk dark:text-txt-main-dk"
        list="filter-tags-list"
      />
      <datalist id="filter-tags-list">{listOptions}</datalist>
    </>
  );
}
