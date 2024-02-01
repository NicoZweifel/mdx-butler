import { json, MetaFunction } from "@remix-run/node";
import { bundle } from "../mdx-tug.server";
import { useLoaderData } from "@remix-run/react";
import { getMDXComponent } from "mdx-tug/client";

type Frontmatter = {
  title: string;
};

export async  function loader() {
  return  json((await bundle<Frontmatter>({
    cwd:'/docs',
  }))[0]);
}

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const doc = useLoaderData<typeof loader>();

  if (!doc) return <div>not found</div>;

 const Component = getMDXComponent(doc.code)

  return (
    <div style={{
      display:'flex',
      gap:'1rem',
      flexDirection:"row"
    }}>
      <div>
        <h1>{doc.frontmatter.title}</h1>
        <Component />
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
