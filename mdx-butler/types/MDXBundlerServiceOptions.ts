import { MDXBundlerServiceBaseOptions } from './MDXBundlerServiceBaseOptions.js';
import { FrontmatterProcessor } from './FrontmatterProcessor.js';

import { FieldDefinitions } from './FieldDefinitions.js';
import { FileProvider } from './FileProvider.js';

export type MDXBundlerServiceOptions<
  TFrontmatter extends Partial<Record<keyof TFields, string | boolean>>,
  TOptions extends MDXBundlerServiceBaseOptions<TFrontmatter> =
    MDXBundlerServiceBaseOptions<TFrontmatter>,
  TFields extends FieldDefinitions<TFrontmatter, TOptions> = FieldDefinitions<
    TFrontmatter,
    TOptions
  >,
> = TOptions & {
  /**
   * Defines custom fields in the MDX frontmatter to extract and make available during processing.
   */
  fields?: TFields;

  /**
   * A function to modify or transform frontmatter data before the documents are bundled.
   * @param options Underlying configuration options for the MDX service.
   * @returns Transformed or processed frontmatter.
   */
  frontmatterProcessor?: FrontmatterProcessor<TFrontmatter, TOptions, TFields>;
  /**
   * An optional asynchronous function to provide MDX source files.
   * @returns A Promise resolving to an array of {@link SourceFileType} objects.
   */
  fileProvider?: FileProvider<TFrontmatter, TOptions, TFields>;
};
