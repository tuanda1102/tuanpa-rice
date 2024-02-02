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
import { CiEdit } from 'react-icons/ci';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { FcReuse } from 'react-icons/fc';
import { useMemo, useState } from 'react';
import { MdDeleteOutline } from 'react-icons/md';

import { useFetchUser } from '@/apis/user.api';
import useSearchParamsCustom from '@/hooks/useSearchParamsCustom';
import { type INewFeedsSearchParams } from '@/features/NewFeeds/types/newFeeds';
import { useGetOrderedListById } from '@/apis/order.api';
import { type IOrder } from '@/types/order';
import ModalEditOder from '@/components/Modal/ModalEditOder';
import ModalDeleteOrder from '@/components/Modal/ModalDeleteOrder';
import { formatterPrice } from '@/utils/prices.util';

interface ITableOrder extends TableProps {
  price: number;
  priceSale: number;
  isSamePrice: boolean | undefined;
}

function TableOrder({
  price,
  priceSale,
  isSamePrice,
  ...passProps
}: ITableOrder) {
  const { menuId } = useSearchParamsCustom<Partial<INewFeedsSearchParams>>();
  const { authUser } = useFetchUser();
  const [orderDelete, setOrderDelete] = useState<IOrder | undefined>(undefined);
  const { orderedList, isLoading } = useGetOrderedListById(menuId as string);
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [isModalEdit, setIsModalEdit] = useState(false);
  const [valueOrderEdit, setValueOderEdit] = useState<IOrder | undefined>(
    undefined,
  );

  const handleDeleteOder = (ordered: IOrder) => {
    setOrderDelete(ordered);
    setIsModalDelete(true);
  };

  const handleEditOder = (ordered: IOrder) => {
    setIsModalEdit(true);
    setValueOderEdit(ordered);
  };

  const OrderList = useMemo(() => {
    const discountedPrice = (currentPrice: number): number => {
      if (isSamePrice) {
        return currentPrice;
      }

      if ((!price && !priceSale) || !price) {
        return currentPrice;
      }

      const percentSale = (priceSale / Number(price)) * 100;
      const salePrice = Number((percentSale * Number(currentPrice)) / 100);

      return Math.ceil((Number(currentPrice) - salePrice) / 1000) * 1000;
    };
    if (orderedList?.length) {
      return orderedList.map((ordered, index) => (
        <TableRow key={ordered.id}>
          <TableCell>{index + 1}</TableCell>
          <TableCell>{ordered.userEmail}</TableCell>
          <TableCell>{ordered.foodName}</TableCell>
          <TableCell className='text-right'>
            {isSamePrice
              ? formatterPrice.format(price)
              : formatterPrice.format(
                  discountedPrice(ordered.price !== null ? ordered.price : 0),
                ) || '-'}
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
              onClick={() => handleEditOder(ordered)}
              isIconOnly
              className='mr-2'
            >
              <CiEdit size={22} />
            </Button>
            {ordered.userEmail === authUser?.email ? (
              <Button
                onClick={() => {
                  handleDeleteOder(ordered);
                }}
                isIconOnly
                color='danger'
                variant='flat'
              >
                <MdDeleteOutline size={22} />
              </Button>
            ) : null}
          </TableCell>
        </TableRow>
      ));
    }
    return [];
  }, [authUser, isSamePrice, orderedList, price, priceSale]);

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
          items={OrderList}
        >
          {OrderList}
        </TableBody>
      </Table>

      <ModalEditOder
        isOpen={isModalEdit}
        editOrderUser={valueOrderEdit}
        shadow='sm'
        onClose={() => setIsModalEdit(false)}
      />
      <ModalDeleteOrder
        isOpen={isModalDelete}
        orderUserDelete={orderDelete}
        shadow='sm'
        onClose={() => setIsModalDelete(false)}
      />
    </>
  );
}

export default TableOrder;
