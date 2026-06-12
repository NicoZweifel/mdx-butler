import { MDXBundlerServiceBaseOptions } from './MDXBundlerServiceBaseOptions.js';
import { FieldDefinitions } from './FieldDefinitions.js';
import { SourceFileType } from './SourceFileType.js';
import { MDXBundlerServiceOptions } from './MDXBundlerServiceOptions.js';

export type FileProvider<
  TFrontmatter extends Record<keyof TFields, string | boolean | undefined>,
  TOptions extends MDXBundlerServiceBaseOptions<TFrontmatter> =
    MDXBundlerServiceBaseOptions<TFrontmatter>,
  TFields extends FieldDefinitions<TFrontmatter, TOptions> = FieldDefinitions<
    TFrontmatter,
    TOptions
  >,
> = (
  options: MDXBundlerServiceOptions<TFrontmatter, TOptions, TFields>
) => Promise<SourceFileType[]>;
