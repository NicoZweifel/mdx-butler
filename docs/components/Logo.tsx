import { Image, ImageProps } from '@unpic/preact';
import clsx from 'clsx';
import { usePageContext } from '../context/PageContext';

export default function Logo({ className, ...props }: Omit<ImageProps, 'src'>) {
  const {
    pageProps: { logo, logoDark },
  } = usePageContext();
  return (
    <>
      <Image
        className={clsx('dark:hidden', className)}
        src={logo}
        {...(props as ImageProps)}
      />
      <Image
        className={clsx('hidden dark:block', className)}
        src={logoDark}
        {...(props as ImageProps)}
      />
    </>
  );
}
