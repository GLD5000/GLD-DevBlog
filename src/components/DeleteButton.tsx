"use client";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { useRouter } from "next/navigation";

async function handleClick(postId: string, routerInstance: AppRouterInstance) {
  // console.log("handleClickDelete");
  await fetch(`/api/delete/${postId}`, {
    method: "DELETE",
  });
  await fetch(`/api/revalidate/drafts`);
  routerInstance.push("/drafts/");
}
export default function DeleteButton({ postId }: { postId: string }) {
  // console.log("DeleteButton");
  const router = useRouter();
  return (
    <button className="rounded border-2 text-center flex  items-center justify-center h-10 my-auto w-28 hover:transition border-black text-black dark:text-white p-1 hover:text-white hover:bg-black dark:border-white dark:hover:text-black dark:hover:bg-white" type="button" onClick={() => handleClick(postId, router)}>
      Delete
    </button>
  );
}
