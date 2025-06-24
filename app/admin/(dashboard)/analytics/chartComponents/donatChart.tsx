'use client';

import { 
  Chart as ChartJS, 
  ArcElement,
  Title, 
  Tooltip, 
  Legend
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export function DoughnutChart({ data }: { data: any }) {
  return (
    <Doughnut
      data={data}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
          },
        },
      }}
    />
  );
}