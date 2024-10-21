
import BarChart from "./BarChart";
import CandlestickChart from "./CandlestickChart";
import LineChart from "./LineChart";

function Mapes({ name }: any) {
  name = name.toLowerCase();
  return (
    <div>
      <CandlestickChart name={name} />
      <LineChart name={name} />
      <BarChart name={name} />
    </div>
  );
}

export default Mapes;
