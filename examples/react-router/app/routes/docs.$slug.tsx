import { type LoaderFunctionArgs, type MetaFunction } from "react-router";
import { useLoaderData } from "react-router"; //
import { getMDXComponent } from "mdx-butler/client";
import { docs } from "../mdx-butler.server.js";

type Frontmatter = {
  title: string;
  description?: string;
};

export async function loader({ params: { slug } }: LoaderFunctionArgs) {
  const allDocs = await docs<Frontmatter>({
    cwd: "./docs",
    fields: { title: { required: true } },
  });

  const doc = allDocs.find((x) => slug === x.path);
  if (!doc) throw new Response("Not Found", { status: 404 });

  return doc;
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    { title: data?.frontmatter.title ?? "Docs" },
    { name: "description", content: data?.frontmatter.description },
  ];
};

export default function DocRoute() {
  const doc = useLoaderData<typeof loader>();
  const Component = getMDXComponent(doc.code);

  return (
    <div style={{ display: "flex", gap: "2rem" }}>
      <article>
        <h1>{doc.frontmatter.title}</h1>
        <Component />
      </article>
      <aside>
        <h2>On this page</h2>
        {doc.headings.map((x) => (
          <a key={x.title} href={`#${x.title}`}>
            {x.title}
          </a>
        ))}
      </aside>
    </div>
  );
}
