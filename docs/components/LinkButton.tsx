import { ComponentChildren, ComponentProps } from 'preact';
import { Link } from './Link';
import { cn } from '../utils/cn';
import { ExternalLink } from 'react-feather';

export const LinkButton = ({
  className,
  hideExternalIcon,
  ...p
}: ComponentProps<typeof Link> & { hideExternalIcon?: boolean }) => {
  const isExternal =
    (p as { href?: string }).href?.startsWith('http') ||
    (p as { href?: string }).href?.startsWith('mailto:');
  return (
    <Link {...p} className={cn('inline-block', className)}>
      <button
        aria-labelledby={p.id}
        className={
          'underline font-bold decoration-2 underline-offset-2  decoration-primary-800/40 hover:decoration-primary-800/60 dark:decoration-primary-400/40 dark:hover:decoration-primary-400/60 text-primary-700/60 hover:text-primary-800/80 dark:text-primary-300/60 dark:hover:text-primary-300/80 flex items-center gap-1 flex-row rounded-sm px-0.5'
        }
      >
        {(p as { children: ComponentChildren }).children}
        {isExternal && !hideExternalIcon && (
          <ExternalLink color={'currentColor'} size={14} />
        )}
      </button>
    </Link>
  );
};
