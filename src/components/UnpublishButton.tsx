"use client";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { useRouter } from "next/navigation";

async function handleClickUnpublish(
  postId: string,
  routerInstance: AppRouterInstance
) {
  console.log("handleClickUnpublish");
  await fetch(`/api/unpublish/${postId}`, {
    method: "POST",
  });
  await fetch(`/api/revalidate/drafts`);
  routerInstance.push("/drafts/");
}
export default function UnpublishButton({ postId }: { postId: string }) {
  console.log("UnpublishButton");
  const router = useRouter();

  return (
    <button type="button" onClick={() => handleClickUnpublish(postId, router)}>
      Unpublish
    </button>
  );
}
