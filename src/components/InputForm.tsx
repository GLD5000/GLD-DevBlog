"use client";

import { useEffect, useReducer, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SpicyLi from "@/elements/SpicyLi";
import PaperPlaneSvg from "@/assets/icons/PaperPlaneSvg";
import SvgButtonNew from "@/elements/SvgButtonNew";
import DeleteSvg from "@/assets/icons/DeleteSvg";
import SaveSvg from "@/assets/icons/SaveSvg";
import getReadTime from "@/utilities/number/readTime";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import getRandomColour from "@/utilities/colour/randomColour";
import CloseSvg from "@/assets/icons/CloseSvg";

interface FormState {
  title: string;
  content: string;
  tags: Map<string, string> | undefined;
  tagString: string;
  publish: boolean;
}

type FormPayload = Partial<FormState>;

function getTagButtons(
  tags: Map<string, string> | undefined,
  closeFunction: (tagValue: string) => void,
  colourUpdateFunction: (tagValue: string) => void
) {
  if (!!!tags) return null;
  return Array.from(tags).map((tag) => (
    <SpicyLi
      key={tag[0]}
      className="flex my-auto h-8 w-36 min-w-fit flex-row items-center justify-between rounded-full border-2 border-txt-main text-center text-sm hover:transition dark:border-neutral-300 overflow-clip"
      content={tag[0]}
      id={tag[0]}
      inputcolour={tag[1]}
      closeFunction={closeFunction}
      colourUpdateFunction={colourUpdateFunction}
    />
  ));
}

export default function InputForm({
  initialTitle = undefined,
  initialContent = undefined,
  initialTags = undefined,
  intialId = undefined,
}: {
  initialTitle?: string;
  initialContent?: string;
  initialTags?: Map<string, string>;
  intialId?: string;
}) {
  const Router = useRouter();


  const [formState, formDispatch] = useReducer(
    formReducer,
    { initialTitle, initialContent, initialTags },
    formInitialiser
  );

  function formInitialiser({
    initialTitle,
    initialContent,
    initialTags,
  }: {
    initialTitle: string | undefined;
    initialContent: string | undefined;
    initialTags: Map<string, string> | undefined | null;
  }): FormState {
    const returnedJson = localStorage.getItem("inputForm");
    if (!!!returnedJson) {
      const initialObject = {
        title: initialTitle || "",
        content: initialContent || "",
        publish: false,
        tags: initialTags || undefined,
        tagString: "",
      };
      return initialObject;
    }

    const returnedObj = JSON.parse(returnedJson);
    const tagsArray = returnedObj.tags
      ? Array.from(returnedObj.tags)
      : undefined;
    const tagsMap =
      initialTags || tagsArray
        ? new Map(tagsArray as [string, string][])
        : undefined;
    const initialObject = {
      title: initialTitle || returnedObj.title || "",
      content: initialContent || returnedObj.content || "",
      publish: false,
      tags: tagsMap,
      tagString: returnedObj.tagString || "",
    };
    return initialObject;
  }

  function formReducer(
    state: FormState,
    action: {
      type?: string;
      payload: FormPayload;
    }
  ) {
    switch (action.type) {
      default: {
        
        const returnObject = { ...state, ...action.payload };
        if (action.payload){
                localStorage.setItem(
        "inputForm",
        JSON.stringify({
          title: returnObject.title,
          content: returnObject.content,
          publish:returnObject.publish,
          tagString:returnObject.tagString,
          tags: returnObject.tags ? Array.from(returnObject.tags) : undefined,
        })
      );
        }
        return returnObject;
      }
    }
  }

  const id = intialId || undefined;
  // useEffect(() => {
  //   let run = true;
  //   let hasContent =
  //     title.length > 0 || content.length > 0 || (!!tags && tags.size > 0);

  //   if (run && hasContent) {
  //     localStorage.setItem(
  //       "inputForm",
  //       JSON.stringify({
  //         title,
  //         content,
  //         publish,
  //         tags: tags ? Array.from(tags) : undefined,
  //       })
  //     );
  //   } else if (run && !hasContent) {
  //     const returnedJson = localStorage.getItem("inputForm");
  //     if (!!!returnedJson) return;
  //     const returnedObj = JSON.parse(returnedJson);
  //   }
  //   return () => {
  //     run = false;
  //   };
  // }, [
  //   title,
  //   content,
  //   publish,
  //   tags,
  //   setTitle,
  //   setContent,
  //   setPublish,
  //   setTags,
  // ]);

  function closeTag(tagValue: string) {
    const newTags = formState.tags ? new Map(formState.tags) : new Map();
    newTags.delete(tagValue);
    formDispatch({ payload: { tags: newTags } });
  }
  function recolourTag(tagValue: string) {
    const newTags = formState.tags ? new Map(formState.tags) : new Map();
    newTags.set(tagValue, getRandomColour("mid"));
    formDispatch({ payload: { tags: newTags } });
  }
  const post = { content: formState.content, title: formState.title };

  const tagButtons = getTagButtons(formState.tags, closeTag, recolourTag);

  function pushToTags(stringIn: string) {
    const newTags = formState.tags ? new Map(formState.tags) : new Map();
    newTags.set(stringIn.trim(), getRandomColour("mid"));
    formDispatch({ payload: { tags: newTags, tagString: "" } });
  }

  function handleTags(currentValue: string) {
    if (
      /[ ,.]/.test(`${currentValue.at(-1)}`) &&
      currentValue.length > 1 &&
      (formState.tags === undefined || formState.tags.size < 5)
    ) {
      pushToTags(currentValue.slice(0, -1));
      return;
    }
    formDispatch({ payload: { tagString: currentValue } });
  }

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const readTime = getReadTime(formState.content);
    try {
      const body = {
        content: formState.content,
        title: formState.title,
        publish: formState.publish,
        tags: formState.tags ? Array.from(formState.tags) : undefined,
        id,
        readTime,
      };
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
    <>
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
          onChange={(e) => formDispatch({ payload: { title: e.target.value } })}
          placeholder="Title"
          type="text"
          value={formState.title}
          className="bg-bg-var text-txt-main dark:text-txt-main-dk dark:bg-bg-var-dk rounded border-2 border-transparent dark:border-txt-main shadow-lg dark:drop-shadow-post-dk p-2"
        />
        <textarea
          required
          cols={50}
          onChange={(e) =>
            formDispatch({ payload: { content: e.target.value } })
          }
          placeholder="Content"
          rows={8}
          value={formState.content}
          className="bg-bg-var text-txt-main dark:text-txt-main-dk dark:bg-bg-var-dk rounded border-2 border-transparent dark:border-txt-main shadow-lg dark:drop-shadow-post-dk p-2"
        />
        <div className="px-2 flex flex-row flex-wrap gap-2 bg-bg-var text-txt-main dark:text-txt-main-dk dark:bg-bg-var-dk rounded border-2 border-transparent dark:border-txt-main shadow-lg dark:drop-shadow-post-dk ">
          {tagButtons}
          <input
            onChange={(e) => handleTags(e.target.value)}
            placeholder="Tags (Max 5) e.g.: Typescript, React"
            type="text"
            value={formState.tagString}
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
              formDispatch({ payload: { publish: false } })
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
              formDispatch({ payload: { publish: true } })
            }}
            className="rounded-full border-2 text-center grid grid-cols-autoFr h-10 px-2 w-32 hover:transition border-txt-main text-txt-main dark:text-txt-main-dk hover:text-txt-main-dk hover:bg-bg-dk dark:border-txt-main-dk dark:hover:text-txt-main dark:hover:bg-bg"
          />

<SvgButtonNew
            type="button"
            svg={
              <div className="h-8 p-[0.15rem] aspect-square">
              <DeleteSvg />
            </div>
            }
            textElement={<span>Clear</span>}
            showTextIn={true}
            clickFunction={(e) => {
              e.preventDefault();
              formDispatch({payload:{title:'',content:'',tagString:'',tags:undefined}})
              localStorage.clear();
            }}
            className="rounded-full border-2 text-center grid grid-cols-autoFr h-10 px-2 w-32 hover:transition border-txt-main text-txt-main dark:text-txt-main-dk hover:text-txt-main-dk hover:bg-bg-dk dark:border-txt-main-dk dark:hover:text-txt-main dark:hover:bg-bg"
          />

          <Link
            className="rounded-full border-2 text-center items-center grid grid-cols-autoFr h-10 px-2 w-32 hover:transition border-txt-main text-txt-main dark:text-txt-main-dk hover:text-txt-main-dk hover:bg-bg-dk dark:border-txt-main-dk dark:hover:text-txt-main dark:hover:bg-bg"
            href="/drafts/"
            onClick={() => {localStorage.clear()}}
          >
            <div className="h-8 p-[0.15rem] aspect-square">
              <CloseSvg/>
            </div>

            <span>Cancel</span>
          </Link>
        </div>
      </form>
      <div className="bg-bg-var dark:bg-bg-var-dk p-4 rounded-xl shadow-lg dark:drop-shadow-post-dk">
        <h1 className="mx-auto my-4 w-fit text-6xl font-bold text-txt-main dark:text-txt-main-dk text-center break-all">
          {post.title ? post.title : `no title`}
        </h1>
        {post.content ? (
          <ReactMarkdown
            className="my-6 w-full prose dark:prose-invert sm:prose-lg lg:prose-xl xl:prose-2xl mx-auto  "
            remarkPlugins={[remarkGfm]}
          >
            {post.content}
          </ReactMarkdown>
        ) : null}
      </div>
    </>
  );
}
