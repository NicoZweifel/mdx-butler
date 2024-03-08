import { MDXBundlerService } from './MDXBundlerService.js';
import { docs } from './utils/docs.js';
import { createFrontmatterProcessor } from './utils/createFrontmatterProcessor.js';

export * from 'mdx-bundler';

export type { IMDXBundlerService } from './IMDXBundlerService';
export type {
  MDXBundlerServiceBaseOptions,
  DocHeading,
  MDXOptions,
  MDXBundlerOptions,
  FrontmatterProcessor,
  SourceFileType,
  SortProvider,
  FileProvider,
  FieldDefinitions,
  UnknownFrontMatter,
  SOURCE_FILE_TYPE,
  MDXBundlerServiceOptions,
  MDXBundlerServiceReturnType,
} from './types/index.js';
export { MDXBundlerService, docs, createFrontmatterProcessor };

export default docs;
