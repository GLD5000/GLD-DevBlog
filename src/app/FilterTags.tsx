"use client";

import { useStore } from "@/store/zustand";

export default function FilterTags() {
  const { searchTags } = useStore();
  return (
    <input
      onChange={(e) => useStore.setState({ searchTags: e.target.value })}
      placeholder="Filter Tags e.g.: Typescript React"
      type="text"
      value={searchTags}
      className="w-full shrink grow break-words rounded bg-bg-var p-2 text-txt-main dark:bg-bg-var-dk dark:text-txt-main-dk"
    />
  );
}
