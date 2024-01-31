import { MDXBundlerOptions } from './MDXBundlerOptions';
import { DocHeading } from './DocHeading';
import { Plugin } from 'unified';
import { SortProvider } from './SortProvider';
import { UnknownFrontMatter } from './UnknownFrontMatter';
import { MDXServiceReturnType } from './MDXServiceReturnType';
import { SourceFileType } from './SourceFileType';

export type MDXServiceBaseOptions<T extends UnknownFrontMatter> = {
  cwd: string;
  mdxBundlerOptions?: MDXBundlerOptions;
  sortProvider?: SortProvider<MDXServiceReturnType<T>>;
  tocPlugin?: (headings: DocHeading[]) => Plugin;
  filePattern?: string;
  fileProvider?: () => Promise<SourceFileType[]>;
};
