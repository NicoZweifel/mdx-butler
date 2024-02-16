import { MDXServiceBaseOptions } from './MDXServiceBaseOptions';
import { FieldDefinitions } from './FieldDefinitions';
import { SourceFileType } from './SourceFileType';
import { MDXServiceOptions } from './MDXServiceOptions';

export type FileProvider<
  TFrontmatter extends Record<keyof TFields, string | number>,
  TOptions extends
    MDXServiceBaseOptions<TFrontmatter> = MDXServiceBaseOptions<TFrontmatter>,
  TFields extends FieldDefinitions<TFrontmatter, TOptions> = FieldDefinitions<
    TFrontmatter,
    TOptions
  >,
> = (
  options: MDXServiceOptions<TFrontmatter, TOptions, TFields>
) => Promise<SourceFileType[]>;
