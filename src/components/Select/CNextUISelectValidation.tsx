// import { Controller, useFormContext } from 'react-hook-form';
// import { Select, SelectItem } from '@nextui-org/react';

// import { type ICSelectProps } from '@/types/select';

// function CSelectValidation({
//   name,
//   classNameWrapper = 'mb-3',
//   options = [],
//   label,
//   ...passProps
// }: ICSelectProps) {
//   const {
//     control,
//     watch,
//     formState: { errors, defaultValues },
//   } = useFormContext();

//   console.log('watch', watch(name));

//   return (
//     <Controller
//       control={control}
//       name={name}
//       render={({ field }) => (
//         <div className={classNameWrapper}>
//           <Select
//             autoComplete='off'
//             className='max-w-xs'
//             defaultSelectedKeys={
//               defaultValues && defaultValues[name]
//                 ? [`${defaultValues[name]}`]
//                 : undefined
//             }
//             aria-labelledby={String(label)}
//             aria-label={String(label)}
//             label={label}
//             errorMessage={
//               errors[name]?.message ? String(errors[name]?.message) : ''
//             }
//             isInvalid={!!errors[name]?.message}
//             {...field}
//             {...passProps}
//           >
//             {options.map((option) => (
//               <SelectItem key={option.value} value={option.value}>
//                 {option.label}
//               </SelectItem>
//             ))}
//           </Select>
//         </div>
//       )}
//     />
//   );
// }

// export default CSelectValidation;
