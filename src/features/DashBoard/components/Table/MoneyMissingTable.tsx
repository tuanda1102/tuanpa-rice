import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  type TableProps,
  Spinner,
  Button,
  useDisclosure,
} from '@nextui-org/react';
import { type IOrder } from '@/types/order';
import { formatterPrice } from '@/utils/prices.util';
import ConfirmPaidModal from '@/features/DashBoard/components/Modal/ConfirmPaidModal';
import { calculateRankMissing } from '@/features/DashBoard/utils/dashBoard.util';
import { useFetchUser } from '@/apis/user.api';

interface ITableProps extends TableProps {
  allOrderMissing: IOrder[];
  isLoading: boolean;
}
function MoneyMissingTable({
  allOrderMissing,
  isLoading,
  ...passProps
}: ITableProps) {
  const { onClose, onOpen, onOpenChange, isOpen } = useDisclosure();

  const { authUser } = useFetchUser();

  const rankUserMissing = calculateRankMissing(allOrderMissing).sort(
    (a, b) => b.totalAmount - a.totalAmount,
  );

  return (
    <Table
      isHeaderSticky
      shadow='none'
      selectionMode='single'
      aria-label='table-order'
      defaultSelectedKeys={[authUser?.email as string]}
      classNames={{
        base: 'max-h-[400px] overflow-scroll',
        table: 'min-h-[450px]',
      }}
      {...passProps}
    >
      <TableHeader>
        <TableColumn width={80}>STT</TableColumn>
        <TableColumn width={230}>Tên người dùng</TableColumn>
        <TableColumn width={230}>Tổng nợ</TableColumn>
        <TableColumn width={230}>Thanh toán</TableColumn>
      </TableHeader>

      <TableBody
        loadingContent={<Spinner label='Loading...' />}
        isLoading={isLoading}
        items={rankUserMissing || []}
      >
        {rankUserMissing?.length
          ? rankUserMissing.map((ordered, index) => (
              <TableRow key={ordered.userEmail}>
                <TableCell>{index + 1}</TableCell>

                <TableCell>{ordered.userEmail}</TableCell>

                <TableCell>
                  {formatterPrice.format(ordered.totalAmount)}
                </TableCell>
                <TableCell>
                  {authUser?.email === ordered.userEmail && (
                    <>
                      <Button color='success' variant='ghost' onPress={onOpen}>
                        Thanh toán
                      </Button>
                      <ConfirmPaidModal
                        userEmail={authUser.email}
                        totalMissing={ordered.totalAmount}
                        isOpen={isOpen}
                        onOpenChange={onOpenChange}
                        onClose={onClose}
                      />
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))
          : []}
      </TableBody>
    </Table>
  );
}

export default MoneyMissingTable;
