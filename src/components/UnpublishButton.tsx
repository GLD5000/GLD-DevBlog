"use client";

import ArrowSvg from "@/assets/icons/ArrowSvg";
import SvgButtonNew from "@/components/elements/SvgButtonNew";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { useRouter } from "next/navigation";

async function handleClickUnpublish(
  postId: string,
  routerInstance: AppRouterInstance
) {
  await fetch(`/api/unpublish/${postId}`, {
    method: "POST",
  });
  routerInstance.push("/drafts/");
  window.location.reload();
}
export default function UnpublishButton({ postId }: { postId: string }) {
  const router = useRouter();

  return (
    <SvgButtonNew
      svg={
        <div className="my-auto aspect-square h-8 p-[0.15rem]">
          <ArrowSvg />
        </div>
      }
      textElement={<span className="my-auto h-min">Unpublish</span>}
      showTextIn
      clickFunction={() => handleClickUnpublish(postId, router)}
      className="grid h-10 w-32 grid-cols-autoFr rounded-full border-2 border-txt-main px-2 text-center text-txt-main hover:bg-bg-dk hover:text-txt-main-dk hover:transition dark:border-txt-main-dk dark:text-txt-main-dk dark:hover:bg-bg dark:hover:text-txt-main"
    />
  );
}
