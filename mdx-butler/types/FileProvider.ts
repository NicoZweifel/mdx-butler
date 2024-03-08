import { MDXBundlerServiceBaseOptions } from './MDXBundlerServiceBaseOptions';
import { FieldDefinitions } from './FieldDefinitions';
import { SourceFileType } from './SourceFileType';
import { MDXBundlerServiceOptions } from './MDXBundlerServiceOptions';

export type FileProvider<
  TFrontmatter extends Record<keyof TFields, string | undefined>,
  TOptions extends
    MDXBundlerServiceBaseOptions<TFrontmatter> = MDXBundlerServiceBaseOptions<TFrontmatter>,
  TFields extends FieldDefinitions<TFrontmatter, TOptions> = FieldDefinitions<
    TFrontmatter,
    TOptions
  >,
> = (
  options: MDXBundlerServiceOptions<TFrontmatter, TOptions, TFields>
) => Promise<SourceFileType[]>;
