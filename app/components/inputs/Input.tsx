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
    <div className="w-full relative">
      {formatPrice && (
        <BiDollar
          size={24}
          className="text-neutral-700 absolute top-5 left-2"
        />
      )}

      <input
        className={`peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none disabled:opacity-70 disabled:cursor-not-allowed transition ${
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
        className={`absolute text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
        peer-focus:scale-75 peer-focus:-translate-y-4 ${
          formatPrice ? 'left-9' : 'left-4'
        } ${errors[id] ? 'text-rose-500' : 'text-zinc-400'}`}
      >
        {label}
      </label>
    </div>
  );
}

export default Input;
