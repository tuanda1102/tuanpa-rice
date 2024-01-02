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
} from '@nextui-org/modal';
import { useParams } from 'react-router-dom';
import { type UseDisclosureProps } from '@nextui-org/react';
import { type Dispatch, type SetStateAction } from 'react';

import CInputValidation from '@/components/Input/CInputValidation';
import CSelectValidation from '@/components/Select/CSelectValidation';
import { useListUser } from '@/apis/config.api';
import { useAddOrder, useEditOrder } from '@/features/Order/apis/order.api';
import appToast from '@/utils/toast.util';
import { useGetMenuById } from '@/apis/sheets.api';
import { type IOrderSchema, type IOrder } from '@/types/order';
import { useFormWithYupSchema } from '@/hooks/useYupValidationResolver';
import orderSchema from '@/validations/order.validation';
import { type ISelectOptions } from '@/types/select';

interface IModalOrderProps extends Omit<ModalProps, 'children'> {
  editData?: IOrder;
  onSetEditData?: Dispatch<SetStateAction<IOrder | undefined>>;
  disclosureActions: UseDisclosureProps;
}

const defaultValues: IOrderSchema = {
  name: null,
  foodName: '',
  status: 'FALSE',
};

function ModalOrder({
  editData,
  onSetEditData,
  disclosureActions,
  ...passProps
}: IModalOrderProps) {
  const { id } = useParams();

  const { data: menu } = useGetMenuById(String(id));
  const { data: listUser } = useListUser();
  const { mutate: addOrder, isLoading: isLoadingOrder } = useAddOrder();
  const { mutate: editOrder, isLoading: isLoadingEdit } = useEditOrder();

  const methods = useFormWithYupSchema(orderSchema, {
    defaultValues,
    values: editData
      ? {
          ...editData,
          name: listUser?.find((user) => user.value === editData.name) || null,
        }
      : undefined,
  });

  const { handleSubmit, reset } = methods;

  const submitHandler = handleSubmit((values: IOrder) => {
    const userName = values.name as ISelectOptions;
    const statusCheckout = values.status as ISelectOptions;

    if (editData) {
      editOrder(
        {
          id: editData.id,
          name: userName.value,
          menuId: String(id),
          price: menu?.price ? String(menu?.price) : '',
          status: statusCheckout.value,
          foodName: values.foodName,
          isDeleted: 'FALSE',
          updatedAt: new Date(),
        },
        {
          onSuccess() {
            appToast({
              type: 'success',
              props: {
                text: 'Cập nhật thành công!',
              },
            });
            reset(defaultValues);
            if (typeof disclosureActions.onClose === 'function') {
              disclosureActions.onClose();
            }
          },
          onError() {
            appToast({
              type: 'error',
              props: {
                text: 'Cập nhật thất bại, thử lại dùm nhóa!',
              },
            });
          },
        },
      );
    } else {
      addOrder(
        {
          id: uuidv4(),
          name: userName.value,
          menuId: String(id),
          price: menu?.price ? String(menu?.price) : '',
          status: statusCheckout.value,
          foodName: values.foodName,
          isDeleted: 'FALSE',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          onSuccess() {
            appToast({
              type: 'success',
              props: {
                text: 'Order thành công!',
              },
            });
            reset(defaultValues);
            if (typeof disclosureActions.onClose === 'function') {
              disclosureActions.onClose();
            }
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
    }
  });

  return (
    <div className='mb-2'>
      <div className='flex justify-end'>
        <Button
          radius='full'
          onPress={disclosureActions.onOpen}
          startContent={<IoMdAdd />}
        >
          Thêm
        </Button>
      </div>
      <Modal
        isDismissable={false}
        size='3xl'
        isOpen={disclosureActions.isOpen}
        onOpenChange={(isOpenChange) => {
          if (!isOpenChange) {
            onSetEditData?.(undefined);
          }
        }}
        onClose={() => {
          disclosureActions.onClose?.();
          reset(defaultValues);
        }}
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
                  isClearable
                  required
                  label='Tên người đặt'
                  name='name'
                  id='name'
                  options={listUser || []}
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
                  required
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
                  <Button variant='light' onPress={disclosureActions.onClose}>
                    Close
                  </Button>
                  <Button
                    isLoading={isLoadingOrder || isLoadingEdit}
                    disabled={isLoadingOrder || isLoadingEdit}
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
