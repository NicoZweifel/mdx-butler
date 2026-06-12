import { docs } from "mdx-butler";
import { Component } from "mdx-butler/client";
import type { PageProps } from "waku/router";

const getDocs = async () => {
  return await docs({
    cwd: "docs/",
    fields: {
      title: { required: true },
    },
  });
};

export default async function DocsPage({ slug }: PageProps<"/docs/[...slug]">) {
  const allDocs = await getDocs();
  const path = slug.join("/");

  const doc = allDocs.find((x) => x.path === path);

  if (!doc) {
    return <div>Document not found</div>;
  }

  return (
    <div style={{ display: "flex", gap: "1rem", flexDirection: "row" }}>
      <div>
        <h1>{doc.frontmatter.title}</h1>
        <Component doc={doc} />
      </div>

      <div style={{ display: "flex", gap: "1rem", flexDirection: "column" }}>
        <h2>On this page</h2>
        {doc.headings.map((x) => (
          <a key={x.title} href={`#${x.title}`}>
            {x.title}
          </a>
        ))}
      </div>
    </div>
  );
}

export const getConfig = async () => {
  const allDocs = await docs({
    cwd: "docs/",
    fields: {
      title: { required: true },
    },
  });

  const staticPaths = allDocs.map((doc) => doc.path.split("/"));

  return {
    render: "static",
    staticPaths,
  } as const;
};
