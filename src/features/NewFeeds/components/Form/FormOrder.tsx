import {
  Button,
  Card,
  CardBody,
  CardHeader,
  type CardProps,
  Checkbox,
  cn,
} from '@nextui-org/react';
import { CiEdit } from 'react-icons/ci';
import { IoAdd } from 'react-icons/io5';
import { Controller, FormProvider } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';

import CInputValidation from '@/components/Input/CInputValidation';
import CNumberInput from '@/components/Input/CNumberInput';
import { orderSchema } from '@/features/NewFeeds/validations/order.validation';
import { useAddOrder, useUpdateOrder, useMenu } from '@/apis/order.api';
import useSearchParamsCustom from '@/hooks/useSearchParamsCustom';
import { type INewFeedsSearchParams } from '@/features/NewFeeds/types/newFeeds';
import { useFetchUser } from '@/apis/user.api';
import appToast from '@/utils/toast.util';
import { useFormWithYupSchema } from '@/hooks/useYupValidationResolver';
import { type IOrder } from '@/types/order';

interface IFormOrderProps extends CardProps {}

interface IFormAddOrder extends IFormOrderProps {
  editOrderUser?: IOrder;
  price?: number;
  isSamePrice?: boolean | undefined;
  onClose?: () => void;
}

const defaultValues = {
  foodName: '',
  price: '',
  status: false,
  samePrice: false,
};
const defaultValuesSamePrice = {
  foodName: '',
  status: false,
  samePrice: true,
};

function FormOrder({
  editOrderUser,
  price,
  isSamePrice,
  onClose,
  ...passCardProps
}: IFormAddOrder) {
  const { menuId } = useSearchParamsCustom<INewFeedsSearchParams>();
  const queryClient = useQueryClient();
  const { authUser } = useFetchUser();

  const { mutate, isLoading: isLoadingAddOrder } = useAddOrder();
  const { data } = useMenu(menuId);
  const valueReset = isSamePrice ? defaultValuesSamePrice : defaultValues;
  const { isLoading: isLoadingUpdateOrder, mutate: updateOrder } =
    useUpdateOrder();

  const methods = useFormWithYupSchema(orderSchema, {
    defaultValues: {
      foodName: '',
      price: isSamePrice ? price : '',
      status: false,
      samePrice: false,
    },
    values: {
      foodName: editOrderUser?.foodName,
      price: isSamePrice ? price : editOrderUser?.price,
      status: editOrderUser?.status,
      samePrice: isSamePrice,
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = methods;

  const submitHandler = handleSubmit((values) => {
    const idOrder = editOrderUser?.id;
    if (idOrder && menuId && onClose) {
      updateOrder(
        {
          idOrder,
          menuId,
          body: {
            userEmail: authUser?.email as string,
            foodName: values.foodName,
            status: values.status,
            price: Number(values.price) || null,
            createdAt: new Date(),
          },
        },
        {
          onSuccess() {
            if (data?.isBlocked) {
              queryClient.invalidateQueries(['get-menu-by-id', menuId]);
              queryClient.invalidateQueries(['get-menu']);
              appToast({
                type: 'error',
                props: {
                  text: 'Đã hết thời gian đặt rùi!!!',
                },
              });
            } else {
              queryClient.invalidateQueries(['get-menu-by-id', menuId]);
              appToast({
                type: 'success',
                props: {
                  text: 'Chỉnh sửa thành công!',
                },
              });
              reset(valueReset);
              onClose();
            }
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
    } else {
      mutate(
        {
          menuId,
          body: {
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
                text: 'Đặt đơn thành công!',
              },
            });
            reset(valueReset);
          },
          onError() {
            appToast({
              type: 'error',
              props: {
                text: 'Đặt đơn thất bại, vui lòng thử lại!',
              },
            });
          },
        },
      );
    }
  });

  return (
    <Card
      isBlurred
      className='border-none bg-background/60 dark:bg-default-100/50 max-w-[820px]'
      shadow='sm'
      {...passCardProps}
    >
      <CardHeader>
        <div className='font-semibold'>Tiểu nhị, gọi món!</div>
      </CardHeader>
      <CardBody>
        <FormProvider {...methods}>
          <form onSubmit={submitHandler} className='flex gap-2 items-start'>
            <CInputValidation
              classNameWrapper='mb-0 w-[360px]'
              label='Tên món'
              name='foodName'
              id='foodName'
            />

            <CNumberInput
              disabled={isSamePrice}
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
            {editOrderUser && editOrderUser?.userEmail === authUser?.email ? (
              <Button
                isLoading={isLoadingUpdateOrder}
                disabled={!isDirty || isLoadingUpdateOrder}
                type='submit'
                className='!h-input min-w-[120px]'
                startContent={<CiEdit size={22} />}
              >
                Sửa
              </Button>
            ) : null}
            {editOrderUser ? null : (
              <Button
                isLoading={isLoadingAddOrder}
                disabled={isLoadingAddOrder}
                type='submit'
                className='!h-input min-w-[120px]'
                startContent={<IoAdd size={20} />}
              >
                Đặt món
              </Button>
            )}
          </form>
        </FormProvider>
      </CardBody>
    </Card>
  );
}

export default FormOrder;
