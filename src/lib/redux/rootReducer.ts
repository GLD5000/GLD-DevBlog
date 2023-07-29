/* Instruments */
import { FormReducer, counterReducer } from "./slices";

/* eslint-disable import/prefer-default-export */

export const reducer = {
  counter: counterReducer,
  form: FormReducer,
};
