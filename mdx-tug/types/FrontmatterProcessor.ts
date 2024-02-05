import { MDXServiceBaseOptions } from './MDXServiceBaseOptions';

import { FieldDefinitions } from './FieldDefinitions';
import { MDXServiceOptions } from './MDXServiceOptions';

export type FrontmatterProcessor<
  TFrontmatter extends Record<keyof TFields, string>,
  TOptions extends
    MDXServiceBaseOptions<TFrontmatter> = MDXServiceBaseOptions<TFrontmatter>,
  TFields extends FieldDefinitions<TFrontmatter, TOptions> = FieldDefinitions<
    TFrontmatter,
    TOptions
  >,
> = (
  options: MDXServiceOptions<TFrontmatter, TOptions, TFields> & {
    frontmatter: Partial<TFrontmatter>;
    file: string;
    path: string;
  }
) => boolean;
