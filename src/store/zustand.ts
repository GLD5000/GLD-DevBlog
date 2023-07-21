import { Tag } from "@prisma/client";
import { create } from "zustand";
/* eslint-disable */
export const useStore = create<{ allTags: Tag[]; searchTags: string }>(
  (set) => ({
    allTags: [],
    searchTags: "",
  })
);
