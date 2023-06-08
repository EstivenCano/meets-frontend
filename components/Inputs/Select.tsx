import { ChangeEvent, FC, SelectHTMLAttributes } from "react";
import * as SelectUI from "@radix-ui/react-select";
import React from "react";
import ArrowUpIcon from "@/public/icons/ArrowUp";
import ArrowDownIcon from "@/public/icons/ArrowDown";

interface SelectProps {
  label: string;
  name: string;
  error?: string;
  options: { value: string; label: string }[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export const Select: FC<
  SelectProps & Omit<SelectHTMLAttributes<HTMLSelectElement>, "options">
> = ({ name, label, options, error, onChange, ...props }) => {
  const handleChange = (value: string) =>
    onChange({
      target: {
        name: name,
        value: value,
      },
    } as ChangeEvent<HTMLSelectElement>);

  return (
    <>
      <SelectUI.Root
        name={name}
        value={props.value as string}
        onValueChange={handleChange}>
        <SelectUI.Trigger
          className='inline-flex relative items-center content-center py-2 px-2 gap-2 rounded-md border-2 border-violet-600 hover:border-violet-400 focus:border-violet-400 text-black [&:not(:placeholder-shown):not(:focus):invalid]:border-red-600 dark:bg-gray-300/10 dark:border-violet-500/40 dark:text-text'
          aria-label={label}>
          <SelectUI.Value placeholder={props.placeholder} />
          <SelectUI.Icon>
            <ArrowDownIcon />
          </SelectUI.Icon>
        </SelectUI.Trigger>
        <SelectUI.Portal>
          <SelectUI.Content className='overflow-hidden z-40 bg-background rounded-md shadow-sm shadow-gray-400 dark:shadow-gray-600'>
            <SelectUI.ScrollUpButton className='flex items-center justify-center bg-gray-600/20'>
              <ArrowUpIcon />
            </SelectUI.ScrollUpButton>
            <SelectUI.Viewport className='p-1'>
              <SelectUI.Group>
                <SelectUI.Label className='capitalize text-sm font-bold bg-gray-600/20 p-2'>
                  {label}
                </SelectUI.Label>
                {options.map(({ label, value }, i) => (
                  <SelectItem key={`${label}-${i}`} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectUI.Group>
            </SelectUI.Viewport>
            <SelectUI.ScrollDownButton className='flex items-center justify-center bg-gray-600/20'>
              <ArrowDownIcon />
            </SelectUI.ScrollDownButton>
          </SelectUI.Content>
        </SelectUI.Portal>
      </SelectUI.Root>
      {error && <p className='text-xs p-1 text-red-500'>{error}</p>}
    </>
  );
};

const SelectItem = React.forwardRef<HTMLDivElement, SelectUI.SelectItemProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <SelectUI.Item
        className={`relative rounded-sm flex gap-2 py-2 px-2 select-none hover:bg-violet-400  dark:hover:bg-violet-600 hover:rounded-md ${className}`}
        {...props}
        ref={forwardedRef}>
        <SelectUI.ItemIndicator className='absolute top-0 left-0 w-full h-full bg-violet-500/20'></SelectUI.ItemIndicator>
        <SelectUI.ItemText>{children}</SelectUI.ItemText>
      </SelectUI.Item>
    );
  }
);

SelectItem.displayName = "SelectItem";
