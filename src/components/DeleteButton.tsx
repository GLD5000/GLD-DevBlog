"use client";
import DeleteSvg from "@/assets/icons/DeleteSvg";
import SvgButtonNew from "@/elements/SvgButtonNew";
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
    <SvgButtonNew
      svg={
        <div className="h-8 p-[0.35rem] aspect-square">
          <DeleteSvg />
        </div>
      }
      textElement={<span>Delete</span>}
      showTextIn={true}
      clickFunction={() => handleClick(postId, router)}
      className="rounded-full border-2 text-center grid grid-cols-autoFr h-10 px-2 w-32 hover:transition border-black text-black dark:text-white hover:text-white hover:bg-black dark:border-white dark:hover:text-black dark:hover:bg-white"
    />
  );
}
