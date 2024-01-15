import Chart from 'react-apexcharts';

type DonationData = Array<[string, number]>;

interface IDataDonate {
  dataDonate: DonationData;
}
function ChartDonate(dataDonate: IDataDonate) {
  const labels = dataDonate?.dataDonate?.map(
    ([userEmail]: [string, number]) => {
      return userEmail;
    },
  );
  const prices = dataDonate?.dataDonate?.map(
    (price: [string, number]) => price[1],
  );

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
      data: prices,
    },
  ];

  return <Chart options={options} series={series} type='bar' height={800} />;
}

export { ChartDonate };
