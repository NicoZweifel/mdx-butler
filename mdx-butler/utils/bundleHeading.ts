import { bundleMDX } from 'mdx-bundler';
import { DocHeading } from '../types';

export async function bundleHeading(heading: DocHeading) {
  return {
    ...heading,
    content: (
      await bundleMDX({
        source: heading.title,
      })
    ).code,
  };
}
