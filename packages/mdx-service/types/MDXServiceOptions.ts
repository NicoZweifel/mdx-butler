import { UnknownFrontMatter } from './UnknownFrontMatter';
import { MDXServiceBaseOptions } from './MDXServiceBaseOptions';
import { FrontmatterProcessor } from './FrontmatterProcessor';

export type MDXServiceOptions<
  TFrontmatter extends UnknownFrontMatter = UnknownFrontMatter,
  TOptions extends
    MDXServiceBaseOptions<TFrontmatter> = MDXServiceBaseOptions<TFrontmatter>,
> = TOptions & {
  frontmatterProcessor?: FrontmatterProcessor<TFrontmatter, TOptions>;
};
