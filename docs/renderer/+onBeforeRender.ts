import { PageContext } from 'vike/types';

import options from '../options';

import { Options, PageService } from '../services';
import { frontmatterProcessor } from '../utils/frontmatterProcessor';
import { tocPlugin } from '../utils/tocPlugin';
import { navGenerator } from '../utils/navGenerator';
import { sortProvider } from '../utils/sortProvider';
import { MDXBundlerService } from 'mdx-tug';
import { Frontmatter } from '../types/Frontmatter';

export { onBeforeRender };

async function onBeforeRender(pageContext: PageContext) {
  const opts = {
    ...options,
    route: pageContext.urlPathname,
  };

  const docService = MDXBundlerService.create<
    Frontmatter,
    Options & { route?: string }
  >({
    tocPlugin,
    frontmatterProcessor,
    sortProvider,
    ...opts,
  });

  const pageService = new PageService({
    navGenerator,
    ...opts,
    mdxService: docService,
  });

  return (await pageService.getPages())[0];
}
