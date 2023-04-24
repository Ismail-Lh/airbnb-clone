'use client';

interface HeadingProps {
  title: string;
  subTitle?: string;
  center?: boolean;
}

function Heading({ title, subTitle, center }: HeadingProps) {
  return (
    <div className={center ? 'text-center' : 'text-start'}>
      <h1 className="text-2xl font-bold">{title}</h1>
      <h3 className="mt-2 font-light text-neutral-500">{subTitle}</h3>
    </div>
  );
}

export default Heading;
