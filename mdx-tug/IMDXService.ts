import {
  MDXServiceBaseOptions,
  UnknownFrontMatter,
  MDXServiceOptions,
  MDXServiceReturnType,
  SourceFileType,
} from './types';

export interface IMDXService<
  TFrontmatter extends UnknownFrontMatter,
  TOptions extends
    MDXServiceBaseOptions<TFrontmatter> = MDXServiceBaseOptions<TFrontmatter>,
> {
  readonly options: MDXServiceOptions<TFrontmatter, TOptions>;
  bundle(
    ...files: SourceFileType[]
  ): Promise<MDXServiceReturnType<TFrontmatter>[]>;
}
