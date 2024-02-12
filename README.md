# mdx-butler

[![Docs](https://img.shields.io/badge/docs-online-green)](https://mdx-butler.com/)

A service for bundling and serving typed [`MDX`](https://mdxjs.com/) documents in applications that use Server _Side Rendering_ or _Static Site Generation_.

## Notes

- Bundle mdx files in a `docs` folder, with [any file pattern](https://mdx-butler.com/configuration#options) or with a custom [`FileProvider`](https://mdx-butler.com/customization/DI/fileProvider).
- Support for typed [`Frontmatter`](https://mdx-butler.com/customization/DI/frontmatter), [`MDX`](https://mdxjs.com/) syntax in descriptions, table of contents, headings and more.
- Full support for custom components and snippets. Import anything in your documents.
- Uses [`mdx-bundler`](https://github.com/kentcdodds/mdx-bundler) and [`esbuild`](https://esbuild.github.io/) for blazingly fast bundling.

## Setup

### Installation

```
pnpm i mdx-butler mdx-bundler esbuild
```

### Framework Guides

- [Next.js](https://mdx-butler.com/configuration/next)
- [Remix](https://mdx-butler.com/configuration/remix)

### Bundling

The easiest way to get all bundled documents within a folder is to call the `bundle` function.

> [!Warning]
> Exports like `bundle`, `MDXService` or any others from the `mdx-butler` root entrypoint
> should only be imported in a server or build context.

Options and dependencies can be passed to `bundle` or `MDXService.create`.

> [!Note]
> If you require more control, consider [injecting
> dependencies](https://mdx-butler.com/customization/DI) and using `MDXService` directly.
>
> For more information check out the [Configuration](https://mdx-butler.com/configuration) section!

```ts {1,7-10} showLineNumbers
import { bundle } from "mdx-butler";

// ...

return bundle({
  cwd: "/docs",
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
  cwd: "/docs",
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
