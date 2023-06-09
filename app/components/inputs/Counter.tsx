'use client';

import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

interface IProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

function Counter({ title, subtitle, value, onChange }: IProps) {
  const handleAdd = () => onChange(value + 1);

  const handleReduce = () => {
    if (value === 1) return;

    onChange(value - 1);
  };

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <h2 className="font-semibold">{title}</h2>
        <h4 className="font-light text-gray-600">{subtitle}</h4>
      </div>

      <div className="flex flex-row items-center gap-4">
        <button
          type="button"
          onClick={handleReduce}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-[1px] border-neutral-400 text-neutral-600 transition hover:opacity-80"
        >
          <AiOutlineMinus />
        </button>
        <p className="text-xl font-light text-neutral-600">{value}</p>
        <button
          type="button"
          onClick={handleAdd}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-[1px] border-neutral-400 text-neutral-600 transition hover:opacity-80"
        >
          <AiOutlinePlus />
        </button>
      </div>
    </div>
  );
}

export default Counter;
