import { MDXServiceBaseOptions } from './MDXServiceBaseOptions';
import { FrontmatterProcessor } from './FrontmatterProcessor';

import { FieldDefinitions } from './FieldDefinitions';
import { FileProvider } from './FileProvider';

export type MDXServiceOptions<
  TFrontmatter extends Record<keyof TFields, string>,
  TOptions extends
    MDXServiceBaseOptions<TFrontmatter> = MDXServiceBaseOptions<TFrontmatter>,
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
