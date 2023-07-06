import { create } from "zustand";
/* eslint-disable */
export const useStore = create<{ searchTags: string }>((set) => ({
  searchTags: "",
}));
