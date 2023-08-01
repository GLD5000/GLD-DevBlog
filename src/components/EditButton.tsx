"use client";

import PencilSvg from "@/assets/icons/PencilSvg";
import SvgButtonNew from "@/components/elements/SvgButtonNew";
import { useDispatch, updateFromBlogPost } from "@/lib/redux";
import { useRouter } from "next/navigation";

export default function EditButton({ postId }: { postId: string }) {
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <SvgButtonNew
      svg={
        <div className="my-auto aspect-square h-8 p-[0.25rem]">
          <PencilSvg />
        </div>
      }
      textElement={<span className="my-auto h-min">Edit</span>}
      showTextIn
      clickFunction={() => {
        clickHandler();
      }}
      className="grid h-10 w-32 grid-cols-autoFr rounded-full border-2 border-txt-main px-2 text-center text-txt-main hover:bg-bg-dk hover:text-txt-main-dk hover:transition dark:border-txt-main-dk dark:text-txt-main-dk dark:hover:bg-bg dark:hover:text-txt-main"
    />
  );

  function clickHandler() {
    dispatch(updateFromBlogPost(postId));
    router.push(`/edit/${postId}/`);
  }
}
