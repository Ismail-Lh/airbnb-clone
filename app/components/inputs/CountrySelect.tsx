'use client';

import Select from 'react-select';

import useCountries from '@/app/hooks/useCountries';
import { CountrySelectValues } from '@/app/types';

interface IProps {
  value?: CountrySelectValues;
  onChange: (val: CountrySelectValues) => void;
}

function CountrySelect({ value, onChange }: IProps) {
  const { getAll } = useCountries();

  const optionLabel = (option: any) => (
    <div className="flex flex-row items-center gap-3">
      <div>{option.flag}</div>
      <div>
        {option.label},{' '}
        <span className="text-neutral-500 ml-1">{option.region}</span>
      </div>
    </div>
  );

  return (
    <div>
      <Select
        placeholder="Anywhere"
        isClearable
        options={getAll()}
        value={value}
        onChange={(val) => onChange(val as CountrySelectValues)}
        formatOptionLabel={(option) => optionLabel(option)}
        classNames={{
          control: () => 'p-3 border-2',
          input: () => 'text-lg',
          option: () => 'text-lg',
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: 'black',
            primary25: '#ffe4e6',
          },
        })}
      />
    </div>
  );
}

export default CountrySelect;
