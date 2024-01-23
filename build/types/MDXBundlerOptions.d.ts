import { bundleMDX } from "mdx-bundler";
import { MDXOptions } from "./MDXOptions";
export type MDXBundlerOptions = Omit<Parameters<typeof bundleMDX>[0], 'file' | 'cwd' | 'source' | 'mdxOptions'> & {
    mdxOptions?: MDXOptions;
};
