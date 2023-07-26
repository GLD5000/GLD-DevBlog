/* Core */
import {
  configureStore,
  type ThunkAction,
  type Action,
} from "@reduxjs/toolkit";
import {
  useSelector as useReduxSelector,
  useDispatch as useReduxDispatch,
  type TypedUseSelectorHook,
} from "react-redux";

/* Instruments */
import { reducer } from "./rootReducer";
import { middleware } from "./middleware";

export const reduxStore = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

/* Types */
export type ReduxStore = typeof reduxStore;
export type ReduxState = ReturnType<typeof reduxStore.getState>;
export const useSelector: TypedUseSelectorHook<ReduxState> = useReduxSelector;
export type ReduxDispatch = typeof reduxStore.dispatch;
export const useDispatch = () => useReduxDispatch<ReduxDispatch>();
export type ReduxThunkAction<ReturnType = void> = ThunkAction<
  ReturnType,
  ReduxState,
  unknown,
  Action
>;
