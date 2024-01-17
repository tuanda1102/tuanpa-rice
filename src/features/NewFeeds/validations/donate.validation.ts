import * as Yup from 'yup';

export const donateSchema = Yup.object().shape({
  price: Yup.number()
    .min(0, 'Vui lòng nhập lớn hơn hoặc bằng 0')
    .required('Vui lòng nhập số tiền Donate!'),
});
