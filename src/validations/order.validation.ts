import * as Yup from 'yup';

const orderSchema = Yup.object().shape({
  name: Yup.object().required('Chọn người muốn đặt đơn!').nullable(),
  foodName: Yup.string().required('Nhập tên món!'),
  status: Yup.object().required('Chưa có trạng thái thanh toán!').nullable(),
});

export default orderSchema;
