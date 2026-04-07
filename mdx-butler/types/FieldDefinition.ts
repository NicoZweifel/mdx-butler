import { UnknownFrontMatter } from './UnknownFrontMatter.js';
import { MDXBundlerServiceBaseOptions } from './MDXBundlerServiceBaseOptions.js';
import { FrontMatterOptions } from './FrontmatterProcessor.js';
import { FieldDefinitions } from './FieldDefinitions.js';

export type FieldDefinition<
  TFrontmatter extends Record<
    keyof FieldDefinitions,
    string | boolean | undefined
  > = UnknownFrontMatter,
  TOptions extends MDXBundlerServiceBaseOptions<TFrontmatter> =
    MDXBundlerServiceBaseOptions<TFrontmatter>,
> = {
  /**
   *  Indicates whether a specific frontmatter field is mandatory.
   *  Defaults to false (optional).
   */
  required?: boolean;

  /**
   * A function to dynamically resolve the value of a frontmatter field.
   * Useful for calculated values or values extracted from external sources.
   *
   * @param options An object containing:
   *   * options:  The underlying MDXBundlerServiceOptions configuration.
   *   * frontmatter: The potentially incomplete frontmatter, allowing default or calculated values.
   *   * file: The full path of the MDX file.
   *   * path: The relative path of the MDX file (from the configured `cwd`).
   * @returns The resolved value to assign to the frontmatter field.
   */
  resolve?: (
    options: TOptions &
      FrontMatterOptions<Record<keyof TFrontmatter, string | undefined>>
  ) => string;
};
