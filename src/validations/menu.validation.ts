import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { type IMenu } from '@/types/order';

const menuSchema: Yup.ObjectSchema<
  Omit<IMenu, 'id' | 'createdAt' | 'uploadedAt' | 'isDeleted'>
> = Yup.object().shape({
  title: Yup.string().required('Nhập tên menu này!'),
  image: Yup.mixed<FileList>().test(
    'fileSize',
    'Nhập ảnh bé bé thui =)))',
    (files) => {
      if (!files?.length) return true; // Không validate trong trường hợp không upload file
      return files[0].size <= 150000; // 150kb
    },
  ),
  price: Yup.number(),
  menuLink: Yup.string(),
});

export const useMenuForm = () => {
  return useForm<Omit<IMenu, 'id'>>({
    defaultValues: {
      image: undefined,
      title: '',
      price: undefined,
    },
    mode: 'onChange',
    resolver: yupResolver(menuSchema),
  });
};
