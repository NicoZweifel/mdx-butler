import { MDXServiceBaseOptions } from './MDXServiceBaseOptions';

import { FieldDefinitions } from './FieldDefinitions';
import { MDXServiceOptions } from './MDXServiceOptions';

export type FrontmatterProcessor<
  TFrontmatter extends Partial<Record<keyof TFields, string>>,
  TOptions extends
    MDXServiceBaseOptions<TFrontmatter> = MDXServiceBaseOptions<TFrontmatter>,
  TFields extends FieldDefinitions<TFrontmatter, TOptions> = FieldDefinitions<
    TFrontmatter,
    TOptions
  >,
> = (
  options: MDXServiceOptions<TFrontmatter, TOptions, TFields> &
    FrontMatterOptions<Record<keyof TFrontmatter, string>>
) => boolean;

export type FrontMatterOptions<
  TFrontmatter extends Partial<Record<string, string>>,
> = {
  /**
   * The parsed contents of the MDX frontmatter section. May contain only a subset
   * of the fields defined in the complete frontmatter type.
   */
  frontmatter: TFrontmatter;

  /**
   *  The full path of the MDX file.
   */
  file: string;

  /**
   * The relative path of the MDX file (from the configured `cwd`).
   */
  path: string;
};
