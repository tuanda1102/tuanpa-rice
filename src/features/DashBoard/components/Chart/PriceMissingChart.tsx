import { useId, useMemo } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Spinner } from '@nextui-org/react';
import { type IOrder } from '@/types/order';
import { formatterPrice, totalPrice } from '@/utils/function';
import { priceMissingChartOptions } from './ChartOptions/priceMissingOptions';

interface IPriceMissingProps {
  allOrders: IOrder[];
  allOrderMissing: IOrder[];
  isLoading: boolean;
}

export default function PriceMissingChart({
  allOrders,
  allOrderMissing,
  isLoading,
}: IPriceMissingProps) {
  const totalPriceMissing = -totalPrice(allOrderMissing);

  const precentMissing = useMemo(
    () =>
      100 -
      Math.round((totalPrice(allOrderMissing) / totalPrice(allOrders)) * 100),
    [allOrderMissing, allOrders],
  );

  const data = {
    id: useId(),
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
        <ReactApexChart
          options={options}
          series={[precentMissing]}
          type='radialBar'
          height={350}
        />
      )}
    </div>
  );
}
