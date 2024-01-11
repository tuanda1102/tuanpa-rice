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
  Button,
} from '@nextui-org/react';
import { FaRegEdit } from 'react-icons/fa';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { FcReuse } from 'react-icons/fc';
import { useState } from 'react';
import { MdDeleteOutline } from 'react-icons/md';

import useSearchParamsCustom from '@/hooks/useSearchParamsCustom';
import { type INewFeedsSearchParams } from '@/features/NewFeeds/types/newFeeds';
import { useGetOrderedListById } from '@/apis/order.api';
import { type IOrder } from '@/types/order';
import ModalEditOrder from '@/components/Modal/ModalEditOrder';
import ModalDeleteOrder from '@/components/Modal/ModalDeleteOrder';

function TableOrder({ ...passProps }: TableProps) {
  const [orderDelete, setOrderDelete] = useState<IOrder | undefined>(undefined);
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [valueOrderEdit, setValueOderEdit] = useState<IOrder | undefined>(
    undefined,
  );

  const { menuId } = useSearchParamsCustom<Partial<INewFeedsSearchParams>>();
  const { orderedList, isLoading } = useGetOrderedListById(menuId as string);

  const handleEditOrder = (ordered: IOrder) => {
    setIsModalEdit(true);
    setValueOderEdit(ordered);
  };
  const handleDeleteOrder = (ordered: IOrder) => {
    setOrderDelete(ordered);
    setIsModalDelete(true);
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
                      onClick={() => handleEditOrder(ordered)}
                      isIconOnly
                      className='mr-2'
                    >
                      <FaRegEdit size={22} />
                    </Button>
                    <Button
                      onClick={() => {
                        handleDeleteOrder(ordered);
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
      <ModalEditOrder
        isOpen={isModalEdit}
        editOrderUser={valueOrderEdit}
        handleClose={() => {
          setIsModalEdit(false);
        }}
      />
      <ModalDeleteOrder
        isOpen={isModalDelete}
        orderUserDelete={orderDelete}
        handleClose={() => {
          setIsModalDelete(false);
        }}
      />
    </>
  );
}

export default TableOrder;
