import {
  MDXServiceBaseOptions,
  UnknownFrontMatter,
  MDXServiceOptions,
  MDXServiceReturnType,
  SourceFileType,
  FieldDefinitions,
} from './types/index.js';

export interface IMDXBundlerService<
  TFrontmatter extends UnknownFrontMatter,
  TOptions extends
    MDXServiceBaseOptions<TFrontmatter> = MDXServiceBaseOptions<TFrontmatter>,
  TFields extends FieldDefinitions<TFrontmatter, TOptions> = FieldDefinitions<
    TFrontmatter,
    TOptions
  >,
> {
  readonly options: MDXServiceOptions<TFrontmatter, TOptions, TFields>;
  bundle(
    ...files: SourceFileType[]
  ): Promise<MDXServiceReturnType<TFrontmatter>[]>;
}
