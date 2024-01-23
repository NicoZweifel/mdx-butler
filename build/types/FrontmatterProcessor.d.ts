import { UnknownFrontMatter } from "./UnknownFrontMatter";
export type FrontmatterProcessor = (cwd: string, file: string, baseRoute: string, frontmatter: UnknownFrontMatter) => void;
