import { ConfigOptions } from './ConfigOptions';
import { MDXBundlerOptions } from './MDXBundlerOptions';
import { bundleMDX } from 'mdx-bundler';
import { DocHeading } from './DocHeading';
import * as unified from 'unified';
import { FrontmatterProcessor } from './FrontmatterProcessor';
import { SortProvider } from './SortProvider';

export type DocServiceOptions = Pick<ConfigOptions, 'baseRoute'> & {
  pattern: string;
  cwd: string;
  toc: boolean;
  mdxBundlerOptions: MDXBundlerOptions;
  frontmatterProcessor?: FrontmatterProcessor;
  sortProvider?: SortProvider<Awaited<ReturnType<typeof bundleMDX>>>;
  tocPlugin?: (headings: DocHeading[]) => unified.Plugin;
  route?: string;
};
