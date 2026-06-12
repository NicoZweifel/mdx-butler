import { UnknownFrontMatter } from './UnknownFrontMatter.js';
import { bundleMDX } from 'mdx-bundler';
import { DocHeading } from './DocHeading.js';

export type MDXBundlerServiceReturnType<T extends UnknownFrontMatter> = Omit<
  Awaited<ReturnType<typeof bundleMDX>>,
  'frontmatter'
> & {
  frontmatter: T;
  file: string;
  path: string;
  headings: DocHeading[];
};
