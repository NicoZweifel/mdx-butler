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
          'underline font-bold decoration-2 underline-offset-2 decoration-secondary-500/60 hover:decoration-secondary-500/80 text-secondary-700/60 hover:text-secondary-800/80 dark:text-secondary-400/60 dark:hover:text-secondary-400/80 flex items-center gap-1 flex-row rounded-sm px-0.5'
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
