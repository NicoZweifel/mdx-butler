import { MDXBundlerServiceBaseOptions } from './MDXBundlerServiceBaseOptions.js';

import { FieldDefinitions } from './FieldDefinitions.js';
import { MDXBundlerServiceOptions } from './MDXBundlerServiceOptions.js';

export type FrontmatterProcessor<
  TFrontmatter extends Partial<Record<keyof TFields, string | boolean>>,
  TOptions extends MDXBundlerServiceBaseOptions<TFrontmatter> =
    MDXBundlerServiceBaseOptions<TFrontmatter>,
  TFields extends FieldDefinitions<TFrontmatter, TOptions> = FieldDefinitions<
    TFrontmatter,
    TOptions
  >,
> = (
  options: MDXBundlerServiceOptions<TFrontmatter, TOptions, TFields> &
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
