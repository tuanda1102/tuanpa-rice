import {
  Modal,
  ModalBody,
  Button,
  ModalContent,
  Checkbox,
  cn,
} from '@nextui-org/react';
import { Controller, FormProvider } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';

import useSearchParamsCustom from '@/hooks/useSearchParamsCustom';
import { type INewFeedsSearchParams } from '@/features/NewFeeds/types/newFeeds';
import { useUpdateOder } from '@/apis/order.api';
import appToast from '@/utils/toast.util';
import { useFormWithYupSchema } from '@/hooks/useYupValidationResolver';
import { orderSchema } from '@/features/NewFeeds/validations/order.validation';

import CInputValidation from '@/components/Input/CInputValidation';
import CNumberInput from '@/components/Input/CNumberInput';
import { useFetchUser } from '@/apis/user.api';
import { type IOrder } from '@/types/order';

const defaultValues = {
  foodName: '',
  price: '',
  status: false,
};

function ModalEditOder({
  isOpen,
  editOderUser,
  handleClose,
}: {
  isOpen: boolean;
  editOderUser?: IOrder;
  handleClose: () => void;
}) {
  const queryClient = useQueryClient();
  const { authUser } = useFetchUser();
  const { menuId } = useSearchParamsCustom<Partial<INewFeedsSearchParams>>();
  const updateUser = useUpdateOder();
  const { isLoading: isLoadingUpdateOrder } = useUpdateOder();

  const methods = useFormWithYupSchema(orderSchema, {
    defaultValues,
    values: {
      foodName: editOderUser?.foodName,
      price: editOderUser?.price,
      status: editOderUser?.status,
    },
  });
  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = methods;

  const submitHandlerUpdateOder = handleSubmit((values) => {
    const idUser = editOderUser?.id;
    if (idUser && menuId) {
      updateUser.mutate(
        {
          idUser,
          menuId,
          data: {
            userEmail: authUser?.email as string,
            foodName: values.foodName,
            status: values.status,
            price: Number(values.price) || null,
            createdAt: new Date(),
          },
        },
        {
          onSuccess() {
            queryClient.invalidateQueries(['get-menu-by-id', menuId]);
            appToast({
              type: 'success',
              props: {
                text: 'Chỉnh sửa thành công!',
              },
            });
            reset(defaultValues);
            handleClose();
          },
          onError() {
            appToast({
              type: 'error',
              props: {
                text: 'Chỉnh sửa thất bại, vui lòng thử lại!',
              },
            });
          },
        },
      );
    }
  });
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        handleClose();
      }}
    >
      <ModalContent className='p-4 bg-white dark:bg-default-100/50 max-w-[1000px]'>
        <ModalBody>
          <FormProvider {...methods}>
            <form
              onSubmit={submitHandlerUpdateOder}
              className='flex gap-2 items-start'
            >
              <CInputValidation
                classNameWrapper='mb-0 w-[360px]'
                label='Tên món'
                name='foodName'
                id='foodName'
              />

              <CNumberInput
                classNameWrapper='mb-0'
                label='Giá tiền'
                name='price'
                id='price'
              />

              <Controller
                control={control}
                name='status'
                render={({ field: { onChange, value } }) => (
                  <Checkbox
                    defaultSelected={false}
                    onChange={onChange}
                    isSelected={value}
                    classNames={{
                      base: cn(
                        'h-input min-w-[180px] w-full inline-flex bg-content2',
                        'hover:bg-content3 items-center justify-start',
                        'cursor-pointer rounded-lg gap-2 px-4 py-2 m-0 border-2 border-transparent',
                        'data-[selected=true]:border-primary',
                      ),
                      label: 'w-full',
                    }}
                  >
                    Đã thanh toán
                  </Checkbox>
                )}
              />

              <Button
                isLoading={isLoadingUpdateOrder}
                disabled={!isDirty}
                type='submit'
                className='!h-input min-w-[120px]'
              >
                Save
              </Button>
            </form>
          </FormProvider>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
export default ModalEditOder;
