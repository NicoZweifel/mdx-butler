import { MDXService } from './MDXService';
import { bundle } from './bundle';
import { createFrontmatterProcessor } from './createFrontmatterProcessor';

export type { IMDXService } from './IMDXService';
export type {
  MDXServiceBaseOptions,
  DocHeading,
  MDXOptions,
  MDXBundlerOptions,
  FrontmatterProcessor,
} from './types';
export { MDXService, bundle, createFrontmatterProcessor };

export default MDXService;
