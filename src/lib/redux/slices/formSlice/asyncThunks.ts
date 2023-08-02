import { createAppAsyncThunk } from "@/lib/redux/createAppAsyncThunk";
import { saveFields } from "./localStorage";

/* eslint-disable import/prefer-default-export */

export const updateFromBlogPost = createAppAsyncThunk(
  "form/fetchBlogById",
  async (id: string) => {
    const response = await fetch(`/api/getPostById/${id}`, {
      method: "GET",
    });
    const { data } = await response.json();
    // validate post fields / set to defaults
    const returnObject = {
      id,
      title: data.title || "",
      content: data.content || "",
      tags: data.tags || undefined,
      tagString: "",
      publish: data.publish || false,
    };
    saveFields(returnObject);
    // The value we return becomes the `fulfilled` action payload
    return returnObject;
  }
);
