import { Button } from '@nextui-org/button';
import { IoMdAdd } from 'react-icons/io';
import { FormProvider } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  type ModalProps,
  useDisclosure,
} from '@nextui-org/modal';
import { useParams } from 'react-router-dom';

import { useOrderForm } from '@/validations/order.validation';
import CInputValidation from '@/components/Input/CInputValidation';
import CSelectValidation from '@/components/Select/CSelectValidation';
import { useListUser } from '@/apis/config.api';
import { useAddOrder } from '@/features/Order/apis/order.api';
import appToast from '@/utils/toast.util';
import { useGetMenuById } from '@/apis/sheets.api';

interface IModalOrderProps extends Omit<ModalProps, 'children'> {}

function ModalOrder({ ...passProps }: IModalOrderProps) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { id } = useParams();

  const { data: menu } = useGetMenuById(String(id));
  const configData = useListUser();
  const { mutate: addOrder, isLoading: isLoadingOrder } = useAddOrder();

  const methods = useOrderForm();

  const { handleSubmit, reset } = methods;

  const submitHandler = handleSubmit((values) => {
    addOrder(
      {
        ...values,
        id: uuidv4(),
        menuId: String(id),
        price: menu?.price ? String(menu?.price) : '',
      },
      {
        onSuccess() {
          appToast({
            type: 'success',
            props: {
              text: 'Order thành công!',
            },
          });
          reset({});
          onClose();
        },
        onError() {
          appToast({
            type: 'error',
            props: {
              text: 'Order thất bại, thử lại dùm nhóa!',
            },
          });
        },
      },
    );
  });

  return (
    <div className='mb-2'>
      <div className='flex justify-end'>
        <Button radius='full' onPress={onOpen} startContent={<IoMdAdd />}>
          Thêm
        </Button>
      </div>
      <Modal
        size='3xl'
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        {...passProps}
      >
        <ModalContent>
          <ModalHeader className='flex flex-col gap-1'>
            Form đặt cơm
          </ModalHeader>
          <ModalBody>
            <FormProvider {...methods}>
              <form onSubmit={submitHandler}>
                <CSelectValidation
                  isRequired
                  label='Tên người đặt'
                  name='name'
                  id='name'
                  options={configData.data || []}
                />

                <CInputValidation
                  isRequired
                  label='Tên món ăn'
                  name='foodName'
                  id='foodName'
                />

                <CInputValidation
                  isDisabled
                  value={String(menu?.price)}
                  label='Giá tiền'
                  placeholder={
                    !menu?.price ? 'Giá tiền sẽ được cập nhật sau' : ''
                  }
                  name='price'
                  id='price'
                />

                <CSelectValidation
                  isRequired
                  label='Trạng thái thanh toán'
                  name='status'
                  id='status'
                  options={[
                    {
                      label: 'Đã thanh toán',
                      value: 'TRUE',
                    },
                    {
                      label: 'Chưa thanh toán',
                      value: 'FALSE',
                    },
                  ]}
                />

                <div className='flex justify-end gap-1'>
                  <Button variant='light' onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    isLoading={isLoadingOrder}
                    disabled={isLoadingOrder}
                    type='submit'
                    color='primary'
                    startContent={<IoMdAdd />}
                  >
                    Thêm
                  </Button>
                </div>
              </form>
            </FormProvider>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ModalOrder;
