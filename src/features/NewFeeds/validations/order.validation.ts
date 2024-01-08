import * as Yup from 'yup';

export const orderSchema = Yup.object().shape({
  foodName: Yup.string().required('Vui lòng nhập tên món!'),
  status: Yup.boolean(),
  price: Yup.string().nullable(),
});
