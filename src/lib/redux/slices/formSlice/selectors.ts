/* Instruments */
import type { ReduxState } from "@/lib/redux";
import { stringifyForm } from "./localStorage";

/* eslint-disable import/prefer-default-export */

export const selectFormJson = (state: ReduxState) => stringifyForm(state.form);
export const selectTitle = (state: ReduxState) => state.form.title;
export const selectContent = (state: ReduxState) => state.form.content;
export const selectPublish = (state: ReduxState) => state.form.publish;
export const selectTagString = (state: ReduxState) => state.form.tagString;
export const selectTags = (state: ReduxState) => state.form.tags;
