import { FormSliceState } from "./types";

export function stringifyForm(formData: FormSliceState) {
  return JSON.stringify({
    ...formData,
    tags: formData.tags ? Array.from(formData.tags) : undefined,
  });
}
export function stringifyField(field: Partial<FormSliceState>) {
  return JSON.stringify(field);
}

export function stringifyTags(tagsIn: FormSliceState["tags"]) {
  return JSON.stringify(tagsIn ? Array.from(tagsIn) : undefined);
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
export function saveField(
  fieldName: string,
  fieldValue: Partial<FormSliceState>
) {
  const stringValue = stringifyField(fieldValue);
  saveKeyValue(fieldName, stringValue);
}
export function saveTags(fieldValue: FormSliceState["tags"]) {
  const stringValue = stringifyTags(fieldValue);
  saveKeyValue("tags", stringValue);
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

function saveKeyValue(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // ignore write errors
  }
}

export function loadKey(key: string) {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return undefined;
    }
    return serializedState;
  } catch (err) {
    return undefined;
  }
}
