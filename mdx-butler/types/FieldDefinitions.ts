import { UnknownFrontMatter } from './UnknownFrontMatter';
import { MDXBundlerServiceBaseOptions } from './MDXBundlerServiceBaseOptions';
import { FieldDefinition } from './FieldDefinition';

export type FieldDefinitions<
  TFrontmatter extends Record<
    keyof FieldDefinitions,
    string | undefined
  > = UnknownFrontMatter,
  TOptions extends
    MDXBundlerServiceBaseOptions<TFrontmatter> = MDXBundlerServiceBaseOptions<TFrontmatter>,
> = Partial<
  Record<keyof TFrontmatter, FieldDefinition<TFrontmatter, TOptions>>
>;
