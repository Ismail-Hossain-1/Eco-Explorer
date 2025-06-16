'use client';

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ scores }) => {
  if (!scores || scores.length === 0) return <p>No score data to display.</p>;

  const labels = scores.map(score => new Date(score.inserted_at).toLocaleDateString());
  const data = {
    labels,
    datasets: [
      {
        label: 'Test Scores',
        data: scores.map(score => score.testscore),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Your Test History' },
    },
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;
