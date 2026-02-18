import {
  ApexAxisChartSeries,
  ApexChart,
  ApexPlotOptions,
  ApexResponsive,
  ApexXAxis,
  ApexYAxis,
} from 'ng-apexcharts';

export type BarChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  plotOptions: ApexPlotOptions;
  colors: string[];
  responsive: ApexResponsive[];
};
