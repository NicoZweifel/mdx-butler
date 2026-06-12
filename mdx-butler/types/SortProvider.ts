import { UnknownFrontMatter } from './UnknownFrontMatter.js';

export type SortProvider<
  T extends { frontmatter: UnknownFrontMatter } = {
    frontmatter: UnknownFrontMatter;
  },
> = (pages: T[]) => T[];
