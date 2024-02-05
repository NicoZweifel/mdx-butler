import {
  DocHeading,
  FieldDefinitions,
  MDXServiceBaseOptions,
  MDXServiceOptions,
  MDXServiceReturnType,
  SourceFileType,
  UnknownFrontMatter,
} from './types/index.js';
import { bundleMDX } from 'mdx-bundler';
import { join } from 'path';
import { glob } from 'glob';

import { IMDXBundlerService } from './IMDXBundlerService';
import { FileNotRequiredError } from './FileNotRequiredError.js';
import { tocPlugin } from './tocPlugin.js';
import { SOURCE_FILE_TYPE } from './types/SourceFileType.js';
import { createFrontmatterProcessor } from './createFrontmatterProcessor.js';
import { bundleHeadings } from './utils.js';
import * as process from 'process';

if (__dirname == undefined) {
  // https://github.com/kentcdodds/mdx-bundler?tab=readme-ov-file#nextjs-esbuild-enoent
  if (process.platform === 'win32') {
    process.env.ESBUILD_BINARY_PATH = join(
      process.cwd(),
      'node_modules',
      'esbuild',
      'esbuild.exe'
    );
  } else {
    process.env.ESBUILD_BINARY_PATH = join(
      process.cwd(),
      'node_modules',
      'esbuild',
      'bin',
      'esbuild'
    );
  }
}

export class MDXBundlerService<
  TFrontmatter extends UnknownFrontMatter = UnknownFrontMatter,
  TOptions extends
    MDXServiceBaseOptions<TFrontmatter> = MDXServiceBaseOptions<TFrontmatter>,
  TFields extends FieldDefinitions<TFrontmatter, TOptions> = FieldDefinitions<
    TFrontmatter,
    TOptions
  >,
> implements IMDXBundlerService<TFrontmatter, TOptions, TFields>
{
  protected constructor(
    readonly options: MDXServiceOptions<TFrontmatter, TOptions, TFields>
  ) {}

  static create<
    TFrontmatter extends UnknownFrontMatter = UnknownFrontMatter,
    TOptions extends
      MDXServiceBaseOptions<TFrontmatter> = MDXServiceBaseOptions<TFrontmatter>,
    TFields extends FieldDefinitions<TFrontmatter, TOptions> = FieldDefinitions<
      TFrontmatter,
      TOptions
    >,
  >(
    options: MDXServiceOptions<TFrontmatter, TOptions, TFields>
  ): IMDXBundlerService<TFrontmatter, TOptions, TFields> {
    options.tocPlugin = options.tocPlugin ?? tocPlugin;
    options.fileProvider =
      options.fileProvider ??
      (async () => {
        // absolute
        const cwd = options.cwd
          ? join(process.cwd(), options.cwd)
          : process.cwd();

        return await glob(options.filePattern ?? '**/*.mdx', {
          ignore: 'node_modules/**',
          cwd,
        }).then((x) =>
          x.map((x) => ({
            type: SOURCE_FILE_TYPE.LOCAL,
            name: x.replaceAll('\\', '/'),
          }))
        );
      });

    if (options.fields != undefined) {
      options.frontmatterProcessor =
        options.frontmatterProcessor ??
        createFrontmatterProcessor(options.fields);
    } else {
      options.frontmatterProcessor =
        options.frontmatterProcessor ?? (() => true);
    }

    options.sortProvider =
      options.sortProvider ??
      ((x) => {
        return x.sort((a, b) => a.file.localeCompare(b.file));
      });

    return new MDXBundlerService(options);
  }

  async bundle(
    ...files: SourceFileType[]
  ): Promise<MDXServiceReturnType<TFrontmatter>[]> {
    const { fileProvider } = this.options;

    if (files?.length > 0) return this.bundleFiles(files);

    files = (await fileProvider?.()) ?? [];

    return this.bundleFiles(files);
  }

  protected bundleFiles(files: SourceFileType[]) {
    const { sortProvider } = this.options;
    return Promise.all(files.map(this.bundleFile.bind(this))).then(
      sortProvider
    );
  }

  protected async bundleFile(
    file: SourceFileType
  ): Promise<MDXServiceReturnType<TFrontmatter>> {
    const { mdxBundlerOptions, frontmatterProcessor, tocPlugin } = this.options;

    // absolute
    const cwd = this.options.cwd
      ? join(process.cwd(), this.options.cwd)
      : process.cwd();

    const headings: DocHeading[] = [];

    const source =
      file.type === SOURCE_FILE_TYPE.LOCAL
        ? {
            file: join(cwd, file.name),
          }
        : {
            source: file.value,
          };

    const path = file.name.substring(0, file.name.lastIndexOf('.'));

    return new Promise((resolve, reject) =>
      bundleMDX<Partial<TFrontmatter>>({
        ...mdxBundlerOptions,
        ...source,
        cwd,
        mdxOptions: (processorOptions, frontmatter) => {
          const frontmatterProcessorResult =
            frontmatterProcessor?.({
              ...this.options,
              frontmatter,
              file: file.name,
              path,
            }) ?? frontmatter;

          if (!frontmatterProcessorResult) {
            resolve({
              frontmatter: frontmatter as TFrontmatter,
              errors: [],
              code: '',
              matter: {} as never,
              headings: [],
              file: file.name,
              path,
            });
            throw new FileNotRequiredError();
          }

          // this is the recommended way to add custom remark/rehype plugins:
          // The syntax might look weird, but it protects you in case we add/remove
          // plugins in the future.
          processorOptions.remarkPlugins = [
            tocPlugin?.(headings),
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
        .then(async (x) =>
          resolve({
            ...x,
            frontmatter: x.frontmatter as TFrontmatter,
            file: file.name,
            path,
            headings: await bundleHeadings(headings),
          })
        )
        .catch((e) => {
          if (!(e instanceof FileNotRequiredError)) reject(e);
        })
    );
  }
}
