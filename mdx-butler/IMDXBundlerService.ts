import {
  MDXBundlerServiceBaseOptions,
  UnknownFrontMatter,
  MDXBundlerServiceOptions,
  MDXBundlerServiceReturnType,
  SourceFileType,
  FieldDefinitions,
} from './types/index.js';

export interface IMDXBundlerService<
  TFrontmatter extends UnknownFrontMatter,
  TOptions extends
    MDXBundlerServiceBaseOptions<TFrontmatter> = MDXBundlerServiceBaseOptions<TFrontmatter>,
  TFields extends FieldDefinitions<TFrontmatter, TOptions> = FieldDefinitions<
    TFrontmatter,
    TOptions
  >,
> {
  readonly options?: MDXBundlerServiceOptions<TFrontmatter, TOptions, TFields>;
  docs(
    ...files: SourceFileType[]
  ): Promise<MDXBundlerServiceReturnType<TFrontmatter>[]>;
}
