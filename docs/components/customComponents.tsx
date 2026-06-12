import { ComponentProps } from 'preact';
import { Card } from './Card';

type ActionCardProps = Omit<ComponentProps<typeof Card>, 'variant'>;

export const Success = (p: ActionCardProps) => (
  <Card {...p} variant={'success'} />
);
export const Warning = (p: ActionCardProps) => (
  <Card {...p} variant={'warning'} />
);
export const Info = (p: ActionCardProps) => <Card {...p} variant={'info'} />;
export const Error = (p: ActionCardProps) => <Card {...p} variant={'error'} />;

export const Examples = () => (
  <div
    className={
      'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 whitespace-nowrap'
    }
  >
    <a className={'grow'} href={'/configuration/next'}>
      <Card className={'font-bold flex flex-row'}>Next.js</Card>
    </a>
    <a className={'grow'} href={'/configuration/react-router'}>
      <Card className={'font-bold'}>React-Router</Card>
    </a>
    <a className={'grow'} href={'/configuration/astro'}>
      <Card className={'font-bold'}>Astro</Card>
    </a>
    <a className={'grow'} href={'/configuration/waku'}>
      <Card className={'font-bold'}>Waku</Card>
    </a>
  </div>
);

export const customComponents = {
  Examples,
  Card,
  Success,
  Warning,
  Info,
  Error,
};
