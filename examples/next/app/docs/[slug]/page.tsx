import { bundle } from "mdx-tug";
import { cache } from "react";
import { Component } from "mdx-tug/client";


const getDocs = cache(() =>
  bundle({
    cwd: "/docs",
   fields:{
      title:{
        required:true
      }
   }
  }),
);

export async function generateStaticParams() {
  const docs = await getDocs();

  return docs.map((x) => ({
    slug: x.path,
  }));
}

export default async function Docs({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const docs = await getDocs();

  const doc = docs.filter((x) => slug === x.path)[0];

  if (!doc) return <div>not found</div>;

  return (
    <div style={{
      display:'flex',
      gap:'1rem',
      flexDirection:"row"
    }}>
      <div>
        <h1>{doc.frontmatter.title}</h1>
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
