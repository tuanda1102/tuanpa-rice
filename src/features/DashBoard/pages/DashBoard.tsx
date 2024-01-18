import { Card, CardBody } from '@nextui-org/react';
import PriceMissingChart from '@/features/DashBoard/components/Chart/MoneyMissChart';
import { useGetAllOrders } from '@/apis/order.api';
import { type IOrder } from '@/types/order';
import MoneyMissingTable from '../components/Table/MoneyMissingTable';

export default function DashBoard() {
  const { allOrders, isLoading } = useGetAllOrders();

  const allOrderMissing = allOrders.filter(
    (item: IOrder) => item.status === false,
  );
  return (
    <div>
      <div className='grid grid-cols-2 gap-x-5'>
        <Card>
          <CardBody>
            <PriceMissingChart
              allOrderMissing={allOrderMissing}
              allOrders={allOrders}
              isLoading={isLoading}
            />
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <MoneyMissingTable
              allOrderMissing={allOrderMissing}
              isLoading={isLoading}
            />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
