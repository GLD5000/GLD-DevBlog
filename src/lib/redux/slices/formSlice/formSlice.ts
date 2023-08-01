import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import getRandomColour from "@/utilities/colour/randomColour";
import build from "next/dist/build";
import { FormSliceState } from "./types";
import { saveField, saveTags } from "./localStorage";
import { updateFromBlogPost } from "./asyncThunks";

/* eslint-disable no-param-reassign, import/prefer-default-export */

const initialState: FormSliceState = {
  title: "",
  content: "",
  publish: false,
  tags: undefined,
  tagString: "",
  status: "idle",
};
function testToAddTag(
  currentString: string,
  currentTags: [string, string][] | undefined
) {
  const stringComplete =
    /[ ,.]/.test(`${currentString.at(-1)}`) && currentString.length > 1;
  const tagsHaveSpace = currentTags === undefined || currentTags.length < 5;
  return stringComplete && tagsHaveSpace;
}

function getUpdatedTags(
  stringIn: string,
  tagsFromState: FormSliceState["tags"]
) {
  const newTags = tagsFromState || [];
  newTags.push([stringIn.trim(), getRandomColour("mid")]);
  return { tags: newTags, tagString: "" };
}

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    // updateForm: (state, action: PayloadAction<FormSliceState>) => {

    // },
    updateField: (state, action: PayloadAction<{ [key: string]: string }>) => {
      Object.entries(action.payload).forEach((entry) => {
        const [key, value] = entry;
        saveField(key, value);
      });
      return {
        ...state,
        ...action.payload,
      };
    },
    closeTag: (state, action: PayloadAction<string>) => {
      const newTags = state.tags ? new Map(state.tags) : new Map();
      newTags.delete(action.payload);
      return { ...state, tags: Array.from(newTags) };
    },
    recolourTag: (
      state,
      action: PayloadAction<{ name: string; colour: string }>
    ) => {
      const newTags = state.tags ? new Map(state.tags) : new Map();
      newTags.set(action.payload.name, action.payload.colour);
      return { ...state, tags: Array.from(newTags) };
    },
    updateTag: (state, action: PayloadAction<string>) => {
      const currentString = action.payload;
      const currentTags = state.tags;
      const shouldAddTag = testToAddTag(currentString, currentTags);
      if (shouldAddTag) {
        const { tags, tagString } = getUpdatedTags(currentString, currentTags);
        saveField("tagString", tagString);
        saveTags(tags);
        return { ...state, tags, tagString };
      }
      saveField("tagString", currentString);
      return { ...state, tagString: currentString };
    },
    publishFalse: (state) => ({ ...state, publish: false }),
    publishTrue: (state) => ({ ...state, publish: true }),
    clearForm: (): FormSliceState => ({
      title: "",
      content: "",
      publish: false,
      tags: undefined,
      tagString: "",
      status: "idle",
    }),
  },
  extraReducers(builder) {
    builder
      .addCase(updateFromBlogPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateFromBlogPost.fulfilled, (_, action) => ({
        status: "idle",
        ...action.payload,
      }));
  },
});

const { actions, reducer } = formSlice;
export const {
  updateField,
  updateTag,
  recolourTag,
  closeTag,
  publishFalse,
  publishTrue,
  clearForm,
} = actions;
export { reducer as FormReducer };
// export type CloseTag = typeof closeTag;
// export type RecolourTag = typeof recolourTag;
