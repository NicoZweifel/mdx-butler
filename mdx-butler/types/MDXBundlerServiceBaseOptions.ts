import { MDXBundlerOptions } from './MDXBundlerOptions';
import { DocHeading } from './DocHeading';
import { Plugin } from 'unified';
import { SortProvider } from './SortProvider';
import { UnknownFrontMatter } from './UnknownFrontMatter';
import { MDXBundlerServiceReturnType } from './MDXBundlerServiceReturnType';

export type MDXBundlerServiceBaseOptions<T extends UnknownFrontMatter> = {
  /**
   *  The working directory used as the base for resolving file paths and imports.
   */
  cwd?: string;

  /**
   * An optional glob pattern to filter MDX files for processing.
   */
  pattern?: string;

  /**
   * Options to customize the underlying MDX-bundler instance.
   * See MDXBundlerOptions for supported configurations.
   */
  mdxBundlerOptions?: MDXBundlerOptions;

  /**
   * An optional sorting function for organizing the returned MDX documents.
   */
  sortProvider?: SortProvider<MDXBundlerServiceReturnType<T>>;

  /**
   * A function to generate a table of contents plugin.
   * The plugin should fill the array with the headings of the document.
   * @param headings An array of heading objects
   * @returns A plugin object compatible with MDX bundler.
   */
  tocPlugin?: (headings: DocHeading[]) => Plugin;
};
