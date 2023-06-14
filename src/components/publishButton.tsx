"use client";
import PaperPlaneSvg from "@/assets/icons/PaperPlaneSvg";
import SvgButtonNew from "@/elements/SvgButtonNew";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { useRouter } from "next/navigation";

async function handleClickPublish(
  postId: string,
  routerInstance: AppRouterInstance
) {
  // console.log("handleClickPublish");
  await fetch(`/api/publish/${postId}`, {
    method: "POST",
  });
  await fetch(`/api/revalidate/drafts`);
  routerInstance.push("/drafts/");
}
export default function PublishButton({ postId }: { postId: string }) {
  // console.log("PublishButton");
  const router = useRouter();

  return (
    // <button className="rounded border-2 text-center flex  items-center justify-center h-10 my-auto w-28 hover:transition border-black text-black dark:text-white p-1 hover:text-white hover:bg-black dark:border-white dark:hover:text-black dark:hover:bg-white" type="button" onClick={() => handleClickPublish(postId, router)}>
    //   Publish
    // </button>
    <SvgButtonNew
      svg={
        <div className="h-8 p-1 aspect-square">
          <PaperPlaneSvg />
        </div>
      }
      textElement={<span>Publish</span>}
      showTextIn={true}
      clickFunction={() => handleClickPublish(postId, router)}
      className="rounded-full border-2 text-center grid grid-cols-autoFr h-10 px-2 w-32 hover:transition border-black text-black dark:text-white hover:text-white hover:bg-black dark:border-white dark:hover:text-black dark:hover:bg-white"
    />
  );
}
