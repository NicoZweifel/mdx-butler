import { UnknownFrontMatter } from './UnknownFrontMatter';
import { bundleMDX } from 'mdx-bundler';
import { DocHeading } from './DocHeading';

export type MDXServiceReturnType<T extends UnknownFrontMatter> = Omit<
  Awaited<ReturnType<typeof bundleMDX>>,
  'frontmatter'
> & {
  frontmatter: T;
  file: string;
  headings: DocHeading[];
};
