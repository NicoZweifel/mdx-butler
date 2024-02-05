import { bundle, createFrontmatterProcessor } from "mdx-tug";
import { cache } from "react";
import { Component } from "mdx-tug/client";

type Frontmatter = {
  title: string;
  description: string;
};

const getDocs = cache((path?: string) =>
  bundle<Frontmatter>({
    cwd: "/docs",
    frontmatterProcessor: (x) => {
      const processor = createFrontmatterProcessor<Frontmatter>({
        title: {
          required: true,
        },
        description: {},
      });

      return (processor(x) && path == undefined) || path === x.path;
    },
  }),
);


export async function generateStaticParams() {
  const docs = await getDocs();
  return docs.map((x) => ({
    slug: x.path.split('/'),
  }));
}

export async function generateMetadata({
                                         params: { slug },
                                       }: {
  params: { slug: string[] };
}) {
  const path = slug.join('/')
  const docs = await getDocs(path);

  const doc = docs.find((x) => path === x.path);

  return {
    title: doc?.frontmatter.title
  }
}

export default async function Docs({
  params: { slug },
}: {
  params: { slug: string[] };
}) {
  const path = slug.join('/')
  const docs = await getDocs(path);

  const doc = docs.find((x) => path === x.path);

  if (!doc) return <div>not found</div>;

  return (
    <div style={{
      display:'flex',
      gap:'1rem',
      flexDirection:"row"
    }}>
      <div>
      <h1>optimized: {doc.frontmatter.title}</h1>
        <Component doc={doc} />
      </div>
      <div
        style={{
          display:'flex',
          gap:'1rem',
          flexDirection:"column"
        }}
      >
        <h2>On this page</h2>
        {doc.headings.map(x=> <a key={x.title} href={`#${x.title}`}>{x.title}</a>)}
      </div>
    </div>
  );
}
