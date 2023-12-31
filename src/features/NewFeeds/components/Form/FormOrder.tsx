import {
  Button,
  Card,
  CardBody,
  CardHeader,
  type CardProps,
  Checkbox,
  cn,
} from '@nextui-org/react';
import { IoAdd } from 'react-icons/io5';
import { Controller, FormProvider } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';

import CInputValidation from '@/components/Input/CInputValidation';
import CNumberInput from '@/components/Input/CNumberInput';
import { orderSchema } from '@/features/NewFeeds/validations/order.validation';
import { useAddOrder } from '@/apis/order.api';
import useSearchParamsCustom from '@/hooks/useSearchParamsCustom';
import { type INewFeedsSearchParams } from '@/features/NewFeeds/types/newFeeds';
import { useFetchUser } from '@/apis/user.api';
import appToast from '@/utils/toast.util';
import { useFormWithYupSchema } from '@/hooks/useYupValidationResolver';

interface IFormOrderProps extends CardProps {}

const defaultValues = {
  foodName: '',
  price: '',
  status: false,
};

function FormOrder({ ...passCardProps }: IFormOrderProps) {
  const { menuId } = useSearchParamsCustom<INewFeedsSearchParams>();
  const queryClient = useQueryClient();
  const { authUser } = useFetchUser();
  const { mutate, isLoading: isLoadingAddOrder } = useAddOrder();
  const methods = useFormWithYupSchema(orderSchema, { defaultValues });

  const { control, handleSubmit, reset } = methods;

  const submitHandler = handleSubmit((values) => {
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
          reset(defaultValues);
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
              isLoading={isLoadingAddOrder}
              disabled={isLoadingAddOrder}
              type='submit'
              className='!h-input min-w-[120px]'
              startContent={<IoAdd size={20} />}
            >
              Đặt món
            </Button>
          </form>
        </FormProvider>
      </CardBody>
    </Card>
  );
}

export default FormOrder;
