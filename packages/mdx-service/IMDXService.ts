import { MDXServiceBaseOptions, UnknownFrontMatter } from './types';
import { MDXServiceOptions } from './types';
import { MDXServiceReturnType } from './types/MDXServiceReturnType';

export interface IMDXService<
  TFrontmatter extends UnknownFrontMatter,
  TOptions extends
    MDXServiceBaseOptions<TFrontmatter> = MDXServiceBaseOptions<TFrontmatter>,
> {
  get(
    opts?: Partial<MDXServiceOptions<TFrontmatter, TOptions>>
  ): Promise<MDXServiceReturnType<TFrontmatter>[]>;
}
