import { ComponentProps } from 'preact';
import { cn } from '../utils/cn';
import { NavTreeNode } from '../types/NavTreeNode';
import { usePageContext } from '../context/PageContext';
import { Link } from './Link';
import { useMemo } from 'preact/hooks';

type NavNodeProps = {
  node: NavTreeNode;
  flex?: 'col' | 'row';
};

const useNavNode = ({ node, flex }: NavNodeProps) => {
  const {
    pageProps: { basePath },
  } = usePageContext();

  const { children, path, navItems } = node;

  return useMemo(() => {
    const isBaseRoute = (path.length === 0 ? '/' : path) === basePath;
    const childNodes = children
      .filter((x) => x.navItems.length > 0)
      .map((x) => (
        <NavNode key={x.name} node={x} flex={!isBaseRoute ? flex : undefined} />
      ));

    const content = navItems.length > 0 && (
      <div
        className={cn(
          !isBaseRoute
            ? 'ml-1 pl-2 border-l border-primary-300/40 dark:border-primary-900/20 '
            : undefined,
          `flex flex-${flex ?? 'col'} gap-1`
        )}
      >
        {
          <div className={`flex flex-col gap-1`}>
            {navItems.map(({ title, route }) => (
              <Link
                key={route}
                className={`${isBaseRoute ? 'font-semibold' : ''} whitespace-nowrap text-sm py-1 px-2 flex items-center hover:bg-primary-200/40 dark:hover:bg-primary-900/20 rounded text-primary-900 hover:text-primary-900 dark:text-primary-100 dark:hover:text-primary-300`}
                href={route}
              >
                {title}
              </Link>
            ))}
          </div>
        }
        {childNodes}
      </div>
    );

    return {
      isBaseRoute,
      content,
      path,
    };
  }, [basePath, children, flex, navItems, path]);
};

export const NavNode = ({
  node,
  className,
  flex,
  ...props
}: NavNodeProps & Omit<ComponentProps<'div'>, 'children'>) => {
  const { name, path } = node;
  const { isBaseRoute, content } = useNavNode({ node, flex });

  return isBaseRoute ? (
    content
  ) : (
    <div
      {...props}
      className={cn(`flex flex-${flex ?? 'col'} gap-1`, className)}
    >
      <>
        <Link
          href={path}
          className={
            'font-semibold text-sm text-start py-1 pl-2  hover:bg-primary-200/40 dark:hover:bg-primary-900/20 rounded text-primary-900 hover:text-primary-900 dark:text-primary-100 dark:hover:text-primary-300'
          }
        >
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </Link>
        {content}
      </>
    </div>
  );
};
