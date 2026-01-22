import { defineCollection, z } from "astro:content";
import { serviceIds } from "./lib/services";

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

export const collections = { external };
