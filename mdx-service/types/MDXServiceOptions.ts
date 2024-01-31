import { UnknownFrontMatter } from './UnknownFrontMatter';
import { MDXServiceBaseOptions } from './MDXServiceBaseOptions';
import { FrontmatterProcessor } from './FrontmatterProcessor';

import { FieldDefinitions } from './FieldDefinitions';

export type MDXServiceOptions<
  TFrontmatter extends UnknownFrontMatter = UnknownFrontMatter,
  TOptions extends
    MDXServiceBaseOptions<TFrontmatter> = MDXServiceBaseOptions<TFrontmatter>,
> = TOptions & {
  fields?: FieldDefinitions<TFrontmatter, TOptions>;
  frontmatterProcessor?: FrontmatterProcessor<TFrontmatter, TOptions>;
};
