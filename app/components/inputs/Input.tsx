'use client';

import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { BiDollar } from 'react-icons/bi';

interface InputProps {
  id: string;
  label: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  formatPrice?: boolean;
}

function Input({
  id,
  label,
  register,
  errors,
  type,
  required,
  disabled,
  formatPrice,
}: InputProps) {
  return (
    <div className="relative w-full">
      {formatPrice && (
        <BiDollar
          size={24}
          className="absolute left-2 top-5 text-neutral-700"
        />
      )}

      <input
        className={`peer w-full rounded-md border-2 bg-white p-4 pt-6 font-light outline-none transition disabled:cursor-not-allowed disabled:opacity-70 ${
          formatPrice ? 'pl-9' : 'pl-4'
        } ${errors[id] ? 'border-rose-500' : 'border-neutral-300'} ${
          errors[id] ? 'focus:border-rose-500' : 'focus:border-black'
        }`}
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=" "
        type={type}
      />

      <label
        htmlFor={id}
        className={`absolute top-5 z-10 origin-[0] -translate-y-3 duration-150 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4
        peer-focus:scale-75${formatPrice ? 'left-9' : 'left-4'} ${
          errors[id] ? 'text-rose-500' : 'text-zinc-400'
        }`}
      >
        {label}
      </label>
    </div>
  );
}

export default Input;
