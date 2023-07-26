"use client";

/* Core */
import { Provider } from "react-redux";

/* Instruments */
import { reduxStore } from "@/lib/redux";
import NextAuthProvider from "@/app/AuthProvider";

/* eslint-disable import/prefer-default-export */

export function Providers(props: React.PropsWithChildren) {
  const { children } = props;
  return (
    <NextAuthProvider>
      <Provider store={reduxStore}>{children}</Provider>
    </NextAuthProvider>
  );
}
