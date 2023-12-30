import { type SelectProps } from '@nextui-org/react';

export interface ISelectOptions {
  label: string;
  value: string;
}

export interface ICSelectProps extends Omit<SelectProps, 'children'> {
  name: string;
  classNameWrapper?: string;
  options: ISelectOptions[];
}
