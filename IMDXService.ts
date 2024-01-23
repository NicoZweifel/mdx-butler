import { DocServiceOptions } from './types';
import { bundleMDX } from 'mdx-bundler';

export interface IMDXService {
  getDocs(
    opts?: DocServiceOptions
  ): Promise<Awaited<ReturnType<typeof bundleMDX>>[]>;
}
