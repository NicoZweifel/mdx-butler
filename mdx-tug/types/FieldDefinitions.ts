import { UnknownFrontMatter } from './UnknownFrontMatter';
import { MDXServiceBaseOptions } from './MDXServiceBaseOptions';

export type FieldDefinitions<
  TFrontmatter extends Record<
    keyof FieldDefinitions,
    string
  > = UnknownFrontMatter,
  TOptions extends
    MDXServiceBaseOptions<TFrontmatter> = MDXServiceBaseOptions<TFrontmatter>,
> = Record<
  keyof TFrontmatter,
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
