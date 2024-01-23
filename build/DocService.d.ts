import { DocServiceOptions } from "./types";
import { bundleMDX } from "mdx-bundler";
import { IDocService } from "./IDocService";
export declare class DocService implements IDocService {
    private readonly options;
    constructor(options: DocServiceOptions);
    getDocs(opts?: Partial<DocServiceOptions>): Promise<Awaited<ReturnType<typeof bundleMDX>>[]>;
}
