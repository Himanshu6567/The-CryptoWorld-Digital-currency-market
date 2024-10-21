import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

interface CandlestickChartProps {
  name: string;
}

interface OhlcData {
  time: Date;
  open: number;
  high: number;
  low: number;
  close: number;
}

const CandlestickChart: React.FC<CandlestickChartProps> = ({ name }) => {
  console.log("Name from OHLC Chart", name, typeof name);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [ohlcData, setOhlcData] = useState<OhlcData[]>([]);
  const [zoomFactor, setZoomFactor] = useState(1);
  // const [offsetX, setOffsetX] = useState(0);
  const offsetX = 0;
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    price: "",
  });

  useEffect(() => {
    const fetchOhlcData = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${name}/ohlc?vs_currency=inr&days=7`
        );
        const data = response.data;

        // Transform data for charting
        const ohlcData = data.map((item: any) => ({
          time: new Date(item[0]),
          open: item[1],
          high: item[2],
          low: item[3],
          close: item[4],
        }));

        setOhlcData(ohlcData);
        drawChart(ohlcData);
      } catch (error) {
        console.error("Error fetching OHLC data:", error);
      }
    };

    fetchOhlcData();
  }, [name]);

  const drawChart = (data: OhlcData[]) => {
    const canvas = canvasRef.current;

    // Check if canvas is not null
    if (canvas) {
      const ctx = canvas.getContext("2d");

      // Check if ctx is not null
      if (ctx) {
        const width = canvas.width;
        const height = canvas.height;
        const margin = 50;
        const barWidth = ((width - margin * 2) / data.length) * zoomFactor;

        ctx.clearRect(0, 0, width, height);

        // Determine the scale
        const maxPrice = Math.max(...data.map((d) => d.high));
        const minPrice = Math.min(...data.map((d) => d.low));
        const priceRange = maxPrice - minPrice;

        // Draw the OHLC bars
        data.forEach((d, index) => {
          const x = margin + index * barWidth + offsetX;
          const yOpen =
            height -
            margin -
            ((d.open - minPrice) / priceRange) * (height - margin * 2);
          const yClose =
            height -
            margin -
            ((d.close - minPrice) / priceRange) * (height - margin * 2);
          const yHigh =
            height -
            margin -
            ((d.high - minPrice) / priceRange) * (height - margin * 2);
          const yLow =
            height -
            margin -
            ((d.low - minPrice) / priceRange) * (height - margin * 2);

          ctx.fillStyle = d.close > d.open ? "green" : "red";
          ctx.fillRect(
            x + barWidth / 4,
            Math.min(yOpen, yClose),
            barWidth / 2,
            Math.abs(yClose - yOpen)
          );
          ctx.strokeStyle = "black";
          ctx.beginPath();
          ctx.moveTo(x + barWidth / 2, yHigh);
          ctx.lineTo(x + barWidth / 2, yLow);
          ctx.stroke();
        });

        // Draw X-axis (dates) vertically with spacing
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        const labelInterval = Math.floor(data.length / 5); // Change this for more or fewer labels
        data.forEach((d, index) => {
          if (index % labelInterval === 0) {
            const dateStr = d.time.toLocaleDateString(); // Format the date
            ctx.save();
            ctx.translate(
              margin + index * barWidth + offsetX + barWidth / 2,
              height - margin / 2
            );
            ctx.rotate(-Math.PI / 2); // Rotate the text
            ctx.fillText(dateStr, 0, 0);
            ctx.restore();
          }
        });

        // Draw Y-axis (prices)
        ctx.textAlign = "right";
        for (let i = 0; i <= 5; i++) {
          const priceLabel = (minPrice + priceRange * (i / 5)).toFixed(2);
          const priceLabelNumber = parseFloat(priceLabel);
          const yPos =
            height -
            margin -
            ((priceLabelNumber - minPrice) / priceRange) *
              (height - margin * 2);
          ctx.fillText(priceLabel, margin - 10, yPos);
        }

        // Draw tooltip if visible
        if (tooltip.visible) {
          ctx.fillStyle = "white";
          ctx.fillRect(tooltip.x, tooltip.y - 30, 80, 25);
          ctx.strokeStyle = "black";
          ctx.strokeRect(tooltip.x, tooltip.y - 30, 80, 25);
          ctx.fillStyle = "black";
          ctx.fillText(tooltip.price, tooltip.x + 40, tooltip.y - 10);
        }
      } else {
        console.error("Failed to get the 2D context from the canvas.");
      }
    } else {
      console.error("Canvas is not available.");
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const x = e.clientX - canvas.getBoundingClientRect().left;
      const barWidth = ((canvas.width - 50 * 2) / ohlcData.length) * zoomFactor;

      let found = false;
      for (let index = 0; index < ohlcData.length; index++) {
        const barX = 50 + index * barWidth + offsetX;
        if (x >= barX && x <= barX + barWidth) {
          const price = ohlcData[index].close; // Display closing price on hover
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
        setTooltip({ ...tooltip, visible: false }); // Hide tooltip if not hovering over a bar
      }

      drawChart(ohlcData);
    }
  };

  const zoomIn = () => {
    setZoomFactor((prev) => Math.min(prev * 1.2, 5));
    drawChart(ohlcData);
  };

  const zoomOut = () => {
    setZoomFactor((prev) => Math.max(prev * 0.8, 1));
    drawChart(ohlcData);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">
        {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()} Candlestick
        Chart (Last 7 Days)
      </h2>
      <canvas
        ref={canvasRef}
        width={800}
        height={400}
        onMouseMove={handleMouseMove}
      />
      <div className="flex justify-between mt-4">
        <button
          onClick={zoomIn}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          +
        </button>
        <button
          onClick={zoomOut}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          -
        </button>
      </div>
    </div>
  );
};

export default CandlestickChart;
