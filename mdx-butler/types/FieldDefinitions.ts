import { UnknownFrontMatter } from './UnknownFrontMatter';
import { MDXServiceBaseOptions } from './MDXServiceBaseOptions';
import { FieldDefinition } from './FieldDefinition';

export type FieldDefinitions<
  TFrontmatter extends Record<
    keyof FieldDefinitions,
    string | undefined
  > = UnknownFrontMatter,
  TOptions extends
    MDXServiceBaseOptions<TFrontmatter> = MDXServiceBaseOptions<TFrontmatter>,
> = Partial<
  Record<keyof TFrontmatter, FieldDefinition<TFrontmatter, TOptions>>
>;
