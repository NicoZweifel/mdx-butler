import { getMDXComponent, MDXContentProps } from 'mdx-bundler/client/index.js';
import { useMemo } from 'react';
import React from 'react';

export const useComponent = (
  code: string,
  globals?: Record<string, unknown> | undefined
) => useMemo(() => getMDXComponent(code, globals), [code]);

export function ReactComponent<
  T extends {
    doc: { code: string };
    globals?: Record<string, unknown> | undefined;
  } & MDXContentProps,
>({ doc: { code }, globals, ...props }: T) {
  const C = useComponent(code, globals);
  return <C {...props} />;
}
