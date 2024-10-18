import React from 'react';
import { Line } from 'react-chartjs-2';
import { Thermometer } from 'lucide-react';

interface TemperatureData {
  ultimas_temperaturas: number[];
  timestamp: string[];
  mediana: number;
}

interface TemperatureCardProps {
  data: TemperatureData | null;
}

const TemperatureCard: React.FC<TemperatureCardProps> = ({ data }) => {
  const chartData = {
    labels: data?.timestamp || [],
    datasets: [
      {
        label: 'Temperature (°C)',
        data: data?.ultimas_temperaturas || [],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
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
        text: 'Temperature Data',
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Thermometer className="mr-2" /> Temperature
      </h2>
      <p className="text-4xl font-bold mb-2">{data?.ultimas_temperaturas[0].toFixed(1)}°C</p>
      <p className="text-sm text-gray-500">Median: {data?.mediana.toFixed(1)}°C</p>
      <Line options={chartOptions} data={chartData} />
    </div>
  );
};

export default TemperatureCard;