import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

const menuSchema = Yup.object().shape({
  title: Yup.string().required('Nhập tên menu này!'),
  image: Yup.mixed<FileList>().test(
    'fileSize',
    'Up ảnh bé bé thui =))), cỡ 150kb trở lại đồ đó.',
    (files) => {
      if (!files?.length) return true; // Không validate trong trường hợp không upload file
      return files[0].size <= 150000; // 150kb
    },
  ),
  price: Yup.number(),
  menuLink: Yup.string(),
});

export const useMenuForm = () => {
  return useForm({
    defaultValues: {
      image: undefined,
      title: '',
      price: undefined,
    },
    mode: 'onChange',
    resolver: yupResolver(menuSchema),
  });
};
