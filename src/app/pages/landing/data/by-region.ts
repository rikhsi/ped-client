import { translate } from '@jsverse/transloco';
import { BarChartOptions } from '../models/bar';

export function byRegion(data: any[], categories: string[]): BarChartOptions {
  return {
    series: [
      {
        name: translate('chart.total'),
        data: data.map((d) => d.count),
      },
    ],
    chart: {
      type: 'bar',
      height: data.length * 35, // Адаптивная высота
      toolbar: {
        show: false,
        tools: {
          download: false,
        },
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        // borderRadiusApplication: 'end',
        horizontal: true, // ← по умолчанию горизонтальный
      },
    },
    colors: ['#4B90D2'],
    xaxis: {
      categories,
      labels: {
        style: {
          fontSize: '12px',
        },
      },
    },
    yaxis: {},
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            height: 400, // можно подогнать под нужное
          },
          plotOptions: {
            bar: {
              horizontal: false, // ← на мобилке вертикальный
            },
          },
          xaxis: {},
          yaxis: {},
          dataLabels: {
            enabled: false, // ← Убираем подписи в самих барах на мобилке
          },
        },
      },
    ],
  };
}
