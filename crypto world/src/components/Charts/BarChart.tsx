import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  name: string;
}

interface OhlcData {
  open: number;
  high: number;
  low: number;
  close: number;
}

const BarChart: React.FC<BarChartProps> = ({ name }) => {
  // const BarChart = ({ name }: any) => {
  const [ohlcData, setOhlcData] = useState<OhlcData[]>([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    async function fetchOhlcData() {
      try {
        // Updated URL with valid 'vs_currency' and 'days' parameter
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${name}/ohlc?vs_currency=inr&days=7`
        );
        const data = response.data;

        // Extracting OHLC and labels from response
        const ohlc = data.map((item: any) => ({
          open: item[1],
          high: item[2],
          low: item[3],
          close: item[4],
        }));
        const dateLabels = data.map((item: any) =>
          new Date(item[0]).toLocaleDateString()
        );

        setOhlcData(ohlc);
        setLabels(dateLabels);
      } catch (error) {
        console.error("Error fetching OHLC data:", error);
      }
    }

    fetchOhlcData();
  }, []);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Open",
        data: ohlcData.map((item) => item.open),
        backgroundColor: "rgba(0, 123, 255, 0.6)",
      },
      {
        label: "High",
        data: ohlcData.map((item) => item.high),
        backgroundColor: "rgba(40, 167, 69, 0.6)",
      },
      {
        label: "Low",
        data: ohlcData.map((item) => item.low),
        backgroundColor: "rgba(220, 53, 69, 0.6)",
      },
      {
        label: "Close",
        data: ohlcData.map((item) => item.close),
        backgroundColor: "rgba(255, 193, 7, 0.6)",
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">
        {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()} Bar Chart
        (Last 15 Days)
      </h2>
      <Bar data={chartData} />
    </div>
  );
};

export default BarChart;
