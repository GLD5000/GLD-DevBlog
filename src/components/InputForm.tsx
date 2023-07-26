"use client";

import { useReducer } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SpicyLi from "@/components/elements/SpicyLi";
import PaperPlaneSvg from "@/assets/icons/PaperPlaneSvg";
import SvgButtonNew from "@/components/elements/SvgButtonNew";
import DeleteSvg from "@/assets/icons/DeleteSvg";
import SaveSvg from "@/assets/icons/SaveSvg";
import getReadTime from "@/utilities/number/readTime";
import getRandomColour from "@/utilities/colour/randomColour";
import CloseSvg from "@/assets/icons/CloseSvg";
import PreviewPost from "./PreviewPost";

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
  if (!tags) return null;
  return Array.from(tags).map((tag) => (
    <SpicyLi
      key={tag[0]}
      className="my-auto flex h-8 w-36 min-w-fit flex-row items-center justify-between overflow-clip rounded-full border-2 border-txt-main text-center text-sm hover:transition dark:border-neutral-300"
      content={tag[0]}
      id={tag[0]}
      inputcolour={tag[1]}
      closeFunction={closeFunction}
      colourUpdateFunction={colourUpdateFunction}
    />
  ));
}
function formInitialiser({
  initialTitle,
  initialContent,
  initialTags,
}: {
  initialTitle: string | undefined;
  initialContent: string | undefined;
  initialTags: Map<string, string> | undefined | null;
}): FormState {
  if (initialTitle || initialContent || initialTags) {
    const initialObject = {
      title: initialTitle || "",
      content: initialContent || "",
      publish: false,
      tags:
        initialTags && !Array.isArray(initialTags) ? initialTags : undefined,
      tagString: "",
    };
    return initialObject;
  }
  const returnedJson = localStorage.getItem("inputForm");

  if (returnedJson) {
    const returnedObj = JSON.parse(returnedJson);
    const tagsArray = returnedObj.tags
      ? Array.from(returnedObj.tags)
      : undefined;
    const tagsMap = tagsArray
      ? new Map(tagsArray as [string, string][])
      : undefined;
    const initialObject = {
      title: returnedObj.title || "",
      content: returnedObj.content || "",
      publish: false,
      tags: tagsMap,
      tagString: returnedObj.tagString || "",
    };
    return initialObject;
  }
  const initialObject = {
    title: "",
    content: "",
    publish: false,
    tags: undefined,
    tagString: "",
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
      if (action.payload) {
        localStorage.setItem(
          "inputForm",
          JSON.stringify({
            title: returnObject.title,
            content: returnObject.content,
            publish: returnObject.publish,
            tagString: returnObject.tagString,
            tags: returnObject.tags ? Array.from(returnObject.tags) : undefined,
          })
        );
      }
      return returnObject;
    }
  }
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
  const id = intialId || undefined;
  const [formState, formDispatch] = useReducer(
    formReducer,
    { initialTitle, initialContent, initialTags },
    formInitialiser
  );
  console.log("initialTags:", initialTags);
  console.log("formState:", formState);
  console.log("Array.isArray(formState.tags):", Array.isArray(formState.tags));
  const tagButtons = getTagButtons(formState.tags, closeTag, recolourTag);

  return (
    <div className="pb-24">
      <form
        onSubmit={submitData}
        className="mx-auto flex w-full max-w-body flex-col gap-4 p-4"
      >
        <h1 className="wfit mx-auto text-center text-2xl font-bold text-txt-main dark:text-txt-main-dk">
          Write Your Blog
        </h1>
        <p className="wfit mx-auto text-center text-base text-txt-main dark:text-txt-main-dk ">
          Then publish it or save it for later!
        </p>
        <input
          required
          onChange={(e) => formDispatch({ payload: { title: e.target.value } })}
          placeholder="Title"
          type="text"
          value={formState.title}
          className="rounded border-2 border-transparent bg-bg-var p-2 text-txt-main shadow-lg dark:border-txt-main dark:bg-bg-var-dk dark:text-txt-main-dk dark:drop-shadow-post-dk"
        />
        <textarea
          required
          spellCheck
          cols={50}
          onChange={(e) =>
            formDispatch({ payload: { content: e.target.value } })
          }
          placeholder="Content"
          rows={8}
          value={formState.content}
          className="rounded border-2 border-transparent bg-bg-var p-2 text-txt-main shadow-lg dark:border-txt-main dark:bg-bg-var-dk dark:text-txt-main-dk dark:drop-shadow-post-dk"
        />
        <div className="flex flex-row flex-wrap gap-2 rounded border-2 border-transparent bg-bg-var px-2 text-txt-main shadow-lg dark:border-txt-main dark:bg-bg-var-dk dark:text-txt-main-dk dark:drop-shadow-post-dk ">
          {tagButtons}
          <input
            onChange={(e) => handleTags(e.target.value)}
            placeholder="Tags (Max 5) e.g.: Typescript, React"
            type="text"
            value={formState.tagString}
            className="grow rounded bg-bg-var p-2 text-txt-main dark:bg-bg-var-dk dark:text-txt-main-dk"
          />
        </div>
        <div className="ml-auto flex flex-row flex-wrap gap-2">
          <SvgButtonNew
            type="submit"
            svg={
              <div className="aspect-square h-8 p-[0.15rem]">
                <SaveSvg />
              </div>
            }
            textElement={<span>Save</span>}
            showTextIn
            clickFunction={() => {
              formDispatch({ payload: { publish: false } });
            }}
            className="grid h-10 w-32 grid-cols-autoFr rounded-full border-2 border-txt-main px-2 text-center text-txt-main hover:bg-bg-dk hover:text-txt-main-dk hover:transition dark:border-txt-main-dk dark:text-txt-main-dk dark:hover:bg-bg dark:hover:text-txt-main"
          />

          <SvgButtonNew
            type="submit"
            svg={
              <div className="aspect-square h-8 p-[0.15rem]">
                <PaperPlaneSvg />
              </div>
            }
            textElement={<span>Publish</span>}
            showTextIn
            clickFunction={() => {
              formDispatch({ payload: { publish: true } });
            }}
            className="grid h-10 w-32 grid-cols-autoFr rounded-full border-2 border-txt-main px-2 text-center text-txt-main hover:bg-bg-dk hover:text-txt-main-dk hover:transition dark:border-txt-main-dk dark:text-txt-main-dk dark:hover:bg-bg dark:hover:text-txt-main"
          />

          <SvgButtonNew
            type="button"
            svg={
              <div className="aspect-square h-8 p-[0.15rem]">
                <DeleteSvg />
              </div>
            }
            textElement={<span>Clear</span>}
            showTextIn
            clickFunction={(e) => {
              e.preventDefault();
              formDispatch({
                payload: {
                  title: "",
                  content: "",
                  tagString: "",
                  tags: undefined,
                },
              });
              localStorage.clear();
            }}
            className="grid h-10 w-32 grid-cols-autoFr rounded-full border-2 border-txt-main px-2 text-center text-txt-main hover:bg-bg-dk hover:text-txt-main-dk hover:transition dark:border-txt-main-dk dark:text-txt-main-dk dark:hover:bg-bg dark:hover:text-txt-main"
          />

          <Link
            className="grid h-10 w-32 grid-cols-autoFr items-center rounded-full border-2 border-txt-main px-2 text-center text-txt-main hover:bg-bg-dk hover:text-txt-main-dk hover:transition dark:border-txt-main-dk dark:text-txt-main-dk dark:hover:bg-bg dark:hover:text-txt-main"
            href="/drafts/"
          >
            <div className="aspect-square h-8 p-[0.15rem]">
              <CloseSvg />
            </div>

            <span>Exit</span>
          </Link>
        </div>
      </form>
      <PreviewPost formState={formState} />
    </div>
  );
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
  async function submitData(e: React.SyntheticEvent) {
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
      // window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }
}
