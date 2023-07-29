/* Core */
import { createSlice } from "@reduxjs/toolkit";
import { FormSliceState } from "./types";

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
    updateField: (state, action) => ({ ...state, ...action.payload }),
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
