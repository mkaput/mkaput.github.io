import { getCollection } from "astro:content";
import type { Service } from "./services";

export type UnifiedPost =
  | {
      title: string;
      description: string;
      publishedAt: Date;
      url: string;
      service: Service;
      isExternal: true;
    }
  | {
      title: string;
      description: string;
      publishedAt: Date;
      url: string;
      isExternal: false;
    };

export const getUnifiedPosts = async (): Promise<UnifiedPost[]> => {
  const [externalEntries, internalEntries] = await Promise.all([
    getCollection("external"),
    getCollection("posts", ({ data }) => data.draft === false),
  ]);

  const externalPosts = externalEntries.flatMap((entry) =>
    entry.data.map<UnifiedPost>((post) => ({
      title: post.title,
      description: post.description,
      publishedAt: post.publishedAt,
      url: post.url,
      service: post.service,
      isExternal: true,
    })),
  );

  const internalPosts = internalEntries.map<UnifiedPost>((entry) => ({
    title: entry.data.title,
    description: entry.data.description,
    publishedAt: entry.data.publishedAt,
    url: `/posts/${entry.slug}/`,
    isExternal: false,
  }));

  return [...internalPosts, ...externalPosts].sort(
    (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime(),
  );
};
