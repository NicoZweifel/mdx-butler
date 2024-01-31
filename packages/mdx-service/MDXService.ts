import { DocHeading, MDXServiceBaseOptions, UnknownFrontMatter } from './types';
import { bundleMDX } from 'mdx-bundler';
import { join } from 'path';
import { glob } from 'glob';

import { IMDXService } from './IMDXService';
import { FileNotRequiredError } from './FileNotRequiredError';
import { MDXServiceOptions, MDXServiceReturnType } from './types';
import { tocPlugin } from './tocPlugin';

export class MDXService<
  TFrontmatter extends UnknownFrontMatter = UnknownFrontMatter,
  TOptions extends
    MDXServiceBaseOptions<TFrontmatter> = MDXServiceBaseOptions<TFrontmatter>,
> implements IMDXService<TFrontmatter, TOptions>
{
  constructor(
    private readonly options: MDXServiceOptions<TFrontmatter, TOptions>
  ) {
    options.tocPlugin = options.tocPlugin ?? tocPlugin;
    options.frontmatterProcessor =
      options.frontmatterProcessor ??
      (({ frontmatter }) => {
        return {
          bundle: true,
          frontmatter: frontmatter as TFrontmatter,
        };
      });
    options.sortProvider =
      options.sortProvider ??
      ((x) => {
        return x.sort((a, b) => a.file.localeCompare(b.file));
      });
  }

  async get(
    opts?: Partial<MDXServiceOptions<TFrontmatter, TOptions>>
  ): Promise<MDXServiceReturnType<TFrontmatter>[]> {
    const options: MDXServiceOptions<TFrontmatter, TOptions> = {
      ...this.options,
      ...opts,
    };

    const {
      pattern,
      sortProvider,
      mdxBundlerOptions,
      frontmatterProcessor,
      tocPlugin,
    } = options;

    // absolute
    const cwd = join(process.cwd(), options.cwd);

    const files = await glob(pattern, { ignore: 'node_modules/**', cwd });
    const res: Promise<MDXServiceReturnType<TFrontmatter>>[] = [];

    for (const file of files) {
      const filePath = join(cwd, file);
      const headings: DocHeading[] = [];
      res.push(
        new Promise((resolve, reject) =>
          bundleMDX({
            ...mdxBundlerOptions,
            file: filePath,
            cwd,
            mdxOptions: (processorOptions, frontmatter: TFrontmatter) => {
              const frontmatterProcessorResult = frontmatterProcessor?.({
                ...options,
                frontmatter,
                file,
              }) ?? { bundle: true, frontmatter };

              if (!frontmatterProcessorResult.bundle) {
                resolve({
                  frontmatter,
                  errors: [],
                  code: '',
                  matter: {} as never,
                  headings: [],
                  file,
                });
                throw new FileNotRequiredError();
              }

              // this is the recommended way to add custom remark/rehype plugins:
              // The syntax might look weird, but it protects you in case we add/remove
              // plugins in the future.
              processorOptions.remarkPlugins = [
                tocPlugin != undefined ? tocPlugin(headings) : [],
                ...(processorOptions.remarkPlugins ?? []),
                ...(mdxBundlerOptions?.mdxOptions.remarkPlugins ?? []),
              ];
              processorOptions.rehypePlugins = [
                ...(processorOptions.rehypePlugins ?? []),
                ...(mdxBundlerOptions?.mdxOptions.rehypePlugins ?? []),
              ];

              return {
                ...processorOptions,
                ...mdxBundlerOptions?.mdxOptions,
                remarkPlugins: processorOptions.remarkPlugins,
                rehypePlugins: processorOptions.rehypePlugins,
              };
            },
          })
            .then((x) =>
              resolve({
                ...x,
                frontmatter: x.frontmatter as TFrontmatter,
                file,
                headings,
              })
            )
            .catch((e) => {
              if (!(e instanceof FileNotRequiredError)) reject(e);
            })
        )
      );
    }

    return Promise.all(res).then((x) => sortProvider?.(x) ?? x);
  }
}
