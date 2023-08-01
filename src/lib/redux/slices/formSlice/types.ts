export interface FormSliceState {
  title: string;
  content: string;
  tags: [string, string][] | undefined;
  tagString: string;
  publish: boolean;
  status: "idle" | "loading" | "failed";
}
