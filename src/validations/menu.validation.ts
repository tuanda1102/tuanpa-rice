import * as Yup from 'yup';

export const menuSchema = Yup.object().shape({
  title: Yup.string().required('Nhập tên menu này!'),
  // image: Yup.mixed<FileList>()
  //   .test(
  //     'image',
  //     'Up ảnh bé bé thui =))), cỡ 150kb trở lại đồ đó.',
  //     // eslint-disable-next-line func-names
  //     function (files) {
  //       const { image } = this.parent;
  //       if (image !== undefined && typeof image !== 'string') {
  //         if (!files?.length) return true; // Không validate trong trường hợp không upload file
  //         return files[0].size <= 150000; // 150kb
  //       }
  //       return true;
  //     },
  //   )
  //   .nullable(),
  // price: Yup.number()
  //   .min(0, 'Giá phải lớn hơn 0 nghe!')
  //   .when('isSamePrice', {
  //     is: (isSamePrice: boolean) => isSamePrice === true,
  //     then: () => Yup.number().required('Vui lòng nhập số tiền'),
  //     otherwise: () => Yup.number().nullable(),
  //   })
  //   .nullable(),
  // priceSale: Yup.number()
  //   .min(0, 'Giá phải lớn hơn 0 nghe!')
  //   .when('price', {
  //     is: (price: number) => price !== null,
  //     then: (priceSchema) =>
  //       priceSchema.test(
  //         'is-less-than-price',
  //         'Giá sale phải nhỏ hơn giá gốc',
  //         // eslint-disable-next-line func-names
  //         function (priceSale) {
  //           const { price } = this.parent;
  //           return priceSale !== undefined && priceSale < price;
  //         },
  //       ),
  //     otherwise: () => Yup.number().nullable(),
  //   })
  //   .nullable(),
  menuLink: Yup.string().nullable(),
});
