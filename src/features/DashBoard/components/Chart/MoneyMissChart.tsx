import { useId, useMemo } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Card, CardBody, Spinner } from '@nextui-org/react';
import { type IOrder } from '@/types/order';
import { formatterPrice } from '@/utils/prices.util';
import { totalPrice } from '@/features/DashBoard/utils/dashBoard.util';
import { priceMissingChartOptions } from './ChartOptions/moneyMissingOptions';
import { useGetAllOrders } from '@/apis/order.api';

export default function PriceMissingChart() {
  const { allOrders, isLoading } = useGetAllOrders();

  const allOrderMissing = allOrders.filter(
    (item: IOrder) => item.status === false,
  );

  const totalPriceMissing = useMemo(
    () => -totalPrice(allOrderMissing),
    [allOrderMissing],
  );

  const precentPaid = useMemo(
    () =>
      Math.round((totalPrice(allOrderMissing) / totalPrice(allOrders)) * 100),
    [allOrderMissing, allOrders],
  );

  const data = {
    id: useId(),
    labelColor: '#94A3B8',
    chartLabel: String(formatterPrice.format(totalPriceMissing)),
  };
  const options = priceMissingChartOptions(data);

  return (
    <div>
      {isLoading ? (
        <Spinner
          className='flex items-center h-[430px] my-auto'
          label='Loading...'
        />
      ) : (
        <Card>
          <CardBody>
            <h2 className='text-center font-[500] text-2xl m-0 '>
              Số tiền còn thiếu để sinh tồn!!!
            </h2>
            <ReactApexChart
              options={options}
              series={[precentPaid]}
              type='radialBar'
              height={350}
            />
            <div className='flex items-center justify-center gap-x-5'>
              <div className='flex items-center gap-x-3'>
                <span className='w-5 rounded-full h-5 bg-[#008FFB]' />
                <span>Tiền đã thanh toán</span>
              </div>
              <div className='flex items-center gap-x-3'>
                <span className='w-5 rounded-full h-5 border  bg-[#F2F2F2]' />
                <span>Tiền chưa thanh toán</span>
              </div>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
}
