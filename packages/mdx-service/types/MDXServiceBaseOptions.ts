import { ConfigOptions } from './ConfigOptions';
import { MDXBundlerOptions } from './MDXBundlerOptions';
import { DocHeading } from './DocHeading';
import * as unified from 'unified';
import { SortProvider } from './SortProvider';
import { UnknownFrontMatter } from './UnknownFrontMatter';
import { MDXServiceReturnType } from './MDXServiceReturnType';

export type MDXServiceBaseOptions<T extends UnknownFrontMatter> = Pick<
  ConfigOptions,
  'basePath'
> & {
  pattern: string;
  cwd: string;
  mdxBundlerOptions?: MDXBundlerOptions;
  sortProvider?: SortProvider<MDXServiceReturnType<T>>;
  tocPlugin?: (headings: DocHeading[]) => unified.Plugin;
};
