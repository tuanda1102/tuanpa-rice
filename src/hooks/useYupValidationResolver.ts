import { yupResolver } from '@hookform/resolvers/yup';
import type * as Yup from 'yup';
import {
  type UseFormProps,
  type UseFormReturn,
  useForm,
  type Resolver,
} from 'react-hook-form';

// Hook này sử dụng khi mình đã viết Schema sẵn, và sẽ truyền thằng Schema vào luôn
/**
 * const formSchema = yup.object().shape({
 *  quantity: yup.number().min(props.minQuantityDynamic)
 * })
 * const MyComponent: React.FC = () => {
 *  const { register } = useFormWithYupSchema(formSchema, {
 *  defaultValue: {...}
 * });
 *  .... Code ....
 * }
 * @param schema  Schema được tạo bằng Yup
 * @returns  Return về các giá trị giống như useForm
 */
export function useFormWithYupSchema<T extends Record<string, string>>(
  schema: any,
  useFormProps?: UseFormProps<Yup.Asserts<any>>,
): UseFormReturn<Yup.Asserts<any>> {
  return useForm<T>({
    ...useFormProps,
    resolver: yupResolver(schema) as unknown as Resolver<T, any> | undefined,
  });
}
