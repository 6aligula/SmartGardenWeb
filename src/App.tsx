import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import TemperatureCard from './components/TemperatureCard';
import HumidityCard from './components/HumidityCard';
import SoilMoistureCard from './components/SoilMoistureCard';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface TemperatureData {
  ultimas_temperaturas: number[];
  timestamp: string[];
  mediana: number;
  humedad: number;
}

interface HumidityData {
  humedad: number;
  timestamp: string;
}

interface SoilMoistureData {
  humedad_tierra: number;
  timestamp: string;
}

const App: React.FC = () => {
  const [temperatureData, setTemperatureData] = useState<TemperatureData | null>(null);
  const [humidityData, setHumidityData] = useState<HumidityData[]>([]);
  const [soilMoistureData, setSoilMoistureData] = useState<SoilMoistureData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tempResponse = await axios.get<TemperatureData>('http://192.168.1.243:8080/temperatura');
        const humidityResponse = await axios.get<HumidityData[]>('http://192.168.1.243:8080/humedad');
        const soilMoistureResponse = await axios.get<SoilMoistureData[]>('http://192.168.1.243:8080/humedad_tierra');

        setTemperatureData(tempResponse.data);
        setHumidityData(humidityResponse.data);
        setSoilMoistureData(soilMoistureResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); // Refresh every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Sensor Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <TemperatureCard data={temperatureData} />
        <HumidityCard data={humidityData} />
        <SoilMoistureCard data={soilMoistureData} />
      </div>
    </div>
  );
};

export default App;