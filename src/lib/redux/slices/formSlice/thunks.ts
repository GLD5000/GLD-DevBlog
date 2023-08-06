import { type ReduxThunkAction } from "@/lib/redux";
import getRandomColour from "@/utilities/colour/randomColour";
import { FormSliceState } from "./types";
import { selectTags } from "./selectors";
import { updateForm } from "./formSlice";
import { loadForm, saveField, saveTags } from "./localStorage";
/* eslint-disable import/prefer-default-export */

export const updateFormFromStorage = (): ReduxThunkAction => (dispatch) => {
  const storedForm: {
    id: string | undefined;
    title: string;
    content: string;
    tags: [string, string][] | undefined;
    publish: false;
    tagString: "";
  } = loadForm();
  dispatch(updateForm(storedForm));
};

export function updateStringInput({
  key,
  value,
}: {
  key: string;
  value: string;
}): ReduxThunkAction {
  return (dispatch) => {
    saveField(key, value);
    dispatch(updateForm({ [key]: value }));
  };
}
export function updateBooleanInput({
  key,
  value,
}: {
  key: string;
  value: boolean;
}): ReduxThunkAction {
  return (dispatch) => {
    saveField(key, `${value}`);
    dispatch(updateForm({ [key]: value }));
  };
}
export function updateTagStringInput(currentString: string): ReduxThunkAction {
  return (dispatch, getState) => {
    const tagsFromState = selectTags(getState());
    const currentTags = tagsFromState
      ? deepCopyTags(tagsFromState)
      : tagsFromState;
    const stringComplete =
      /[ ,.]/.test(`${currentString.at(-1)}`) && currentString.length > 1;
    const tagsHaveSpace = currentTags === undefined || currentTags.length < 5;

    const shouldAddTag = stringComplete && tagsHaveSpace;
    if (shouldAddTag) {
      const { tags, tagString } = getUpdatedTags(currentString, currentTags);
      dispatch(updateForm({ tagString, tags }));
      saveField("tagString", tagString);
      saveTags(tags);
    } else if (tagsHaveSpace) {
      saveField("tagString", currentString);
      dispatch(updateForm({ tagString: currentString }));
    }
  };
}

function getUpdatedTags(
  stringIn: string,
  tagsFromState: FormSliceState["tags"]
) {
  const newTagsMap = new Map(tagsFromState) || new Map();
  newTagsMap.set(stringIn.trim(), getRandomColour("mid"));
  return { tags: Array.from(newTagsMap), tagString: "" };
}

function deepCopyTags(tags: [string, string][]): [string, string][] {
  return tags.map((entry) => [...entry]);
}
