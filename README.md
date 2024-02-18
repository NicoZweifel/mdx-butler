# mdx-butler

Manage and serve typed [`MDX`](https://mdxjs.com/) documents in applications, that use Server _Side Rendering_ or _Static Site Generation_.

[![Docs](https://img.shields.io/badge/docs-online-green)](https://mdx-butler.com/)
[![npm](https://img.shields.io/badge/npm-v0.4.4-red)](https://www.npmjs.com/package/mdx-butler)
[![test](https://github.com/NicoZweifel/mdx-butler/actions/workflows/test.yml/badge.svg)](https://github.com/NicoZweifel/mdx-butler/actions/workflows/test.yml)
[![test-docs](https://github.com/NicoZweifel/mdx-butler/actions/workflows/test-docs.yml/badge.svg)](https://github.com/NicoZweifel/mdx-butler/actions/workflows/test-docs.yml)

![logo](/docs/public/butler.png)

## Why use a Service?

Most web frameworks and build tools offer plugins to handle [`MDX`](https://mdxjs.com/) documents.
While convenient, these plugins can in some cases limit control, force specific dependencies,
create performance bottlenecks and complicate the migration of your documentation to a Microservice, CMS or database in the future.

**mdx-butler** (built upon [mdx-bundler](https://github.com/kentcdodds/mdx-bundler)) aims to offer a performant,
flexible and framework-agnostic abstraction to manage your [`MDX`](https://mdxjs.com/) documents.
This maximizes flexibility and future-proofs your work for easy updates, migrations, and changes to your content source.

- **Enhanced content organization** with **typed Frontmatter** and **MDX syntax** support for titles and descriptions within frontmatter.
- **Framework independent:** Work smoothly without worrying about framework-specific plugins and dependencies.
- **Adaptability:** Switch content sources (Backend/Service, CMS, database, etc.) without major rewrites.
- **Performance:** Leverages [mdx-bundler](https://github.com/kentcdodds/mdx-bundler) and [esbuild](https://esbuild.github.io/) for efficient compilation and bundling of [`MDX`](https://mdxjs.com/) documents with imported dependencies.
- **Customization:** Easily inject globals, components, and application logic for rich, interactive documentation.

## Setup

### Installation

```
pnpm i mdx-butler mdx-bundler esbuild
```

### Framework Guides

- [Next.js](https://mdx-butler.com/configuration/next)
- [Remix](https://mdx-butler.com/configuration/remix)

### Bundling

The easiest way to get all bundled documents within a folder is to call the `docs` function.

> [!Warning]
> Exports like `docs`, `MDXService` or any others from the `mdx-butler` root entrypoint
> should only be imported in a server or build context.

Options and dependencies can be passed to `docs` or `MDXService.create`.

> [!Note]
> If you require more control, consider [injecting
> dependencies](https://mdx-butler.com/customization/DI) and using `MDXService` directly.
>
> For more information check out the [Configuration](https://mdx-butler.com/configuration) section!

```ts {1,7-10} showLineNumbers
import { docs } from "mdx-butler";

// ...

return docs({
  fields: {
    title: {
      required: true,
    },
  },
});
```

> [!Tip]
> Automatically generates a `FrontmatterProcessor`, according to the given
> `fields`.

#### Types

To guarantee a correct type inference, specifying the `Frontmatter` type is recommended.

```ts {1-3,7} showLineNumbers
type Frontmatter = {
  title: string;
};

// ...

return bundle<Frontmatter>({
  fields: {
    title: {
      required: true,
    },
  },
});
```

> [!Note]
> The given Fields cannot be undefined after the `Frontmatter` has been processed.
>
> If a required field is `undefined`, an `Error` will be thrown.

### `Component`

```tsx {1,12} showLineNumbers
import { Component } from "mdx-butler/client";

// ...

const doc = docs.filter((x) => slug === x.path)[0];

if (!doc) return <div>not found</div>;

return (
  <div>
    <h1>{doc.frontmatter.title}</h1>
    <Component doc={doc} />
  </div>
);
```

> [!Tip]
> Start editing `MDX` documents inside `/docs` or the configured [working
> directory](https://mdx-butler.com/configuration)

## Security Notice

> [!CAUTION]
> MDX is javascript. If not carefully done, evaluating user content can expose to XSS attacks.
>
> Always be careful if you are not evaluating your own content.

## Mentions

- [`vike`](https://vike.dev/) for providing a customizable, versatile web framework.
- [`mdx-bundler`](https://github.com/kentcdodds/mdx-bundler) for providing a blazingly fast [`esbuild`](https://esbuild.github.io/mdx-bundler) based bundler for [`MDX`](https://mdxjs.com/) files.
- [`Contentlayer`](https://contentlayer.dev/) for providing inspiration around the [`MDX`](https://mdxjs.com/) Developer Experience.
