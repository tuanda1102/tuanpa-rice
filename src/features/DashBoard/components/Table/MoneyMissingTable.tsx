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
} from '@nextui-org/react';
import { type IOrder } from '@/types/order';
import { formatterPrice } from '@/utils/functions..util';
import { calculateRankMissing } from '@/features/DashBoard/utils/functions.util';

interface ITableProps extends TableProps {
  allOrderMissing: IOrder[];
  isLoading: boolean;
}

export default function MoneyMissingTable({
  allOrderMissing,
  isLoading,
  ...passProps
}: ITableProps) {
  const rankUserMissing = calculateRankMissing(allOrderMissing).sort(
    (a, b) => b.totalAmount - a.totalAmount,
  );
  const handlePaidAll = () => {};
  return (
    <Table
      isHeaderSticky
      shadow='none'
      aria-label='table-order'
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
        items={allOrderMissing || []}
      >
        {allOrderMissing?.length
          ? rankUserMissing.map((ordered, index) => (
              <TableRow key={ordered.id}>
                <TableCell>{index + 1}</TableCell>

                <TableCell>{ordered.userEmail}</TableCell>

                <TableCell>
                  {formatterPrice.format(ordered.totalAmount)}
                </TableCell>
                <TableCell>
                  <Button color='success' onClick={handlePaidAll}>
                    Thanh toán
                  </Button>
                </TableCell>
              </TableRow>
            ))
          : []}
      </TableBody>
    </Table>
  );
}
