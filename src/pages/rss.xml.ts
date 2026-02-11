import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getUnifiedPosts } from "../lib/posts";

export async function GET(context: APIContext) {
  const posts = await getUnifiedPosts();
  const items = posts.map((post) => ({
    title: post.title,
    description: post.description,
    pubDate: post.publishedAt,
    link: post.url,
  }));

  const site = context.site;
  if (!site) {
    throw new Error("site is missing in config");
  }

  return rss({
    title: "Marek Kaput",
    description: "Marek Kaput's writings",
    site,
    items,
  });
}
