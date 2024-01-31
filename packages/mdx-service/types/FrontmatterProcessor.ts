import { UnknownFrontMatter } from './UnknownFrontMatter';
import { MDXServiceBaseOptions } from './MDXServiceBaseOptions';

export type FrontmatterProcessor<
  TFrontmatter extends UnknownFrontMatter,
  TOptions extends Partial<MDXServiceBaseOptions<TFrontmatter>> = Partial<
    MDXServiceBaseOptions<TFrontmatter>
  >,
> = (
  options: TOptions & { frontmatter: Partial<TFrontmatter>; file: string }
) => {
  bundle?: boolean;
  frontmatter: TFrontmatter;
};
