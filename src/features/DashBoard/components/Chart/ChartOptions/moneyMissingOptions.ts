import { type ApexOptions } from 'apexcharts';

export const priceMissingChartOptions = ({
  id,
  height = '100%',
  chartLabel,
  labelColor,
  valueFormatter,
}: {
  id: string;
  height?: number | '100%';
  chartColor?: string[];
  valueFormatter?: (value: number) => string;
  chartLabel?: string;
  labelColor: string;
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
            color: labelColor,
          },
        },
      },
    },
    dataLabels: {
      enabledOnSeries: [0, 1],
      formatter: valueFormatter,
      style: {
        colors: ['#F87171'],
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
