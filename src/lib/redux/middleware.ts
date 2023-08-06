/* Core */
import { createLogger } from "redux-logger";

/* eslint-disable import/prefer-default-export */

const middleware = [
  createLogger({
    duration: true,
    timestamp: false,
    collapsed: true,
    colors: {
      title: () => "#139BFE",
      prevState: () => "#1C5FAF",
      action: () => "#a49945",
      nextState: () => "#A47104",
      error: () => "#ff0005",
    },
    predicate: () =>
      typeof window !== "undefined" && process.env.NODE_ENV === "development",
  }),
];

export { middleware };
