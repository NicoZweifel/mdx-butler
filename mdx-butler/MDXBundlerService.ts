import {
  DocHeading,
  FieldDefinitions,
  MDXBundlerServiceBaseOptions,
  MDXBundlerServiceOptions,
  MDXBundlerServiceReturnType,
  SOURCE_FILE_TYPE,
  SourceFileType,
  UnknownFrontMatter,
} from './types/index.js';
import { bundleMDX } from 'mdx-bundler';
import { join } from 'path';
import { glob } from 'glob';

import { IMDXBundlerService } from './IMDXBundlerService.js';
import { FileNotRequiredError } from './FileNotRequiredError.js';
import { tocPlugin } from './utils/tocPlugin.js';
import { createFrontmatterProcessor } from './utils/createFrontmatterProcessor.js';
import * as process from 'process';
import { bundleHeadings } from './utils/bundleHeadings.js';

export class MDXBundlerService<
  TFrontmatter extends UnknownFrontMatter = UnknownFrontMatter,
  TOptions extends
    MDXBundlerServiceBaseOptions<TFrontmatter> = MDXBundlerServiceBaseOptions<TFrontmatter>,
  TFields extends FieldDefinitions<TFrontmatter, TOptions> = FieldDefinitions<
    TFrontmatter,
    TOptions
  >,
> implements IMDXBundlerService<TFrontmatter, TOptions, TFields>
{
  protected constructor(
    readonly options: MDXBundlerServiceOptions<TFrontmatter, TOptions, TFields>
  ) {}

  static create<
    TFrontmatter extends UnknownFrontMatter = UnknownFrontMatter,
    TOptions extends
      MDXBundlerServiceBaseOptions<TFrontmatter> = MDXBundlerServiceBaseOptions<TFrontmatter>,
    TFields extends FieldDefinitions<TFrontmatter, TOptions> = FieldDefinitions<
      TFrontmatter,
      TOptions
    >,
  >(
    options?: MDXBundlerServiceOptions<TFrontmatter, TOptions, TFields>
  ): IMDXBundlerService<TFrontmatter, TOptions, TFields> {
    if (options) {
      options.tocPlugin = options.tocPlugin ?? tocPlugin;
      options.fileProvider =
        options.fileProvider ??
        (async () => {
          // absolute
          const cwd = options.cwd
            ? join(process.cwd(), options.cwd)
            : process.cwd();

          return await glob(options.pattern ?? '**/*.mdx', {
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
    }
    return new MDXBundlerService(options ?? ({} as TOptions));
  }

  async docs(
    ...files: SourceFileType[]
  ): Promise<MDXBundlerServiceReturnType<TFrontmatter>[]> {
    const { fileProvider } = this.options;

    if (files?.length > 0) return this.bundleFiles(files);

    files = (await fileProvider?.(this.options)) ?? [];

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
  ): Promise<MDXBundlerServiceReturnType<TFrontmatter>> {
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

    return this.bundlePromise({
      file,
      source,
      path,
      cwd,
      headings,
    });
  }

  protected bundlePromise({
    file,
    source,
    cwd,
    path,
    headings,
  }: {
    file: SourceFileType;
    source:
      | { file: string; source?: undefined }
      | { source: string; file?: undefined };
    cwd: string;
    path: string;
    headings: DocHeading[];
  }): Promise<MDXBundlerServiceReturnType<TFrontmatter>> {
    const { mdxBundlerOptions, frontmatterProcessor, tocPlugin } = this.options;
    return new Promise((resolve, reject) =>
      bundleMDX<TFrontmatter>({
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
