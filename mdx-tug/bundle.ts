import { MDXBundlerService } from './MDXBundlerService';
import {
  MDXServiceBaseOptions,
  MDXServiceOptions,
  UnknownFrontMatter,
} from './types';

export function bundle<
  TFrontmatter extends UnknownFrontMatter = UnknownFrontMatter,
  TOptions extends
    MDXServiceBaseOptions<TFrontmatter> = MDXServiceBaseOptions<TFrontmatter>,
>(options: MDXServiceOptions<TFrontmatter, TOptions>) {
  const service = MDXBundlerService.create<TFrontmatter, TOptions>(options);

  return service.bundle();
}
