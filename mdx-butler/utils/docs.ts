import { MDXBundlerService } from '../MDXBundlerService.js';
import {
  FieldDefinitions,
  MDXBundlerServiceBaseOptions,
  MDXBundlerServiceOptions,
} from '../types/index.js';

export function docs<
  TFrontmatter extends Partial<Record<keyof TFields, string>>,
  TOptions extends
    MDXBundlerServiceBaseOptions<TFrontmatter> = MDXBundlerServiceBaseOptions<TFrontmatter>,
  TFields extends FieldDefinitions<TFrontmatter, TOptions> = FieldDefinitions<
    TFrontmatter,
    TOptions
  >,
>(options?: MDXBundlerServiceOptions<TFrontmatter, TOptions, TFields>) {
  const service = MDXBundlerService.create<TFrontmatter, TOptions, TFields>(
    options
  );

  return service.docs();
}
