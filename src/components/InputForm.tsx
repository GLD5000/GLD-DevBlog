"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import SpicyLi from "@/components/elements/SpicyLi";
import PaperPlaneSvg from "@/assets/icons/PaperPlaneSvg";
import SvgButtonNew from "@/components/elements/SvgButtonNew";
import DeleteSvg from "@/assets/icons/DeleteSvg";
import SaveSvg from "@/assets/icons/SaveSvg";
import getReadTime from "@/utilities/number/readTime";
import CloseSvg from "@/assets/icons/CloseSvg";
import {
  useSelector,
  useDispatch,
  clearForm,
  selectContent,
  selectForm,
  selectTagString,
  selectTags,
  selectTitle,
  updateFormFromStorage,
  updateTagStringInput,
  updateStringInput,
  updateBooleanInput,
} from "@/lib/redux";
import { checkHasSavedForm } from "@/lib/redux/slices/formSlice/localStorage";
import PreviewPost from "./PreviewPost";

let loaded = true;
function getTagButtons(tags: [string, string][] | undefined) {
  if (!tags) return null;
  return Array.from(tags).map((tag) => (
    <SpicyLi
      key={tag[0]}
      className="my-auto flex h-8 w-36 min-w-fit flex-row items-center justify-between overflow-clip rounded-full border-2 border-txt-main text-center text-sm hover:transition dark:border-neutral-300"
      content={tag[0]}
      id={tag[0]}
      inputcolour={tag[1]}
    />
  ));
}
export default function InputForm() {
  const dispatch = useDispatch();
  const formState = useSelector(selectForm);
  const Router = useRouter();
  const tagButtons = getTagButtons(useSelector(selectTags));

  if (typeof window !== "undefined" && loaded) {
    loaded = false;
    const hasSavedForm = checkHasSavedForm();
    const emptyForm =
      formState.content.length === 0 && formState.title.length === 0;
    if (hasSavedForm && emptyForm) dispatch(updateFormFromStorage());
  }

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
          onChange={(e) => {
            dispatch(
              updateStringInput({ key: "title", value: e.target.value })
            );
          }}
          placeholder="Title"
          type="text"
          value={useSelector(selectTitle)}
          className="rounded border-2 border-transparent bg-bg-var p-2 text-txt-main shadow-lg dark:border-txt-main dark:bg-bg-var-dk dark:text-txt-main-dk dark:drop-shadow-post-dk"
        />
        <textarea
          required
          spellCheck
          cols={50}
          onChange={(e) => {
            dispatch(
              updateStringInput({ key: "content", value: e.target.value })
            );
          }}
          placeholder="Content"
          rows={8}
          value={useSelector(selectContent)}
          className="rounded border-2 border-transparent bg-bg-var p-2 text-txt-main shadow-lg dark:border-txt-main dark:bg-bg-var-dk dark:text-txt-main-dk dark:drop-shadow-post-dk"
        />
        <div className="flex flex-row flex-wrap gap-2 rounded border-2 border-transparent bg-bg-var px-2 text-txt-main shadow-lg dark:border-txt-main dark:bg-bg-var-dk dark:text-txt-main-dk dark:drop-shadow-post-dk ">
          {tagButtons}
          <input
            onChange={(e) => {
              e.preventDefault();

              dispatch(updateTagStringInput(e.target.value));
            }}
            placeholder="Tags (Max 5) e.g.: Typescript, React"
            type="text"
            value={useSelector(selectTagString)}
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
              dispatch(updateBooleanInput({ key: "publish", value: false }));
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
              dispatch(updateBooleanInput({ key: "publish", value: true }));
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
              dispatch(clearForm());
              window.localStorage.clear();
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
      <PreviewPost />
    </div>
  );
  async function submitData(e: React.SyntheticEvent) {
    e.preventDefault();
    const readTime = getReadTime(formState.content);
    try {
      const body = { ...formState, readTime };
      await fetch("/api/post/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      Router.push("/drafts/");
    } catch (error) {
      console.error(error);
    }
  }
}
