import { UnknownFrontMatter } from './UnknownFrontMatter.js';
import { MDXBundlerServiceBaseOptions } from './MDXBundlerServiceBaseOptions.js';
import { FieldDefinition } from './FieldDefinition.js';

export type FieldDefinitions<
  TFrontmatter extends Record<
    keyof FieldDefinitions,
    string | boolean | undefined
  > = UnknownFrontMatter,
  TOptions extends MDXBundlerServiceBaseOptions<TFrontmatter> =
    MDXBundlerServiceBaseOptions<TFrontmatter>,
> = Partial<
  Record<keyof TFrontmatter, FieldDefinition<TFrontmatter, TOptions>>
>;
