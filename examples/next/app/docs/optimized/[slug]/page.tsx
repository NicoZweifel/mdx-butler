import { bundle, createFrontmatterProcessor } from "mdx-tug";
import { cache } from "react";
import { Component } from "mdx-tug/client";

type Frontmatter = {
  title: string;
};

const getDocs = cache( (slug?:string)=> bundle<Frontmatter>({
  cwd:'/docs',
  frontmatterProcessor:(x)=>{
    const processor = createFrontmatterProcessor({
      title:{
        required:true,
      }
    })

    return  processor(x) && slug == undefined || slug === x.path
  },
}))


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
  const docs = await getDocs(slug);

  const doc = docs.find((x) => slug === x.path);

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
