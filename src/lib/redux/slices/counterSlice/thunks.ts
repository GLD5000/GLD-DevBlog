import { createAppAsyncThunk } from "@/lib/redux/createAppAsyncThunk";
import { fetchIdentityCount } from "./fetchIdentityCount";

/* eslint-disable import/prefer-default-export */

export const incrementAsync = createAppAsyncThunk(
  "counter/fetchIdentityCount",
  async (amount: number) => {
    const response = await fetchIdentityCount(amount);

    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
