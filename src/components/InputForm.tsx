"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SpicyLi from "@/elements/SpicyLi";
import PaperPlaneSvg from "@/assets/icons/PaperPlaneSvg";
import SvgButtonNew from "@/elements/SvgButtonNew";
import DeleteSvg from "@/assets/icons/DeleteSvg";
import SaveSvg from "@/assets/icons/SaveSvg";
import getReadTime from "@/utilities/readTime";

function getTagButtons(
  tags: string[] | undefined,
  closeFunction: (tagValue: string) => void
) {
  if (!!!tags) return null;
  return tags.map((tag) => (
    <SpicyLi
      key={tag}
      className="flex my-auto h-8 w-36 min-w-fit flex-row items-center justify-between rounded-full border-2 border-txt-main text-center text-sm hover:transition dark:border-neutral-300 overflow-clip"
      content={tag}
      id={tag}
      closeFunction={closeFunction}
    />
  ));
}

export default function InputForm({
  initialTitle,
  initialContent,
  initialTags,
  intialId,
}: {
  initialTitle?: string;
  initialContent?: string | null;
  initialTags?: string[] | undefined | null;
  intialId?: string;
}) {
  const Router = useRouter();

  const [title, setTitle] = useState(initialTitle || "");
  const [content, setContent] = useState(initialContent || "");
  const [publish, setPublish] = useState(false);
  // const [id, _] = useState<string | undefined>(intialId || undefined);
  const [tags, setTags] = useState<string[] | undefined>(
    initialTags || undefined
  );
  const [tagString, setTagString] = useState("");
  const id = intialId || undefined;

  function closeTag(tagValue: string) {
    setTags((oldTags) => {
      const newTags = oldTags?.filter((x) => x !== tagValue);
      return newTags;
    });
  }

  const tagButtons = getTagButtons(tags, closeTag);

  function pushToTags(stringIn: string) {
    console.log("stringIn:", stringIn);
    setTags((oldArray) => {
      const newArray =
        !!oldArray && oldArray.length > 0
          ? [...new Set([...oldArray, stringIn.trim()])]
          : [stringIn.trim()];
      return newArray;
    });
    setTagString("");
  }

  function handleTags(currentValue: string) {
    if (
      /[ ,.]/.test(`${currentValue.at(-1)}`) &&
      currentValue.length > 1 &&
      (tags === undefined || tags.length < 5)
    ) {
      pushToTags(currentValue.slice(0, -1));
      return;
    }
    setTagString(currentValue);
  }

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const readTime = getReadTime(content);
    try {
      const body = { title, content, publish, tags, id, readTime };
      await fetch("/api/post/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      Router.push("/drafts/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={submitData}
      className="flex w-full max-w-body mx-auto gap-4 flex-col p-4"
    >
      <h1 className="text-txt-main dark:text-txt-main-dk wfit mx-auto text-center text-2xl font-bold">
        Write Your Blog
      </h1>
      <p className="text-txt-main dark:text-txt-main-dk wfit mx-auto text-center text-base ">
        Then publish it or save it for later!
      </p>
      <input
        autoFocus
        required
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        type="text"
        value={title}
        className="bg-bg-var text-txt-main dark:text-txt-main-dk dark:bg-bg-var-dk rounded border-2 border-transparent dark:border-txt-main shadow-lg dark:drop-shadow-post-dk p-2"
      />
      <textarea
        required
        cols={50}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        rows={8}
        value={content}
        className="bg-bg-var text-txt-main dark:text-txt-main-dk dark:bg-bg-var-dk rounded border-2 border-transparent dark:border-txt-main shadow-lg dark:drop-shadow-post-dk p-2"
      />
      <div className="px-2 flex flex-row flex-wrap gap-2 bg-bg-var text-txt-main dark:text-txt-main-dk dark:bg-bg-var-dk rounded border-2 border-transparent dark:border-txt-main shadow-lg dark:drop-shadow-post-dk ">
        {tagButtons}
        <input
          onChange={(e) => handleTags(e.target.value)}
          placeholder="Tags (Max 5) e.g.: Typescript, React"
          type="text"
          value={tagString}
          className="bg-bg-var text-txt-main grow dark:text-txt-main-dk dark:bg-bg-var-dk rounded p-2"
        />
      </div>
      <div className="flex gap-2 ml-auto flex-row flex-wrap">
        <SvgButtonNew
          type="submit"
          svg={
            <div className="h-8 p-[0.15rem] aspect-square">
              <SaveSvg />
            </div>
          }
          textElement={<span>Save</span>}
          showTextIn={true}
          clickFunction={() => {
            setPublish(false);
          }}
          className="rounded-full border-2 text-center grid grid-cols-autoFr h-10 px-2 w-32 hover:transition border-txt-main text-txt-main dark:text-txt-main-dk hover:text-txt-main-dk hover:bg-bg-dk dark:border-txt-main-dk dark:hover:text-txt-main dark:hover:bg-bg"
        />

        <SvgButtonNew
          type="submit"
          svg={
            <div className="h-8 p-[0.15rem] aspect-square">
              <PaperPlaneSvg />
            </div>
          }
          textElement={<span>Publish</span>}
          showTextIn={true}
          clickFunction={() => {
            setPublish(true);
          }}
          className="rounded-full border-2 text-center grid grid-cols-autoFr h-10 px-2 w-32 hover:transition border-txt-main text-txt-main dark:text-txt-main-dk hover:text-txt-main-dk hover:bg-bg-dk dark:border-txt-main-dk dark:hover:text-txt-main dark:hover:bg-bg"
        />

        <Link
          className="rounded-full border-2 text-center items-center grid grid-cols-autoFr h-10 px-2 w-32 hover:transition border-txt-main text-txt-main dark:text-txt-main-dk hover:text-txt-main-dk hover:bg-bg-dk dark:border-txt-main-dk dark:hover:text-txt-main dark:hover:bg-bg"
          href="/drafts/"
        >
          <div className="h-8 p-[0.15rem] aspect-square">
            <DeleteSvg />
          </div>

          <span>Cancel</span>
        </Link>
      </div>
    </form>
  );
}
