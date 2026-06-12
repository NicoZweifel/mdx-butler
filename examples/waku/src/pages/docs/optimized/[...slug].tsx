import { docs, createFrontmatterProcessor } from "mdx-butler";
import { Component } from "mdx-butler/client";
import type { PageProps } from "waku/router";

type Frontmatter = {
  title: string;
  description: string;
};

const getDocs = (path?: string) =>
  docs<Frontmatter>({
    cwd: "docs",
    frontmatterProcessor: (x) => {
      const processor = createFrontmatterProcessor<Frontmatter>({
        title: { required: true },
        description: {},
      });

      const isValid = processor(x);
      if (path === undefined) return isValid;

      return isValid && path === x.path;
    },
  });

export default async function DocsPage({
  slug,
}: PageProps<"/docs/optimized/[...slug]">) {
  const path = slug.join("/");
  const allDocs = await getDocs(path);
  const doc = allDocs.find((x) => x.path === path);

  if (!doc) return <div>not found</div>;

  return (
    <div>
      <h1>{doc.frontmatter.title}</h1>
      <Component doc={doc} />
    </div>
  );
}

export const getConfig = async () => {
  const allDocs = await getDocs();

  const staticPaths = allDocs.map((doc) => doc.path.split("/"));

  if (staticPaths.length === 0) {
    console.warn(
      "⚠️ mdx-butler found 0 docs. Check your 'docs' folder and title fields.",
    );
  }

  return {
    render: "static",
    staticPaths,
  } as const;
};
