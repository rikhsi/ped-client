export const pieChartOptions = {
  series: [80107, 135502, 180643, 6258, 255637],
  labels: ['Oliy toifa', 'I toifa', 'II toifa', 'Mutaxassis', 'Toifasiz xodim'],
  chart: {
    type: 'donut',
    width: 240,
    height: 240,
  },
  title: 'Jami pedagog kadrlar soni',
  states: {
    hover: {
      filter: {
        type: 'none',
      },
    },
    active: {
      filter: {
        type: 'none',
      },
    },
  },
  plotOptions: {
    pie: {
      expandOnClick: false,
      donut: {
        labels: {
          show: true,
          total: {
            show: true,
            showAlways: true,
            label: 'Jami kadrlar',
            color: '#FFFFFFB2',
          },
          name: {
            show: true,
            offsetY: 10,
            color: '#888',
            fontSize: '14px',
          },
          value: {
            show: true,
            fontSize: '20px',
            fontWeight: 700,
            color: '#000',
          },
        },
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  colors: ['#32B285', '#4B90D2', '#9250C4', '#DD6946', '#E3E6EB'],
  stroke: {
    show: true,
    width: 4,
    colors: ['#ffffff'],
  },
  legend: {
    show: false,
  },
  responsive: [
    {
      breakpoint: 1320,
      options: {
        chart: {
          width: 180,
          height: 180,
        },
        legend: {
          position: 'bottom',
        },
      },
    },
  ],
  optionData: [
    {
      icon: 'o:graduationHat',
      iconColor: '#32B285',
      bg: '#D5F5EA',
      percent: '12.2',
      title: 'Oliy toifa',
      count: 80107,
    },
    {
      icon: 'o:diploma',
      iconColor: '#4B90D2',
      bg: '#D1E6F9',
      percent: '20.6',
      title: 'I toifa',
      count: 135502,
    },
    {
      icon: 'o:diplomaVerified',
      iconColor: '#9250C4',
      bg: '#E7D5F5',
      percent: '27.4',
      title: 'II toifa',
      count: 180643,
    },
    {
      icon: 'o:userCheck',
      iconColor: '#DD6946',
      bg: '#F4D9D1',
      percent: '1.0',
      title: 'Mutaxassis',
      count: 6258,
    },
    {
      icon: 'o:userCross',
      iconColor: '#3E4967',
      bg: '#E3E6EB',
      percent: '38.8',
      title: 'Toifasiz xodim',
      count: 255637,
    },
  ],
};
