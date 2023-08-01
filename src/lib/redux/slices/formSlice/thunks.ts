/* Instruments */
import { type ReduxThunkAction } from "@/lib/redux";
import { updateForm } from "@/lib/redux/slices/formSlice/formSlice";
import { loadForm } from "./localStorage";
/* eslint-disable import/prefer-default-export */

export const updateFormFromStorage = (): ReduxThunkAction => (dispatch) => {
  const storedForm: {
    title: string;
    content: string;
    tags: [string, string][] | undefined;
    publish: false;
    tagString: "";
  } = loadForm();
  dispatch(updateForm(storedForm));
};
