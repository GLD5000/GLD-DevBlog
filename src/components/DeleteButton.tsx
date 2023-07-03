"use client";
import DeleteSvg from "@/assets/icons/DeleteSvg";
import SvgButtonNew from "@/elements/SvgButtonNew";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { useRouter } from "next/navigation";

async function handleClick(postId: string, routerInstance: AppRouterInstance) {
  await fetch(`/api/delete/${postId}`, {
    method: "DELETE",
  });
  // await fetch(`/api/revalidate/drafts`);
  routerInstance.push("/drafts/");
}
export default function DeleteButton({ postId }: { postId: string }) {
  const router = useRouter();
  return (
    <SvgButtonNew
      svg={
        <div className="h-8 p-[0.15rem] aspect-square">
          <DeleteSvg />
        </div>
      }
      textElement={<span>Delete</span>}
      showTextIn={true}
      clickFunction={() => handleClick(postId, router)}
      className="rounded-full border-2 text-center grid grid-cols-autoFr h-10 px-2 w-32 hover:transition border-txt-main text-txt-main dark:text-txt-main-dk hover:text-txt-main-dk hover:bg-bg-dk dark:border-txt-main-dk dark:hover:text-txt-main dark:hover:bg-bg"
    />
  );
}
