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
  fields?: TFields;
  frontmatterProcessor?: FrontmatterProcessor<TFrontmatter, TOptions, TFields>;
  fileProvider?: FileProvider<TFrontmatter, TOptions, TFields>;
};
