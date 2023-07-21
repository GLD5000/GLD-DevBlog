"use client";

import { useRef } from "react";
import { useStore } from "@/store/zustand";
import { Tag } from "@prisma/client";

export default function ZustandInitialiser({
  allTags,
  searchTags,
}: {
  allTags: Tag[];
  searchTags: string;
}) {
  const initialised = useRef(false);

  if (!initialised.current) {
    useStore.setState({ allTags, searchTags });
    initialised.current = true;
  }
  return null;
}
