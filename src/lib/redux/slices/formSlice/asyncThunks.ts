import { getBlog } from "@/lib/prisma/prismaFetch";
import { createAppAsyncThunk } from "@/lib/redux/createAppAsyncThunk";
import { saveFields } from "./localStorage";

/* eslint-disable import/prefer-default-export */

export const updateFromBlogPost = createAppAsyncThunk(
  "form/fetchBlogById",
  async (id: string) => {
    const response = await getBlog(id);

    // validate post fields / set to defaults
    const returnObject = {
      title: response.post?.title || "",
      content: response.post?.content || "",
      tags: response.tagNames || undefined,
      tagString: "",
      publish: response.post?.published || false,
    };
    saveFields(returnObject);
    // The value we return becomes the `fulfilled` action payload
    return returnObject;
  }
);
