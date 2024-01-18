import ReactApexChart from 'react-apexcharts';
import { type IDataChart } from '@/types/donates';

function ChartDonate({ labels, prices }: IDataChart) {
  const options = {
    chart: {
      id: 'bar',
    },
    colors: [
      '#33b2df',
      '#546E7A',
      '#d4526e',
      '#13d8aa',
      '#A5978B',
      '#2b908f',
      '#f9a3a4',
      '#90ee7e',
      '#f48024',
      '#69d2e7',
    ],
    plotOptions: {
      bar: {
        distributed: true,
      },
    },
    xaxis: {
      categories: labels,
    },
  };

  const series = [
    {
      name: 'Ranking Donate',
      data: prices || [0, 0],
    },
  ];

  return (
    <ReactApexChart
      options={options}
      series={series}
      type='bar'
      height={500}
      className='w-full'
    />
  );
}

export { ChartDonate };
