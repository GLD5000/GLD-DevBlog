"use client";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { useRouter } from "next/navigation";

async function handleClick(postId: string, routerInstance: AppRouterInstance) {
  console.log("handleClickDelete");
  await fetch(`/api/delete/${postId}`, {
    method: "DELETE",
  });
  await fetch(`/api/revalidate/drafts`);
  routerInstance.push("/drafts/");
}
export default function DeleteButton({ postId }: { postId: string }) {
  console.log("DeleteButton");
  const router = useRouter();
  return (
    <button type="button" onClick={() => handleClick(postId, router)}>
      Delete
    </button>
  );
}
