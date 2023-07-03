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
        <div className="aspect-square h-8 p-[0.15rem]">
          <PaperPlaneSvg />
        </div>
      }
      textElement={<span>Publish</span>}
      showTextIn={true}
      clickFunction={() => handleClickPublish(postId, router)}
      className="grid h-10 w-32 grid-cols-autoFr rounded-full border-2 border-txt-main px-2 text-center text-txt-main hover:bg-bg-dk hover:text-txt-main-dk hover:transition dark:border-txt-main-dk dark:text-txt-main-dk dark:hover:bg-bg dark:hover:text-txt-main"
    />
  );
}
