import { MDXServiceBaseOptions } from './MDXServiceBaseOptions';
import { FrontmatterProcessor } from './FrontmatterProcessor';

import { FieldDefinitions } from './FieldDefinitions';

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
};
