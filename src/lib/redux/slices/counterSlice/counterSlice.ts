import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { incrementAsync } from "./asyncThunks";

/* eslint-disable no-param-reassign, import/prefer-default-export */

export interface CounterSliceState {
  value: number;
  status: "idle" | "loading" | "failed";
}
const initialState: CounterSliceState = {
  value: 0,
  status: "idle",
};

const counterSlice = createSlice({
  name: "counter",
  initialState,

  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },

    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.value += action.payload;
      });
  },
});

const { actions, reducer } = counterSlice;
export const { increment, decrement, incrementByAmount } = actions;
export { reducer as counterReducer };
