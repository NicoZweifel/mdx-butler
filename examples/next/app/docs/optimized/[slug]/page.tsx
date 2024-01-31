import { bundle, createFrontmatterProcessor } from "mdx-service";
import { component } from "mdx-service/client";
import { cache } from "react";

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
  const docs = await getDocs();

  const doc = docs.filter((x) => slug === x.path)[0];

  if (!doc) return <div>not found</div>;

  const Component = component(doc);

  return (
    <div>
      <h1>{doc.frontmatter.title}</h1>
      <Component />
    </div>
  );
}
