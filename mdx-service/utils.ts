import { DocHeading } from './types';
import { bundleMDX } from 'mdx-bundler';

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

export async function bundleHeadings(headings: DocHeading[]) {
  return Promise.all(headings.map(bundleHeading));
}
