import { getMDXComponent } from 'mdx-bundler/client';

export * from 'mdx-bundler/client';

export function component<T extends { code: string }>({
  code,
}: T): ReturnType<typeof getMDXComponent> {
  return getMDXComponent(code);
}
