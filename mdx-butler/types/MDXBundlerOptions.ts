import { bundleMDX } from 'mdx-bundler';

import { MDXOptions } from './MDXOptions.js';

export type MDXBundlerOptions = Omit<
  Parameters<typeof bundleMDX>[0],
  'file' | 'cwd' | 'source' | 'mdxOptions'
> & { mdxOptions?: MDXOptions };
