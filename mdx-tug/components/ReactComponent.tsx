import { getMDXComponent, MDXContentProps } from 'mdx-bundler/client/index.js';
import { useMemo } from 'react';
import React from 'react';

export const useComponent = (code: string) =>
  useMemo(() => getMDXComponent(code), [code]);

export function ReactComponent<
  T extends { doc: { code: string } } & MDXContentProps,
>({ doc: { code }, ...props }: T) {
  const C = useComponent(code);
  return <C {...props} />;
}
