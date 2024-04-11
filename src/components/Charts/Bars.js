import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
  scales: {
    x: {
      grid: {
        display: false, // Remove x-axis grid lines
      },
    },
    y: {
      grid: {
        display: false, // Remove y-axis grid lines
      },
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 700 })),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      barThickness: 20, // Adjust bar thickness as needed
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 700 })),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      barThickness: 20, // Adjust bar thickness as needed
    },
  ],
};

export default function Bars() {
  return <Bar options={options} data={data} />;
}
