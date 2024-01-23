var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
import { bundleMDX } from 'mdx-bundler';
import path from 'path';
import { glob } from 'glob/dist/esm';
import { FileNotRequiredError } from './FileNotRequiredError';
export class DocService {
  constructor(options) {
    this.options = options;
  }
  getDocs(opts) {
    return __awaiter(this, void 0, void 0, function* () {
      const options = Object.assign(Object.assign({}, this.options), opts);
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
      const files = yield glob(pattern, { ignore: 'node_modules/**', cwd });
      const res = [];
      for (const file of files) {
        const filePath = path.join(cwd, file);
        res.push(
          new Promise((resolve, reject) =>
            bundleMDX(
              Object.assign(Object.assign({}, mdxBundlerOptions), {
                file: filePath,
                cwd,
                mdxOptions: (processorOptions, frontmatter) => {
                  var _a, _b, _c, _d;
                  frontmatterProcessor === null ||
                  frontmatterProcessor === void 0
                    ? void 0
                    : frontmatterProcessor(
                        options.cwd,
                        file,
                        baseRoute,
                        frontmatter
                      );
                  if (
                    route &&
                    route.toLowerCase() !== frontmatter.route.toLowerCase() &&
                    route.toLowerCase() !== frontmatter.path.toLowerCase()
                  ) {
                    resolve({
                      frontmatter,
                      errors: [],
                      code: '',
                      matter: {},
                    });
                    throw new FileNotRequiredError();
                  }
                  // this is the recommended way to add custom remark/rehype plugins:
                  // The syntax might look weird, but it protects you in case we add/remove
                  // plugins in the future.
                  processorOptions.remarkPlugins = [
                    toc && tocPlugin ? tocPlugin(frontmatter.headings) : [],
                    ...((_a = processorOptions.remarkPlugins) !== null &&
                    _a !== void 0
                      ? _a
                      : []),
                    ...((_b = mdxBundlerOptions.mdxOptions.remarkPlugins) !==
                      null && _b !== void 0
                      ? _b
                      : []),
                  ];
                  processorOptions.rehypePlugins = [
                    ...((_c = processorOptions.rehypePlugins) !== null &&
                    _c !== void 0
                      ? _c
                      : []),
                    ...((_d = mdxBundlerOptions.mdxOptions.rehypePlugins) !==
                      null && _d !== void 0
                      ? _d
                      : []),
                  ];
                  return Object.assign(
                    Object.assign(
                      Object.assign({}, processorOptions),
                      mdxBundlerOptions.mdxOptions
                    ),
                    {
                      remarkPlugins: processorOptions.remarkPlugins,
                      rehypePlugins: processorOptions.rehypePlugins,
                    }
                  );
                },
              })
            )
              .then(resolve)
              .catch((e) => {
                if (!(e instanceof FileNotRequiredError)) reject(e);
              })
          )
        );
      }
      return Promise.all(res).then(sortProvider);
    });
  }
}
