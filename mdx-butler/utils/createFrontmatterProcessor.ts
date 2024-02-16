import {
  FrontmatterProcessor,
  MDXServiceBaseOptions,
  FieldDefinitions,
  UnknownFrontMatter,
} from '../types';

export function createFrontmatterProcessor<
  TFrontmatter extends UnknownFrontMatter,
  TOptions extends
    MDXServiceBaseOptions<TFrontmatter> = MDXServiceBaseOptions<TFrontmatter>,
  TFields extends FieldDefinitions<TFrontmatter, TOptions> = FieldDefinitions<
    TFrontmatter,
    TOptions
  >,
>(fields: TFields): FrontmatterProcessor<TFrontmatter, TOptions, TFields> {
  return function frontmatterProcessor(options) {
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
}
