import { DocHeading } from '../types/index.js';
import * as unified from 'unified';
import * as unist from 'unist';
import { MdxJsxTextElement, mdxToMarkdown } from 'mdast-util-mdx';
import { toMarkdown } from 'mdast-util-to-markdown';
import { Parent } from 'unist';

export const tocPlugin =
  (headings: DocHeading[]): unified.Plugin =>
  () =>
  async (node) => {
    for (const element of (node as Parent | undefined)?.children.filter(
      (_: unist.Node) => _.type === 'heading'
    ) ?? []) {
      if (element.type === 'heading') {
        const elm = element as MdxJsxTextElement & {
          depth: 1 | 2 | 3 | 4 | 5 | 6;
        };

        const title = toMarkdown(
          { type: 'paragraph', children: elm.children },
          { extensions: [mdxToMarkdown()] }
        )
          .trim()
          .replace(/<.*$/g, '')
          .replace(/\\/g, '')
          .trim();

        headings.push({ level: elm.depth, title });
      }
    }
  };
