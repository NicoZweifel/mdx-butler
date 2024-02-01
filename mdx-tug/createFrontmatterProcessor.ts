import {
  FrontmatterProcessor,
  MDXServiceBaseOptions,
  FieldDefinitions,
} from './types';

export function createFrontmatterProcessor<
  TFields extends FieldDefinitions<Record<string, string>>,
  TOptions extends MDXServiceBaseOptions<
    Record<keyof TFields, string>
  > = MDXServiceBaseOptions<Record<keyof TFields, string>>,
>(
  fields: TFields
): FrontmatterProcessor<Record<keyof TFields, string>, TOptions> {
  return function frontmatterProcessor(options) {
    for (const key in fields) {
      const isRequired = fields[key].required;
      const isDefined = options.frontmatter[key] != undefined;

      if (!isDefined) options.frontmatter[key] = '' as never;

      if (!isRequired || isDefined) continue;

      throw new Error(`Missing required field - '${key}'.`);
    }

    for (const key in fields) {
      const resolve = fields[key].resolve;

      if (!resolve) continue;

      options.frontmatter[key] = resolve(options as never);
    }

    return true;
  };
}
