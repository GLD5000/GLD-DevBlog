"use client";
import { useRouter } from "next/navigation";


export default function EditButton({ postId }: { postId: string }) {
  // console.log("EditButton");
  const router = useRouter();

  return (
    <button className="rounded border-2 text-center flex  items-center justify-center h-10 my-auto w-28 hover:transition border-black text-black dark:text-white p-1 hover:text-white hover:bg-black dark:border-white dark:hover:text-black dark:hover:bg-white" type="button" onClick={()=> router.push(`/edit/${postId}/`)}>
      Edit
    </button>
  );
}
