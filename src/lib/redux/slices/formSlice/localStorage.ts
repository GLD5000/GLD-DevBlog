import { FormSliceState } from "@/lib/redux/slices/formSlice";

export function stringifyForm(formData: FormSliceState) {
  return JSON.stringify({
    ...formData,
    tags: formData.tags ? Array.from(formData.tags) : undefined,
  });
}

export function parseForm(formData: string) {
  const returnedObj = JSON.parse(formData);
  const tagsArray = returnedObj.tags ? Array.from(returnedObj.tags) : undefined;
  const tagsMap = tagsArray
    ? new Map(tagsArray as [string, string][])
    : undefined;
  const initialObject = {
    title: returnedObj.title || "",
    content: returnedObj.content || "",
    publish: returnedObj.publish || false,
    tags: tagsMap,
    tagString: returnedObj.tagString || "",
  };
  return initialObject;
}

export function saveForm(state: FormSliceState) {
  try {
    const serializedState = stringifyForm(state);
    localStorage.setItem("inputForm", serializedState);
  } catch {
    // ignore write errors
  }
}

export function loadForm() {
  try {
    const serializedState = localStorage.getItem("inputForm");
    if (serializedState === null) {
      return undefined;
    }
    return parseForm(serializedState);
  } catch (err) {
    return undefined;
  }
}
