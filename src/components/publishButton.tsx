"use client";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { useRouter } from "next/navigation";

async function handleClickPublish(
  postId: string,
  routerInstance: AppRouterInstance
) {
  console.log("handleClickPublish");
  await fetch(`/api/publish/${postId}`, {
    method: "POST",
  });
  await fetch(`/api/revalidate/drafts`);
  routerInstance.push("/drafts/");
}
export default function PublishButton({ postId }: { postId: string }) {
  console.log("PublishButton");
  const router = useRouter();

  return (
    <button type="button" onClick={() => handleClickPublish(postId, router)}>
      Publish
    </button>
  );
}
