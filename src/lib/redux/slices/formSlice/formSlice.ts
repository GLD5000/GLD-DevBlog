import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FormSliceState } from "./types";
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
export const { updateForm, recolourTag, closeTag, clearForm } = actions;
export { reducer as FormReducer };
