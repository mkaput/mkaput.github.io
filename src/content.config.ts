import { defineCollection, z } from "astro:content";
import { isSameUtcDate, isUtcDateOnly, parseDateInput } from "./lib/date";
import { serviceIds } from "./lib/services";

const dateOnly = z.preprocess(
  (value) => {
    return parseDateInput(value) ?? value;
  },
  z.date().refine(isUtcDateOnly, "Use a date without time (YYYY-MM-DD)."),
);

const external = defineCollection({
  type: "data",
  schema: z.array(
    z.object({
      service: z.enum(serviceIds),
      title: z.string(),
      description: z.string(),
      url: z.string().url(),
      publishedAt: z.coerce.date(),
    }),
  ),
});

const posts = defineCollection({
  type: "content",
  schema: z
    .object({
      title: z.string(),
      description: z.string(),
      publishedAt: dateOnly,
      modifiedAt: dateOnly.optional(),
      draft: z.boolean().default(false),
    })
    .superRefine((data, ctx) => {
      if (!data.modifiedAt) {
        return;
      }

      if (isSameUtcDate(data.publishedAt, data.modifiedAt)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "modifiedAt must be omitted when it matches publishedAt.",
          path: ["modifiedAt"],
        });
      }
    }),
});

export const collections = { external, posts };
