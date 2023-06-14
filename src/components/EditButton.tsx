"use client";
import PencilSvg from "@/assets/icons/PencilSvg";
import SvgButtonNew from "@/elements/SvgButtonNew";
import { useRouter } from "next/navigation";

export default function EditButton({ postId }: { postId: string }) {
  // console.log("EditButton");
  const router = useRouter();

  return (
    <SvgButtonNew
      svg={
        <div className="h-8 my-auto p-[0.25rem] aspect-square">
          <PencilSvg />
        </div>
      }
      textElement={<span className="h-min my-auto">Edit</span>}
      showTextIn={true}
      clickFunction={() => router.push(`/edit/${postId}/`)}
      className="rounded-full border-2 text-center grid grid-cols-autoFr h-10 px-2 w-32 hover:transition border-black text-black dark:text-white hover:text-white hover:bg-black dark:border-white dark:hover:text-black dark:hover:bg-white"
    />
  );
}
