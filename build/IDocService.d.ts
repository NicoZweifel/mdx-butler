import { DocServiceOptions } from "./types";
import { bundleMDX } from "mdx-bundler";
export interface IDocService {
    getDocs(opts?: DocServiceOptions): Promise<Awaited<ReturnType<typeof bundleMDX>>[]>;
}
