import { type ApexOptions } from 'apexcharts';

export const priceMissingChartOptions = ({
  id,
  height = '100%',
  chartColor,
  chartLabel,
  valueFormatter,
}: {
  id: string;
  height?: number | '100%';
  chartColor?: string[];
  valueFormatter?: (value: number) => string;
  chartLabel?: string;
}): ApexOptions => {
  const options: ApexOptions = {
    chart: {
      height,
      id,
      animations: {
        enabled: true,
      },
      toolbar: {
        show: false,
        autoSelected: undefined,
      },
      background: '#fff',
      events: {
        mounted: (chart) => {
          chart.windowResizeHandler();
        },
      },
    },
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 0,
          size: '45%',
        },
        dataLabels: {
          total: {
            show: true,
            label: chartLabel,
            fontSize: '25px',
          },
        },
      },
    },
    dataLabels: {
      enabledOnSeries: [0, 1],
      formatter: valueFormatter,
      style: {
        colors: [chartColor],
      },
    },
    stroke: {
      lineCap: 'round',
    },
    legend: {
      show: false,
    },
  };

  return options;
};
