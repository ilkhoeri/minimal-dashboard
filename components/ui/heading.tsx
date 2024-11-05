import { twMerge } from 'tailwind-merge';

export type ClassHeadingType = { wrap?: string; title?: string; desc?: string };

interface HeadingProps {
  title: string;
  description: string;
  className?: string;
  classNames?: ClassHeadingType;
}

export const Heading: React.FC<HeadingProps> = ({ title, description, className, classNames }) => {
  return (
    <div className={classNames?.wrap || className}>
      <h2 className={twMerge('text-2xl font-bold tracking-tight', classNames?.title)}>{title}</h2>
      <p className={twMerge('text-sm text-muted-foreground', classNames?.desc)}>{description}</p>
    </div>
  );
};
