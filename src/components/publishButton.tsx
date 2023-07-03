"use client";
import PaperPlaneSvg from "@/assets/icons/PaperPlaneSvg";
import SvgButtonNew from "@/elements/SvgButtonNew";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { useRouter } from "next/navigation";

async function handleClickPublish(
  postId: string,
  routerInstance: AppRouterInstance
) {
  await fetch(`/api/publish/${postId}`, {
    method: "POST",
  });
  // await fetch(`/api/revalidate/drafts`);
  routerInstance.push("/drafts/");
}
export default function PublishButton({ postId }: { postId: string }) {
  const router = useRouter();

  return (
    <SvgButtonNew
      svg={
        <div className="h-8 p-[0.15rem] aspect-square">
          <PaperPlaneSvg />
        </div>
      }
      textElement={<span>Publish</span>}
      showTextIn={true}
      clickFunction={() => handleClickPublish(postId, router)}
      className="rounded-full border-2 text-center grid grid-cols-autoFr h-10 px-2 w-32 hover:transition border-txt-main text-txt-main dark:text-txt-main-dk hover:text-txt-main-dk hover:bg-bg-dk dark:border-txt-main-dk dark:hover:text-txt-main dark:hover:bg-bg"
    />
  );
}
