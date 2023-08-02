import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import getRandomColour from "@/utilities/colour/randomColour";
import { FormSliceState } from "./types";
import { saveField, saveTags } from "./localStorage";
import { updateFromBlogPost } from "./asyncThunks";

/* eslint-disable no-param-reassign, import/prefer-default-export */

const initialState: FormSliceState = {
  id: undefined,
  title: "",
  content: "",
  publish: false,
  tags: undefined,
  tagString: "",
  status: "idle",
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateForm: (state, action: PayloadAction<Partial<FormSliceState>>) => ({
      ...state,
      ...action.payload,
    }),
    updateFields: (
      state,
      action: PayloadAction<{ [key: string]: string | [string, string][] }>
    ) =>
      // Object.entries(action.payload).forEach((entry) => {
      //   const [key, value] = entry;
      //   saveField(key, value);
      // });
      ({
        ...state,
        ...action.payload,
      }),
    // updateTags: (state, action: PayloadAction<{ tags: [string,string][] }>) => {
    //   return {
    //     ...state,
    //     ...action.payload,
    //   };
    // },

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
    publishFalse: (state) => ({ ...state, publish: false }),
    publishTrue: (state) => ({ ...state, publish: true }),
    clearForm: (): FormSliceState => ({
      id: undefined,
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
      .addCase(updateFromBlogPost.fulfilled, (state, action) => ({
        status: "idle",
        ...action.payload,
      }));
  },
});

const { actions, reducer } = formSlice;
export const {
  updateForm,
  updateFields,
  // updateTags,
  // updateTag,
  recolourTag,
  closeTag,
  publishFalse,
  publishTrue,
  clearForm,
} = actions;
export { reducer as FormReducer };
// export type CloseTag = typeof closeTag;
// export type RecolourTag = typeof recolourTag;

function deepCopyTags(tags: [string, string][]): [string, string][] {
  return tags.map((entry) => [...entry]);
}
