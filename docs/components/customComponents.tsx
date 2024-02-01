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
  <div className={'flex sm:flex-row flex-col gap-4'}>
    <a className={'grow'} href={'/configuration/next'}>
      <Card className={'font-bold flex flex-row'}>Next.js</Card>
    </a>
    <a className={'grow'} href={'/configuration/remix'}>
      <Card className={'font-bold'}>Remix</Card>
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
