import { DocServiceOptions } from './types';
import { bundleMDX } from 'mdx-bundler';
import path from 'path';
import { glob } from 'glob/dist/esm';

import { IMDXService } from './IMDXService';
import { FileNotRequiredError } from './FileNotRequiredError';

export class MDXService implements IMDXService {
  constructor(private readonly options: DocServiceOptions) {}

  async getDocs(
    opts?: Partial<DocServiceOptions>
  ): Promise<Awaited<ReturnType<typeof bundleMDX>>[]> {
    const options = {
      ...this.options,
      ...opts,
    };

    const {
      pattern,
      sortProvider,
      mdxBundlerOptions,
      toc,
      frontmatterProcessor,
      tocPlugin,
      baseRoute,
      route,
    } = options;

    // absolute
    const cwd = path.join(process.cwd(), options.cwd);

    const files = await glob(pattern, { ignore: 'node_modules/**', cwd });
    const res: ReturnType<typeof bundleMDX>[] = [];

    for (const file of files) {
      const filePath = path.join(cwd, file);

      res.push(
        new Promise((resolve, reject) =>
          bundleMDX({
            ...mdxBundlerOptions,
            file: filePath,
            cwd,
            mdxOptions: (processorOptions, frontmatter) => {
              frontmatterProcessor?.(options.cwd, file, baseRoute, frontmatter);
              if (
                route &&
                route.toLowerCase() !== frontmatter.route.toLowerCase() &&
                route.toLowerCase() !== frontmatter.path.toLowerCase()
              ) {
                resolve({
                  frontmatter,
                  errors: [],
                  code: '',
                  matter: {} as never,
                });
                throw new FileNotRequiredError();
              }

              // this is the recommended way to add custom remark/rehype plugins:
              // The syntax might look weird, but it protects you in case we add/remove
              // plugins in the future.
              processorOptions.remarkPlugins = [
                toc && tocPlugin ? tocPlugin(frontmatter.headings) : [],
                ...(processorOptions.remarkPlugins ?? []),
                ...(mdxBundlerOptions.mdxOptions.remarkPlugins ?? []),
              ];
              processorOptions.rehypePlugins = [
                ...(processorOptions.rehypePlugins ?? []),
                ...(mdxBundlerOptions.mdxOptions.rehypePlugins ?? []),
              ];

              return {
                ...processorOptions,
                ...mdxBundlerOptions.mdxOptions,
                remarkPlugins: processorOptions.remarkPlugins,
                rehypePlugins: processorOptions.rehypePlugins,
              };
            },
          })
            .then(resolve)
            .catch((e) => {
              if (!(e instanceof FileNotRequiredError)) reject(e);
            })
        )
      );
    }

    return Promise.all(res).then(sortProvider);
  }
}
