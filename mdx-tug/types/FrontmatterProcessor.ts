import { UnknownFrontMatter } from './UnknownFrontMatter';
import { MDXServiceBaseOptions } from './MDXServiceBaseOptions';

import { FieldDefinitions } from './FieldDefinitions';

export type FrontmatterProcessor<
  TFrontmatter extends UnknownFrontMatter,
  TOptions extends
    MDXServiceBaseOptions<TFrontmatter> = MDXServiceBaseOptions<TFrontmatter>,
> = (
  options: TOptions & {
    frontmatter: Partial<TFrontmatter>;
    file: string;
    path: string;
    fields?: FieldDefinitions<TFrontmatter, TOptions>;
  }
) => boolean;
