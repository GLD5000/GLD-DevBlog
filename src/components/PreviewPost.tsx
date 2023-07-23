import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function PreviewPost({
  formState,
}: {
  formState: {
    title: string;
    content: string;
    tags: Map<string, string> | undefined;
    tagString: string;
    publish: boolean;
  };
}) {
  let { title } = formState;
  let subtitle = "";
  const hasSubtitle = title.includes(":");
  if (hasSubtitle) {
    [title, subtitle] = title.split(":");
  }
  return (
    <div className="px-4">
      <div className="mx-auto max-h-[80vh] w-body-sm min-w-body max-w-body-sm overflow-y-auto rounded-xl bg-bg-var p-4 pb-10 shadow-lg dark:bg-bg-var-dk  dark:drop-shadow-post-dk  sm:w-body sm:max-w-body">
        {hasSubtitle ? (
          <>
            <h1 className="mx-auto my-4 w-fit break-words text-center text-3xl font-bold text-txt-main dark:text-txt-main-dk xs:text-5xl sm:text-6xl">
              {title || `no title`}
            </h1>
            <h2 className="mx-auto my-4 w-fit break-words text-center text-xl font-bold text-txt-main dark:text-txt-main-dk xs:text-3xl sm:text-4xl">
              {subtitle || ``}
            </h2>
          </>
        ) : (
          <h1 className="mx-auto my-4 w-fit break-words text-center text-3xl font-bold text-txt-main dark:text-txt-main-dk xs:text-5xl sm:text-6xl">
            {title || `no title`}
          </h1>
        )}
        {formState.content ? (
          <ReactMarkdown
            className="prose mx-auto my-6  w-full  dark:prose-invert sm:prose-lg lg:prose-xl xl:prose-2xl  "
            remarkPlugins={[remarkGfm]}
          >
            {formState.content}
          </ReactMarkdown>
        ) : null}
      </div>
    </div>
  );
}
