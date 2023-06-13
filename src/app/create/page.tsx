"use client";

import { MouseEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SpicyLi from "@/assets/elements/SpicyLi";


function getTagButtons(tags: string[] | undefined, closeFunction: (tagValue:string)=>void){
  if (!!!tags) return null;
  return tags.map(tag => <SpicyLi key={tag} className="flex my-auto h-8 w-36 min-w-fit flex-row items-center justify-between rounded-full border-2 border-txt-main text-center text-sm hover:transition dark:border-neutral-300 overflow-clip" content={tag} id={tag} closeFunction={closeFunction} />);
}

const Draft: React.FC = () => {
  const Router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [publish, setPublish] = useState(false);
  const [tags, setTags] = useState<string[]>();
  const [tagString, setTagString] = useState("");

  function closeTag(tagValue:string){
    setTags(oldTags =>{
      const newTags = oldTags?.filter(x=> x !== tagValue);
      return newTags;
    });
  }
  
  const tagButtons = getTagButtons(tags, closeTag);

  function pushToTags(stringIn: string) {
    console.log('stringIn:', stringIn);
    setTags((oldArray) => {
console.log('oldArray:', oldArray);

      const newArray =
        !!oldArray && oldArray.length > 0
          ? [...new Set([...oldArray, stringIn.trim()])]
          : [stringIn.trim()];
      return newArray;
    });
    setTagString("");
  }

  function handleTags(currentValue: string) {
    if (/[ ,.]/.test(`${currentValue.at(-1)}`) && currentValue.length > 1 && (tags === undefined || tags.length < 5)) {
      pushToTags(currentValue.slice(0, -1));
      return;
    }
    setTagString(currentValue);
  }

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      const body = { title, content, publish, tags };
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
    <div>
      <form
        onSubmit={submitData}
        className="flex w-full max-w-body mx-auto gap-2 flex-col"
      >
        <h1 className="text-black dark:text-white">New Draft</h1>
        <input
          autoFocus
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          type="text"
          value={title}
          className="bg-bg-var text-black dark:text-white dark:bg-bg-var-dk rounded p-2"
        />
        <textarea
          cols={50}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          rows={8}
          value={content}
          className="bg-bg-var text-black dark:text-white dark:bg-bg-var-dk rounded p-2"
        />
        <div className="px-2 flex flex-row flex-wrap gap-2 bg-bg-var text-black dark:text-white dark:bg-bg-var-dk rounded ">
{tagButtons}
        {/* <span className="bg-bg-var text-black dark:text-white dark:bg-bg-var-dk rounded p-2">
          {JSON.stringify(tags)}
        </span> */}
        <input
          onChange={(e) => handleTags(e.target.value)}
          placeholder="Tags (Max 5)"
          type="text"
          value={tagString}
          className="bg-bg-var text-black grow dark:text-white dark:bg-bg-var-dk rounded p-2"
        />
        </div>
        <div className="flex gap-2 ml-auto flex-row flex-wrap">
          <input
            disabled={!content || !title}
            type="submit"
            value="Save"
            onClick={() => {
              setPublish(false);
            }}
            className="rounded border-2 text-center flex  items-center justify-center h-10 my-auto w-28 hover:transition border-black text-black dark:text-white p-1 hover:text-white hover:bg-black dark:border-white dark:hover:text-black dark:hover:bg-white"
          />
          <input
            disabled={!content || !title}
            type="submit"
            value="Publish"
            onClick={() => {
              setPublish(true);
            }}
            className="rounded border-2 text-center flex  items-center justify-center h-10 my-auto w-28 hover:transition border-black text-black dark:text-white p-1 hover:text-white hover:bg-black dark:border-white dark:hover:text-black dark:hover:bg-white"
          />
          <Link
            className="rounded border-2 text-center flex  items-center justify-center h-10 my-auto w-28 hover:transition border-black text-black dark:text-white p-1 hover:text-white hover:bg-black dark:border-white dark:hover:text-black dark:hover:bg-white"
            href="/drafts/"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Draft;
