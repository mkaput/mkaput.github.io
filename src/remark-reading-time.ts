import { toString } from "mdast-util-to-string";
import readingTime from "reading-time";
import type { Root } from "mdast";
import type { VFile } from "vfile";

type AstroFrontmatter = {
  minutesRead?: number;
};

type AstroData = {
  astro?: {
    frontmatter?: AstroFrontmatter;
  };
};

const remarkReadingTime = () => (tree: Root, vfile: VFile) => {
  const text = toString(tree);
  const stats = readingTime(text);
  const minutesRead = Math.max(1, Math.ceil(stats.minutes));

  const data = vfile.data as AstroData;
  data.astro ??= {};
  data.astro.frontmatter ??= {};

  if (data.astro.frontmatter.minutesRead == null) {
    data.astro.frontmatter.minutesRead = minutesRead;
  }
};

export default remarkReadingTime;
