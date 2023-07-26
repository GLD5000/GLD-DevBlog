/* Instruments */
import type { ReduxState } from "@/lib/redux";

/* eslint-disable import/prefer-default-export */

export const selectCount = (state: ReduxState) => state.counter.value;
