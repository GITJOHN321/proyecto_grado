import { z } from "zod";

export const publicationSchema = z.object({
    title: z.string({
      required_error: "title is required",
    }),
    content: z.string({
      required_error: "content is required",
    }),
    public_: z.boolean({
        required_error: "public is required",
      }),
  });