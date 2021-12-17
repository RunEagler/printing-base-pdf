import ReactECharts from 'echarts-for-react';
import React from 'react';

const PieChart = () => {
  const options = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '5%',
      left: 'center',
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '20',
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: 'Javascript' },
          { value: 735, name: 'Python' },
          { value: 580, name: 'Golang' },
        ],
      },
    ],
  };
  return <ReactECharts option={options} style={{ minHeight: '100%', height: '400px' }} />;
};

export default PieChart;
