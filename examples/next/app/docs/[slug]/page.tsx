import { bundle } from "mdx-service";
import { getMDXComponent } from "mdx-bundler/client";
import { cache } from "react";

type Frontmatter = {
  title: string;
};

const getDocs = cache(() =>
  bundle<Frontmatter>({
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

  const Component = getMDXComponent(doc.code);

  return (
    <div>
      <h1>{doc.frontmatter.title}</h1>
      <Component />
    </div>
  );
}
