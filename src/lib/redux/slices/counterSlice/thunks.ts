/* Instruments */
import type { ReduxThunkAction } from "@/lib/redux";
import { selectCount } from "./selectors";
import { incrementByAmount } from "./counterSlice";

/* eslint-disable import/prefer-default-export */

export const incrementIfOddAsync =
  (amount: number): ReduxThunkAction =>
  (dispatch, getState) => {
    const currentValue = selectCount(getState());

    if (currentValue % 2 === 1) {
      dispatch(incrementByAmount(amount));
    }
  };
