import { bundleMDX } from "mdx-bundler";
export type MDXOptions = Parameters<NonNullable<Parameters<typeof bundleMDX>[0]['mdxOptions']>>[0];
