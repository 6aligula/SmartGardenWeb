import React from 'react';
import { Line } from 'react-chartjs-2';
import { Sprout } from 'lucide-react';

interface SoilMoistureData {
  humedad_tierra: number;
  timestamp: string;
}

interface SoilMoistureCardProps {
  data: SoilMoistureData[];
}

const SoilMoistureCard: React.FC<SoilMoistureCardProps> = ({ data }) => {
  const chartData = {
    labels: data.map(d => d.timestamp),
    datasets: [
      {
        label: 'Soil Moisture (%)',
        data: data.map(d => d.humedad_tierra),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
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
        text: 'Soil Moisture Data',
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Sprout className="mr-2" /> Soil Moisture
      </h2>
      <p className="text-4xl font-bold mb-2">{data[0]?.humedad_tierra.toFixed(1)}%</p>
      <Line options={chartOptions} data={chartData} />
    </div>
  );
};

export default SoilMoistureCard;