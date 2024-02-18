import { usePageContext } from '../../context/PageContext';
import mdxComponents from '../../components/mdxComponents';
import { PageLayout } from '../../components';
import { Page as ErrorPage } from '../_error/+Page';
import { Component } from 'mdx-butler/client';

export { Page };

function Page() {
  const { pageProps } = usePageContext();
  const { code } = pageProps;
  if (code == undefined || code.length === 0)
    return (
      <div className={'pt-20'}>
        <ErrorPage is404={true} />
      </div>
    );

  return (
    <PageLayout>
      <Component doc={{ code }} components={mdxComponents} />
    </PageLayout>
  );
}
