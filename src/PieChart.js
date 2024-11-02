// PieChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const PieChart = ({ data }) => {
  const chartData = {
    labels: data.map((_, index) => `Row ${index + 1}`),
    datasets: [
      {
        label: 'Header 2 Values',
        data: data,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'left',
        align: 'start',
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const dataset = tooltipItem.dataset;
            const currentValue = dataset.data[tooltipItem.dataIndex];
            return ` Value: ${currentValue}`;
          },
        },
      },
      datalabels: {
        color: '#fff', // Text color for data labels
        formatter: (value) => {
          return `${value}`; // Display the raw value on each segment
        },
      },
    },
  };

  return (
    <div className="flex justify-center items-center">
      <Pie data={chartData} options={chartOptions} />
    </div>
  );
};

export default PieChart;
