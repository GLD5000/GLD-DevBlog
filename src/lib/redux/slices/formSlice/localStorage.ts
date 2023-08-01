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
  const initialObject = {
    title: returnedObj.title || "",
    content: returnedObj.content || "",
    publish: false,
    tags: tagsArray || undefined,
    tagString: "",
  };
  return initialObject;
}

export function saveForm(state: FormSliceState) {
  try {
    const serializedState = stringifyForm(state);
    window.localStorage.setItem("inputForm", serializedState);
  } catch {
    // ignore write errors
  }
}
export function saveField(fieldName: string, fieldValue: string | boolean) {
  // const stringValue = stringifyField(fieldValue);
  saveKeyValue(fieldName, `${fieldValue}`);
}
export function saveTags(fieldValue: FormSliceState["tags"]) {
  const stringValue = stringifyTags(fieldValue);
  saveKeyValue("tags", stringValue);
}

export interface LoadedForm {
  id: string | undefined;
  title: string;
  content: string;
  tags: [string, string][] | undefined;
  publish: false;
  tagString: "";
}

export function loadForm(): LoadedForm {
  try {
    const id = window.localStorage.getItem("id");
    const title = window.localStorage.getItem("title");
    const content = window.localStorage.getItem("content");
    const tags = window.localStorage.getItem("tags");
    if (title === null && content === null && tags === null) {
      return {
        id: undefined,
        title: "",
        content: "",
        publish: false,
        tags: undefined,
        tagString: "",
      };
    }
    return {
      id: id || undefined,
      title: title || "",
      content: content || "",
      publish: false,
      tags: tags ? JSON.parse(tags) || undefined : undefined,
      tagString: "",
    };
  } catch (err) {
    return {
      id: undefined,
      title: "",
      content: "",
      publish: false,
      tags: undefined,
      tagString: "",
    };
  }
}

function saveKeyValue(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
    console.log(
      `window.localStorage.getItem(${key}):`,
      window.localStorage.getItem(key)
    );
  } catch {
    // ignore write errors
  }
}

export function loadKey(key: string) {
  try {
    const serializedState = window.localStorage.getItem(key);
    if (serializedState === null) {
      return undefined;
    }
    return serializedState;
  } catch (err) {
    return undefined;
  }
}

export function saveFields(stateIn: Partial<FormSliceState>) {
  Object.entries(stateIn).forEach((entry) => {
    const [key, value] = entry;
    if (Array.isArray(value)) {
      saveTags(value);
    } else {
      saveField(key, value ?? "");
    }
  });
}

export function checkHasSavedForm() {
  const { localStorage } = window;
  return (
    !!localStorage.getItem("tags")?.length ||
    !!localStorage.getItem("title")?.length ||
    !!localStorage.getItem("content")?.length
  );
}
