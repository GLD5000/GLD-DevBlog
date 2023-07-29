export interface FormSliceState {
  title: string;
  content: string;
  tags: Map<string, string> | undefined;
  tagString: string;
  publish: boolean;
}
