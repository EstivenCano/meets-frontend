import { FC, SelectHTMLAttributes } from "react";

interface SelectProps {
  label: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select: FC<
  SelectProps & Omit<SelectHTMLAttributes<HTMLSelectElement>, "options">
> = ({ name, label, options, error, ...props }) => {
  return (
    <div className='flex flex-col'>
      <label htmlFor={name} className='sr-only'>
        {label}
      </label>
      <select
        name={name}
        id={name}
        className='py-2 px-2 text-auto w-full rounded-md border-2 border-violet-600 hover:border-violet-400 focus:outline-none focus:border-violet-400 text-text dark:bg-gray-300/10 dark:border-violet-500/40'
        {...props}>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className='text-text bg-background checked:bg-violet-600 hover:bg-violet-500'>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className='text-xs text-red-500'>{error}</p>}
    </div>
  );
};
