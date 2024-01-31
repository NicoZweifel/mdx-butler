import options from '../../options';

import { Options, PageService } from '../../services';
import { frontmatterProcessor } from '../../utils/frontmatterProcessor';
import { tocPlugin } from '../../utils/tocPlugin';
import { navGenerator } from '../../utils/navGenerator';
import { sortProvider } from '../../utils/sortProvider';
import { MDXService } from 'mdx-service';
import { Frontmatter } from '../../types/Frontmatter';

export { onBeforePrerenderStart };

async function onBeforePrerenderStart() {
  const mdxService = MDXService.create<Frontmatter, Options>({
    tocPlugin,
    sortProvider,
    frontmatterProcessor,
    ...options,
  });

  const pageService = new PageService({
    navGenerator,
    ...options,
    mdxService,
  });

  return pageService.getPages();
}
