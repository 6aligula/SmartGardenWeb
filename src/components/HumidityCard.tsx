import React from 'react';
import { Line } from 'react-chartjs-2';
import { Droplets } from 'lucide-react';

interface HumidityData {
  humedad: number;
  timestamp: string;
}

interface HumidityCardProps {
  data: HumidityData[];
}

const HumidityCard: React.FC<HumidityCardProps> = ({ data }) => {
  const chartData = {
    labels: data.map(d => d.timestamp),
    datasets: [
      {
        label: 'Humidity (%)',
        data: data.map(d => d.humedad),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Humidity Data',
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Droplets className="mr-2" /> Humidity
      </h2>
      <p className="text-4xl font-bold mb-2">{data[0]?.humedad.toFixed(1)}%</p>
      <Line options={chartOptions} data={chartData} />
    </div>
  );
};

export default HumidityCard;