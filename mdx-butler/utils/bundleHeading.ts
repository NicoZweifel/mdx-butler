import { bundleMDX } from 'mdx-bundler';
import { DocHeading } from '../types/index.js';

export const bundleHeading = async (heading: DocHeading) => ({
  ...heading,
  content: (
    await bundleMDX({
      source: heading.title,
    })
  ).code,
});
