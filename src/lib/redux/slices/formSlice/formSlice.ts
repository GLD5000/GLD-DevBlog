/* Core */
import { createSlice } from "@reduxjs/toolkit";
import getRandomColour from "@/utilities/colour/randomColour";
import { FormSliceState } from "./types";
import { saveField, saveTags } from "./localStorage";

/* eslint-disable no-param-reassign, import/prefer-default-export */

/* Types */

const initialState: FormSliceState = {
  title: "",
  content: "",
  publish: false,
  tags: undefined,
  tagString: "",
};

const formSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    updateField: (state, action) => {
      saveField(Object.keys(action.payload)[0], action.payload);
      return { ...state, ...action.payload };
    },
    updateTags: (state, action) => {
      const currentString = action.payload;
      const currentTags = state.tags;
      const shouldAddTag = testToAddTag(currentString, currentTags);
      if (shouldAddTag) {
        const { tags, tagString } = addNewTag(currentString, currentTags);
        saveField("tagString", { tagString });
        saveTags(tags);
        return { tags, tagString };
      }
      saveField("tagString", action.payload);
      return { ...state, ...action.payload };
    },
  },
  // extraReducers: (builder) => {
  //   builder.addDefaultCase((state, action) => ({
  //     ...state,
  //     ...action.payload,
  //   }));
  // },
});

const { actions, reducer } = formSlice;
export const { updateField } = actions;
export { reducer as FormReducer };

function testToAddTag(
  currentString: any,
  currentTags: Map<string, string> | undefined
) {
  const stringComplete =
    /[ ,.]/.test(`${currentString.at(-1)}`) && currentString.length > 1;
  const tagsHaveSpace = currentTags === undefined || currentTags.size < 5;
  return stringComplete && tagsHaveSpace;
}

function addNewTag(stringIn: string, tagsFromState: FormSliceState["tags"]) {
  const newTags = tagsFromState ? new Map(tagsFromState) : new Map();
  newTags.set(stringIn.trim(), getRandomColour("mid"));
  return { tags: newTags, tagString: "" };
}
