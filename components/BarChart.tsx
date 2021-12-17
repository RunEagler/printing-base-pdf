import React from 'react';
import ReactECharts from 'echarts-for-react';

const BarChart: React.FC = () => {
  const options = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [
          120,
          {
            value: 200,
            itemStyle: {
              color: '#a90000'
            }
          },
          150,
          80,
          70,
          110,
          130
        ],
        type: 'bar'
      }
    ]
  };

  return <ReactECharts option={options} style={{ minHeight: '100%', height: '400px' }} />;
};

export default BarChart;
