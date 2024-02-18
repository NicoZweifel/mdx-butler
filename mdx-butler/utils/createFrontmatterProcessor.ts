import {
  FrontmatterProcessor,
  MDXBundlerServiceBaseOptions,
  FieldDefinitions,
  UnknownFrontMatter,
} from '../types';

export const createFrontmatterProcessor =
  <
    TFrontmatter extends UnknownFrontMatter,
    TOptions extends
      MDXBundlerServiceBaseOptions<TFrontmatter> = MDXBundlerServiceBaseOptions<TFrontmatter>,
    TFields extends FieldDefinitions<TFrontmatter, TOptions> = FieldDefinitions<
      TFrontmatter,
      TOptions
    >,
  >(
    fields: TFields
  ): FrontmatterProcessor<TFrontmatter, TOptions, TFields> =>
  (options) => {
    for (const key in fields) {
      const isRequired = fields[key]?.required;
      const isDefined = options.frontmatter[key] != undefined;

      if (!isRequired || isDefined) continue;

      throw new Error(`Missing required field - '${key}'.`);
    }

    for (const key in fields) {
      const resolve = fields[key]?.resolve;

      if (!resolve) continue;

      options.frontmatter[key] = resolve(options as never) as never;
    }

    return true;
  };
