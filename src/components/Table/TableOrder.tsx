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
} from '@nextui-org/react';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { FcReuse } from 'react-icons/fc';
import { useState } from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import { useQueryClient } from '@tanstack/react-query';

import useSearchParamsCustom from '@/hooks/useSearchParamsCustom';
import { type INewFeedsSearchParams } from '@/features/NewFeeds/types/newFeeds';
import { useDeleteOrderById, useGetOrderedListById } from '@/apis/order.api';
import { type IOrder } from '@/types/order';
import appToast from '@/utils/toast.util';

function TableOrder({ ...passProps }: TableProps) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [orderDelete, setOrderDelete] = useState<IOrder | undefined>(undefined);
  const queryClient = useQueryClient();
  const { menuId } = useSearchParamsCustom<Partial<INewFeedsSearchParams>>();

  const { orderedList, isLoading } = useGetOrderedListById(menuId as string);
  const deleteOrderMutation = useDeleteOrderById();

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

  return (
    <>
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
                  <TableCell className='text-end'>
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
    </>
  );
}

export default TableOrder;
