import { MDXBundlerService } from './MDXBundlerService';
import { bundle } from './bundle';
import { createFrontmatterProcessor } from './createFrontmatterProcessor';

export * from 'mdx-bundler';

export type { IMDXService } from './IMDXService';
export type {
  MDXServiceBaseOptions,
  DocHeading,
  MDXOptions,
  MDXBundlerOptions,
  FrontmatterProcessor,
} from './types';
export { MDXBundlerService, bundle, createFrontmatterProcessor };

export default bundle;
