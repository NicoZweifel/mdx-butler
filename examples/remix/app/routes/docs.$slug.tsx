import { json, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { bundle } from "mdx-butler";
import { useLoaderData } from "@remix-run/react";
import { getMDXComponent } from "mdx-butler/client";

type Frontmatter = {
  title: string;
  description: string;
};

export async  function loader({params:{slug}}:LoaderFunctionArgs) {
  return json((await bundle<Frontmatter>({
    cwd:'/docs',
    fields:{
      title:{
        required:true,
      },
      description:{}
    }
  })).find((x) => slug === x.path));
}

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [
    { title: data?.frontmatter.title },
    { name: "description", content: data?.frontmatter.description },
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
        <h3>{doc.frontmatter.title}</h3>
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
