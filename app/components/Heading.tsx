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
      <h3 className="font-light text-neutral-500 mt-2">{subTitle}</h3>
    </div>
  );
}

Heading.defaultProps = {
  subTitle: null,
  center: false,
};

export default Heading;
