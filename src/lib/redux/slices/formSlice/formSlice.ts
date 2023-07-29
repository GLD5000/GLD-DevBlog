/* Core */
import { createSlice } from "@reduxjs/toolkit";
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
        // push to tags
      }
      saveTags(action.payload);
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
