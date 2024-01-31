import { afterEach, describe, expect, it, vi } from 'vitest';
import { MDXService } from './MDXService';

describe('MDXService integration tests', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should process hello_world.mdx headings.', async () => {
    const cwd = '/data';

    const mdxService = MDXService.create<{ title: string }>({
      filePattern: 'hello_world.mdx',
      cwd,
    });

    const result = await mdxService.bundle();

    expect(result[0].file).toEqual('hello_world.mdx');
    expect(result[0].headings.length).toEqual(3);
    expect(result[0].frontmatter).toStrictEqual({
      title: 'test',
    });
  });
});