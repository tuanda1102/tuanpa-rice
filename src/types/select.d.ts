import { type Props } from 'react-select';

export interface ISelectOptions {
  label: string;
  value: string;
}

// export interface ICSelectProps extends Omit<SelectProps, 'children'> {
//   name: string;
//   classNameWrapper?: string;
//   options: ISelectOptions[];
// }

export interface ICSelectProps extends Omit<Props, 'required'> {
  label?: string;
  classNameWrapper?: string;
  name: string;
  required?: boolean;
  options: ISelectOption[] | ISelectGroupOption[];
  isValid?: boolean;
  errorMessage?: string;
}
