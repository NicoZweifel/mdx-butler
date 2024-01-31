import {
  FrontmatterProcessor,
  MDXServiceBaseOptions,
  UnknownFrontMatter,
} from './types';

export type FieldDefinitions<
  TFrontmatter extends Record<
    keyof FieldDefinitions,
    string
  > = UnknownFrontMatter,
  TOptions extends
    MDXServiceBaseOptions<TFrontmatter> = MDXServiceBaseOptions<TFrontmatter>,
> = Record<
  string,
  {
    required?: boolean;
    resolve?: (
      options: TOptions & {
        frontmatter: Partial<TFrontmatter>;
        file: string;
        path: string;
      }
    ) => string;
  }
>;

export function createFrontmatterProcessor<
  TFields extends FieldDefinitions<Record<string, string>, TOptions>,
  TOptions extends MDXServiceBaseOptions<
    Record<string, string>
  > = MDXServiceBaseOptions<Record<string, string>>,
>(
  fields: TFields
): FrontmatterProcessor<Record<keyof FieldDefinitions, string>, TOptions> {
  return (options) => {
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

      options.frontmatter[key] = resolve(options) as never;
    }

    return true;
  };
}
