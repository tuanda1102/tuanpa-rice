import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/table';
import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spinner,
  useDisclosure,
  type TableProps,
} from '@nextui-org/react';
import { FcReuse } from 'react-icons/fc';
import { useParams } from 'react-router-dom';
import {
  MdMoreVert,
  MdOutlineDeleteOutline,
  MdOutlineEdit,
} from 'react-icons/md';
import { useState } from 'react';

import ModalOrder from '@/features/Order/components/Modal/ModalOrder';
import { useOrderDetail } from '@/apis/sheets.api';
import { useDeleteOrder } from '@/features/Order/apis/order.api';
import { type IOrder } from '@/types/order';

interface ITableOrderProps extends TableProps {}

function TableOrder({ ...passProps }: ITableOrderProps) {
  const { id } = useParams<{ id: string }>();
  const [orderEditData, setOrderEditData] = useState<IOrder | undefined>(
    undefined,
  );
  const disclosureActions = useDisclosure();
  const { data, isLoading } = useOrderDetail(id as string);
  const deleteOrder = useDeleteOrder();

  return (
    <>
      <ModalOrder
        disclosureActions={disclosureActions}
        editData={orderEditData}
      />
      <Table
        isHeaderSticky
        selectionMode='single'
        aria-label='Example static collection table'
        {...passProps}
      >
        <TableHeader>
          <TableColumn>STT</TableColumn>
          <TableColumn>Tên người đặt</TableColumn>
          <TableColumn>Tên món</TableColumn>
          <TableColumn>Giá</TableColumn>
          <TableColumn>Thanh toán</TableColumn>
          <TableColumn className='text-right'>Actions</TableColumn>
        </TableHeader>
        <TableBody
          loadingContent={<Spinner label='Loading...' />}
          isLoading={isLoading || deleteOrder.isLoading}
          emptyContent={
            !isLoading ? (
              <div className='flex flex-col items-center'>
                <FcReuse size={80} />
                Chưa cóa ai đặt cả =)))))
              </div>
            ) : (
              ''
            )
          }
          items={data}
        >
          {data?.length
            ? data.map((orderItem, index) => (
                <TableRow key={orderItem.id}>
                  <TableCell width={80}>{index + 1}</TableCell>
                  <TableCell width={200}>{orderItem.name as string}</TableCell>
                  <TableCell>{orderItem.foodName}</TableCell>
                  <TableCell width={210}>{orderItem.price}</TableCell>
                  <TableCell width={150}>
                    {orderItem.status === 'TRUE' ? (
                      <Chip
                        color='success'
                        className='capitalize'
                        variant='flat'
                      >
                        Đã thanh toán
                      </Chip>
                    ) : (
                      <Chip
                        color='danger'
                        className='capitalize'
                        variant='flat'
                      >
                        Nợ
                      </Chip>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className='relative flex justify-end items-center gap-2'>
                      <Dropdown placement='bottom-end'>
                        <DropdownTrigger>
                          <Button isIconOnly variant='light'>
                            <MdMoreVert size={18} />
                          </Button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label='Menu actions'>
                          <DropdownItem
                            onPress={() => {
                              setOrderEditData(orderItem);
                              disclosureActions.onOpen();
                            }}
                            startContent={<MdOutlineEdit />}
                          >
                            Edit
                          </DropdownItem>
                          <DropdownItem
                            color='danger'
                            startContent={<MdOutlineDeleteOutline />}
                            onPress={() => {
                              deleteOrder.mutate(orderItem.id);
                            }}
                          >
                            Delete
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
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
