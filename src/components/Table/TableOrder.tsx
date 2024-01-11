import {
  Table,
  TableBody,
  TableColumn,
  TableHeader,
  TableRow,
  type TableProps,
  TableCell,
  Divider,
  Spinner,
  Chip,
  useDisclosure,
  Modal,
  ModalBody,
  ModalHeader,
  Button,
  ModalContent,
  Checkbox,
  cn,
} from '@nextui-org/react';
import { Controller, FormProvider } from 'react-hook-form';
import { FaRegEdit } from 'react-icons/fa';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { FcReuse } from 'react-icons/fc';
import { useState } from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import { useQueryClient } from '@tanstack/react-query';

import useSearchParamsCustom from '@/hooks/useSearchParamsCustom';
import { type INewFeedsSearchParams } from '@/features/NewFeeds/types/newFeeds';
import {
  useDeleteOrderById,
  useGetOrderedListById,
  useUpdateOder,
} from '@/apis/order.api';
import { type IOrder } from '@/types/order';
import appToast from '@/utils/toast.util';
import { useFormWithYupSchema } from '@/hooks/useYupValidationResolver';
import { orderSchema } from '@/features/NewFeeds/validations/order.validation';

import CInputValidation from '@/components/Input/CInputValidation';
import CNumberInput from '@/components/Input/CNumberInput';
import { useFetchUser } from '@/apis/user.api';

const defaultValues = {
  foodName: '',
  price: '',
  status: false,
};

function TableOrder({ ...passProps }: TableProps) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [orderDelete, setOrderDelete] = useState<IOrder | undefined>(undefined);
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [valueOrderEdit, setValueOderEdit] = useState<IOrder | undefined>(
    undefined,
  );

  const queryClient = useQueryClient();
  const { authUser } = useFetchUser();
  const { menuId } = useSearchParamsCustom<Partial<INewFeedsSearchParams>>();
  const updateUser = useUpdateOder();
  const { isLoading: isLoadingUpdateOrder } = useUpdateOder();

  const { orderedList, isLoading } = useGetOrderedListById(menuId as string);
  const deleteOrderMutation = useDeleteOrderById();
  const methods = useFormWithYupSchema(orderSchema, {
    defaultValues,
    values: {
      foodName: valueOrderEdit?.foodName,
      price: valueOrderEdit?.price,
      status: valueOrderEdit?.status,
    },
  });
  const { control, handleSubmit, reset } = methods;

  const handleEditOder = (ordered: IOrder) => {
    setIsModalEdit(true);
    setValueOderEdit(ordered);
  };

  const submitHandlerUpdateOder = handleSubmit((values) => {
    const idUser = valueOrderEdit?.id;
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
            setIsModalEdit(false);
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

  const handleDeleteOrder = () => {
    deleteOrderMutation.mutate(
      {
        menuId: menuId as string,
        orderId: orderDelete?.id as string,
      },
      {
        onSuccess() {
          queryClient.invalidateQueries(['get-menu-by-id', menuId]);
          appToast({
            type: 'success',
            props: {
              text: 'Xóa thành công!',
            },
          });
          onClose();
        },
        onError() {
          appToast({
            type: 'error',
            props: {
              text: 'Xóa thất bại, vui lòng thử lại!',
            },
          });
        },
      },
    );
  };

  if (!menuId) {
    return (
      <div className='w-full h-full flex gap-3 items-center justify-center'>
        <HiOutlineShoppingCart size={40} />
        <Divider className='h-[60px]' orientation='vertical' />
        Vui lòng chọn Menu để đặt món
      </div>
    );
  }
  const modalEdit = () => {
    return (
      <Modal
        isOpen={isModalEdit}
        onClose={() => {
          setIsModalEdit(false);
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
                  disabled={isLoadingUpdateOrder}
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
  };

  const modalDelete = () => {
    return (
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={() => {
          setOrderDelete(undefined);
        }}
      >
        <ModalContent>
          <ModalHeader>
            Bạn có chắc chắn muốn đơn
            <span className='mx-2 italic text-primary'>
              {orderDelete?.foodName}
            </span>
            !
          </ModalHeader>
          <ModalBody>
            <div className='flex items-center justify-end gap-2'>
              <Button onClick={onOpen}>Hủy</Button>
              <Button
                isLoading={deleteOrderMutation.isLoading}
                disabled={deleteOrderMutation.isLoading}
                color='danger'
                onClick={() => {
                  handleDeleteOrder();
                }}
              >
                Xóa
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  };

  return (
    <>
      <Table
        isHeaderSticky
        shadow='none'
        aria-label='table-order'
        classNames={{
          base: 'overflow-y-scroll',
        }}
        {...passProps}
      >
        <TableHeader>
          <TableColumn width={80}>STT</TableColumn>
          <TableColumn width={230}>Tên người dùng</TableColumn>
          <TableColumn>Tên món</TableColumn>
          <TableColumn className='text-right'>Giá tiền</TableColumn>
          <TableColumn width={140} className='text-center'>
            Trạng thái thanh toán
          </TableColumn>
          <TableColumn width={120} className='text-end'>
            Actions
          </TableColumn>
        </TableHeader>

        <TableBody
          loadingContent={<Spinner label='Loading...' />}
          isLoading={isLoading}
          emptyContent={
            !isLoading ? (
              <div className='flex flex-col items-center'>
                <FcReuse size={80} />
                Chưa có ai đặt cả =))))
              </div>
            ) : (
              ''
            )
          }
          items={orderedList || []}
        >
          {orderedList?.length
            ? orderedList.map((ordered, index) => (
                <TableRow key={ordered.id}>
                  <TableCell>{index + 1}</TableCell>

                  <TableCell>{ordered.userEmail}</TableCell>

                  <TableCell>{ordered.foodName}</TableCell>
                  <TableCell className='text-right'>
                    {ordered.price || '-'}
                  </TableCell>
                  <TableCell className='text-center'>
                    <Chip
                      className='capitalize min-w-[120px]'
                      color={ordered.status ? 'success' : 'danger'}
                      size='sm'
                      variant='flat'
                    >
                      {ordered.status ? 'Đã thanh toán' : 'Nợ'}
                    </Chip>
                  </TableCell>
                  <TableCell className='text-end '>
                    <Button
                      onClick={() => handleEditOder(ordered)}
                      isIconOnly
                      className='mr-2'
                    >
                      <FaRegEdit size={22} />
                    </Button>
                    <Button
                      onClick={() => {
                        onOpen();
                        setOrderDelete(ordered);
                      }}
                      isIconOnly
                      color='danger'
                      variant='flat'
                    >
                      <MdDeleteOutline size={22} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            : []}
        </TableBody>
      </Table>
      {modalEdit()}
      {modalDelete()}
    </>
  );
}

export default TableOrder;
