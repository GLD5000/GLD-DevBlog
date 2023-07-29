/* Core */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

/* eslint-disable no-param-reassign, import/prefer-default-export */

/* Types */
export interface FormSliceState {
  title: string;
  content: string;
  tags: Map<string, string> | undefined;
  tagString: string;
  publish: boolean;
}
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
