import * as Yup from 'yup';

export const menuEditSchema = Yup.object().shape({
  title: Yup.string().required('Nhập tên menu này!'),
  image: Yup.string().nullable(),
  price: Yup.number()
    .min(0, 'Giá phải lớn hơn 0 nghe!')
    .when('isSamePrice', {
      is: (isSamePrice: boolean) => isSamePrice === true,
      then: () => Yup.number().required('Price is required'),
      otherwise: () => Yup.number().nullable(),
    })
    .nullable(),
  priceSale: Yup.number()
    .min(0, 'Giá phải lớn hơn 0 nghe!')
    .when('price', {
      is: (price: number) => price !== null,
      then: (priceSchema) =>
        priceSchema.test(
          'is-less-than-price',
          'Giá sale phải nhỏ hơn giá gốc',
          // eslint-disable-next-line func-names
          function (priceSale) {
            const { price } = this.parent;
            return priceSale !== undefined && priceSale < price;
          },
        ),
      otherwise: () => Yup.number().nullable(),
    })
    .nullable(),
  menuLink: Yup.string().nullable(),
});
