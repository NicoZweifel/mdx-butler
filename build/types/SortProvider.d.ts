import { UnknownFrontMatter } from "./UnknownFrontMatter";
export type SortProvider<T extends {
    frontmatter: UnknownFrontMatter;
} = {
    frontmatter: UnknownFrontMatter;
}> = (pages: T[]) => T[];
