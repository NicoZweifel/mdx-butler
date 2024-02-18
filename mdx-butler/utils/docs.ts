import { MDXBundlerService } from '../MDXBundlerService.js';
import {
  FieldDefinitions,
  MDXServiceBaseOptions,
  MDXServiceOptions,
} from '../types/index.js';

export function docs<
  TFrontmatter extends Partial<Record<keyof TFields, string>>,
  TOptions extends
    MDXServiceBaseOptions<TFrontmatter> = MDXServiceBaseOptions<TFrontmatter>,
  TFields extends FieldDefinitions<TFrontmatter, TOptions> = FieldDefinitions<
    TFrontmatter,
    TOptions
  >,
>(options: MDXServiceOptions<TFrontmatter, TOptions, TFields>) {
  const service = MDXBundlerService.create<TFrontmatter, TOptions, TFields>(
    options
  );

  return service.docs();
}
