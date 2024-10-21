// src/components/FinancialLineChart.tsx
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

interface LineChartProps {
  name: string;
}
const LineChart: React.FC<LineChartProps> = ({ name }) => {

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [closingPrices, setClosingPrices] = useState<number[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    price: "",
  });

  useEffect(() => {
    const fetchClosingPrices = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${name}/ohlc?vs_currency=inr&days=7`
        );
        const prices = response.data.map((item: any) => item[4]); // Closing prices
        const fetchedDates = response.data.map((item: any) =>
          new Date(item[0]).toLocaleDateString()
        ); // Dates
        setClosingPrices(prices);
        setDates(fetchedDates);
        drawChart(prices, fetchedDates);
      } catch (error) {
        console.error("Error fetching closing prices:", error);
      }
    };

    fetchClosingPrices();
  }, []);

  const drawChart = (data: number[], fetchedDates: string[]) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    // const ctx: CanvasRenderingContext2D | null = canvas?.getContext("2d");

    const width = canvas.width;
    const height = canvas.height;
    const margin = 50;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, width, height);

    // Determine the scale
    const maxPrice = Math.max(...data);
    const minPrice = Math.min(...data);
    const priceRange = maxPrice - minPrice;

    // Draw grid
    ctx.strokeStyle = "#e0e0e0"; // Grid color
    ctx.lineWidth = 1;

    for (let i = 0; i <= 5; i++) {
      const yPos =
        height -
        margin -
        ((priceRange * (i / 5)) / priceRange) * (height - margin * 2);
      ctx.beginPath();
      ctx.moveTo(margin, yPos);
      ctx.lineTo(width - margin, yPos);
      ctx.stroke();
    }

    // Draw the line
    ctx.lineWidth = 2;

    // Draw line segments with color changes based on price trends
    for (let index = 0; index < data.length - 1; index++) {
      const x1 = margin + index * ((width - margin * 2) / (data.length - 1));
      const y1 =
        height -
        margin -
        ((data[index] - minPrice) / priceRange) * (height - margin * 2);
      const x2 =
        margin + (index + 1) * ((width - margin * 2) / (data.length - 1));
      const y2 =
        height -
        margin -
        ((data[index + 1] - minPrice) / priceRange) * (height - margin * 2);

      ctx.strokeStyle = data[index + 1] > data[index] ? "green" : "red"; // Set line color based on price trend
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      // Draw points at highs and lows
      ctx.fillStyle = data[index + 1] > data[index] ? "green" : "red"; // Set point color based on price trend
      ctx.beginPath();
      ctx.arc(x2, y2, 4, 0, Math.PI * 2); // Draw point at each price
      ctx.fill();
    }

    // Draw Y-axis (prices)
    ctx.textAlign = "right";
    ctx.fillStyle = "black"; // Color for the price labels

    for (let i = 0; i <= 5; i++) {
      const priceLabel = (minPrice + priceRange * (i / 5)).toFixed(2);
      const priceLabelNumber = parseFloat(priceLabel);
      const yPos =
        height -
        margin -
        ((priceLabelNumber - minPrice) / priceRange) * (height - margin * 2);
      ctx.fillText(priceLabel, margin - 10, yPos);
    }

    // Draw X-axis (dates) at the bottom of the chart vertically
    ctx.textAlign = "center";
    const barWidth = (width - margin * 2) / (fetchedDates.length - 1); // Width of each date label
    fetchedDates.forEach((date, index) => {
      const x = margin + index * barWidth; // Calculate x position for each date
      ctx.save(); // Save the current state
      ctx.translate(x, height - margin + 25); // Move to x position at the bottom of the chart
      ctx.rotate(-Math.PI / 2); // Rotate the context to write vertically
      ctx.fillText(date, 0, 0); // Display date
      ctx.restore(); // Restore the original state
    });

    // Draw tooltip if visible
    if (tooltip.visible) {
      ctx.fillStyle = "white";
      ctx.fillRect(tooltip.x, tooltip.y - 30, 80, 25);
      ctx.strokeStyle = "black";
      ctx.strokeRect(tooltip.x, tooltip.y - 30, 80, 25);
      ctx.fillStyle = "black";
      ctx.fillText(tooltip.price, tooltip.x + 10, tooltip.y - 10);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const x = e.clientX - canvas.getBoundingClientRect().left;
    const barWidth = (canvas.width - 50 * 2) / (closingPrices.length - 1);

    let found = false;
    for (let index = 0; index < closingPrices.length; index++) {
      const barX = 50 + index * barWidth;
      if (x >= barX - barWidth / 2 && x <= barX + barWidth / 2) {
        const price = closingPrices[index]; // Display closing price on hover
        setTooltip({
          visible: true,
          x: barX + barWidth / 2 - 40,
          y: e.clientY - canvas.getBoundingClientRect().top,
          price: `$${price.toFixed(2)}`,
        });
        found = true;
        break;
      }
    }
    if (!found) {
      setTooltip({ ...tooltip, visible: false }); // Hide tooltip if not hovering over a price point
    }

    drawChart(closingPrices, dates);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">
        {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()} Line Chart
        (Last 7 Days)
      </h2>
      <canvas
        ref={canvasRef}
        width={800}
        height={400}
        onMouseMove={handleMouseMove}
      />
    </div>
  );
};

export default LineChart;
