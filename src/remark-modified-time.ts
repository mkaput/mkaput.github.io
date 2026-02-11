import { execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Root } from "mdast";
import type { VFile } from "vfile";
import { isSameUtcDate, parseDateInput, toUtcDateOnly } from "./lib/date";

type AstroFrontmatter = {
  publishedAt?: string | Date;
  modifiedAt?: Date;
};

type AstroData = {
  astro?: {
    frontmatter?: AstroFrontmatter;
  };
};

const isFileUrl = (value: unknown): value is string =>
  typeof value === "string" && value.startsWith("file:");

const resolveFilePath = (vfile: VFile): string | null => {
  const filePath = vfile.path;
  if (filePath) {
    return isFileUrl(filePath) ? fileURLToPath(filePath) : filePath;
  }

  const historyPath = vfile.history?.[0];
  if (typeof historyPath === "string") {
    return isFileUrl(historyPath) ? fileURLToPath(historyPath) : historyPath;
  }

  return null;
};

const readGitModifiedTime = (filePath: string): Date | null => {
  const relativePath = path.relative(process.cwd(), filePath);

  try {
    const stdout = execSync(`git log -1 --format=%cI -- \"${relativePath}\"`, {
      stdio: ["ignore", "pipe", "ignore"],
    });
    const isoString = stdout.toString().trim();
    if (!isoString) {
      return null;
    }
    const date = new Date(isoString);
    return Number.isNaN(date.getTime()) ? null : date;
  } catch {
    return null;
  }
};

const remarkModifiedTime = () => (_tree: Root, vfile: VFile) => {
  const filePath = resolveFilePath(vfile);
  if (!filePath) {
    return;
  }

  const modifiedAtRaw = readGitModifiedTime(filePath);
  const modifiedAt = modifiedAtRaw ? toUtcDateOnly(modifiedAtRaw) : null;
  if (!modifiedAt) {
    return;
  }

  const data = vfile.data as AstroData;
  data.astro ??= {};
  data.astro.frontmatter ??= {};

  if (data.astro.frontmatter.modifiedAt == null) {
    const publishedAtInput = parseDateInput(data.astro.frontmatter.publishedAt);
    const publishedAt = toUtcDateOnly(publishedAtInput);

    if (publishedAt && isSameUtcDate(publishedAt, modifiedAt)) {
      return;
    }

    data.astro.frontmatter.modifiedAt = modifiedAt;
  }
};

export default remarkModifiedTime;
