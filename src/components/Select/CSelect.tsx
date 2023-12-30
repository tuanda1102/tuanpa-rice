import Select, {
  type ClearIndicatorProps,
  type DropdownIndicatorProps,
  type MultiValueRemoveProps,
  components,
} from 'react-select';
import { forwardRef } from 'react';
import { HiChevronDown, HiMiniXMark } from 'react-icons/hi2';

import { CLabel } from '@/components/Label';
import { ErrorMessage } from '@/components/ErrorMessage';
import { type ICSelectProps } from '@/types/select';

const controlStyles = {
  base: 'border !rounded-medium h-input hover:cursor-pointer !bg-default-100 data-[hover=true]:bg-default-200 group-data-[focus=true]:bg-default-100',
  focus: '!border-none ring-none',
  nonFocus: '!border-gray-200 hover:border-gray-300',
};
const placeholderStyles = 'text-gray-500 pl-1 py-0.5';
const selectInputStyles = 'pl-1 py-0.5';
const valueContainerStyles = 'p-1 gap-1 leading-[100%]';
const singleValueStyles = 'leading-7 ml-1';
const multiValueStyles =
  'bg-gray-100 rounded items-center py-0.5 pl-2 pr-1 gap-1.5';
const multiValueLabelStyles = 'leading-6 py-0.5';
const multiValueRemoveStyles =
  'border border-gray-200 bg-white hover:bg-red-50 hover:text-red-800 text-gray-500 hover:border-red-300 rounded-md';
const indicatorsContainerStyles = 'p-1 gap-1';
const clearIndicatorStyles =
  'text-gray-500 p-1 rounded-md hover:bg-red-50 hover:text-red-800';
const indicatorSeparatorStyles = 'bg-gray-300 hidden';
const dropdownIndicatorStyles =
  'p-1 hover:bg-gray-100 !text-input-border rounded-md hover:text-black';
const menuStyles = 'p-1 mt-2 border border-gray-200 bg-white rounded-lg';
const groupHeadingStyles = 'ml-3 mt-2 mb-1 text-gray-500 text-sm';
const optionStyles = {
  base: 'hover:cursor-pointer px-3 py-2 rounded',
  focus: 'bg-gray-100 active:bg-gray-200',
  selected: 'after:ml-2 after:text-green-500 text-gray-500',
};
const noOptionsMessageStyles =
  'text-gray-500 p-2 bg-gray-50 border border-dashed border-gray-200 rounded-sm';

function DropdownIndicator(props: DropdownIndicatorProps) {
  return (
    <components.DropdownIndicator {...props}>
      <HiChevronDown />
    </components.DropdownIndicator>
  );
}

function ClearIndicator(props: ClearIndicatorProps) {
  return (
    <components.ClearIndicator {...props}>
      <HiMiniXMark />
    </components.ClearIndicator>
  );
}

function MultiValueRemove(props: MultiValueRemoveProps) {
  return (
    <components.MultiValueRemove {...props}>
      <HiMiniXMark />
    </components.MultiValueRemove>
  );
}

function CSelect(
  {
    label = '',
    required = false,
    classNameWrapper = 'mb-3',
    isValid = false,
    options = [],
    errorMessage = '',
    ...passProps
  }: ICSelectProps,
  ref: any,
) {
  return (
    <div className={classNameWrapper}>
      {label && <CLabel isRequired={required}>{label}</CLabel>}
      <Select
        ref={ref}
        menuPortalTarget={document.body}
        styles={{
          input: (base) => ({
            ...base,
            'input:focus': {
              boxShadow: 'none',
            },
          }),
          // On mobile, the label will truncate automatically, so we want to
          // override that behaviour.
          multiValueLabel: (base) => ({
            ...base,
            whiteSpace: 'normal',
            overflow: 'visible',
          }),
          container: (base) => ({
            ...base,
            zIndex: 100,
          }),
          control: (base) => ({
            ...base,
            transition: 'none',
          }),
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        }}
        components={{ DropdownIndicator, ClearIndicator, MultiValueRemove }}
        classNames={{
          control: ({ isFocused }) =>
            `${controlStyles.base} ${
              isFocused ? controlStyles.focus : controlStyles.nonFocus
            } ${isValid ? '!border-danger' : ''}`,
          placeholder: () => placeholderStyles,
          input: () => selectInputStyles,
          valueContainer: () => valueContainerStyles,
          singleValue: () => singleValueStyles,
          multiValue: () => multiValueStyles,
          multiValueLabel: () => multiValueLabelStyles,
          multiValueRemove: () => multiValueRemoveStyles,
          indicatorsContainer: () => indicatorsContainerStyles,
          clearIndicator: () => clearIndicatorStyles,
          indicatorSeparator: () => indicatorSeparatorStyles,
          dropdownIndicator: () => dropdownIndicatorStyles,
          menu: () => menuStyles,
          groupHeading: () => groupHeadingStyles,
          option: ({ isFocused, isSelected }) =>
            `${isFocused ? optionStyles.focus : ''} ${
              isSelected ? optionStyles.selected : ''
            } ${optionStyles.base}`,
          noOptionsMessage: () => noOptionsMessageStyles,
        }}
        options={options}
        {...passProps}
      />
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </div>
  );
}

export default forwardRef(CSelect);
