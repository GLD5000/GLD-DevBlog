"use client";

import { useRef } from "react";
import { useStore } from "@/store/zustand";

export default function ZustandInitialiser({
  searchTags,
}: {
  searchTags: string;
}) {
  const initialised = useRef(false);
  if (!initialised.current) {
    useStore.setState({ searchTags });
    initialised.current = true;
  }
  return null;
}
