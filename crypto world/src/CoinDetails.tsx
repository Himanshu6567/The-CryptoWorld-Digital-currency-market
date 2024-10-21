import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Mapes from "./components/Charts/Mapes";
import { FaAngleDoubleLeft } from "react-icons/fa";

const CoinData = () => {
  const { name } = useParams<{ name: string }>(); // Get the coin name from URL params
  const [coin, setCoin] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCoinDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/coindetails/${name}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch coin details");
        }
        const data = await response.json();
        setCoin(data);
        console.log(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoinDetails();
  }, [name]); // Fetch details when the component mounts or when the name changes

  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  if (!coin) {
    return (
      <div className="text-center text-xl">
        No details available for this coin.
      </div>
    );
  }

  const {
    symbol,
    image,
    current_price,
    market_cap,
    fully_diluted_valuation,
    total_volume,
    high_24h,
    low_24h,
    price_change_24h,
    price_change_percentage_24h,
    circulating_supply,
    total_supply,
    ath,
    ath_change_percentage,
    ath_date,
    atl,
    atl_change_percentage,
    atl_date,
    market_cap_rank,
    max_supply,
  } = coin;

  return (
    <div>
      <Link className="text-2xl  mt-1 bg-red-300" to={"/coins"}>
        <FaAngleDoubleLeft className="ml-6 hover:text-indigo-500" />
      </Link>
      <div className="max-w-4xl mx-auto p-4">
        {/* Coin Header Section */}
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-8 mb-8">
          <div className="w-24 h-24 md:w-32 md:h-32">
            <img
              className="border-2 rounded-full border-b-slate-700"
              src={image}
              alt={coin.name}
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold">{coin.name}</h1>
            <p className="text-gray-500">Symbol: {symbol.toUpperCase()}</p>
          </div>
        </div>

        {/* Coin Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Price and Market Data */}
          <div className="bg-white p-4 shadow-md rounded-md">
            <h2 className="text-xl font-semibold">Current Price</h2>
            <p className="text-xl font-bold">{`₹${current_price.toLocaleString()}`}</p>
          </div>
          <div className="bg-white p-4 shadow-md rounded-md">
            <h2 className="text-xl font-semibold">Market Cap</h2>
            <p className="text-xl font-bold">₹{Number(market_cap)}</p>
          </div>
          <div className="bg-white p-4 shadow-md rounded-md">
            <h2 className="text-xl font-semibold">Fully Diluted Valuation</h2>
            <p className="text-xl font-bold">
              ₹{Number(fully_diluted_valuation).toLocaleString()}
            </p>
          </div>
          <div className="bg-white p-4 shadow-md rounded-md">
            <h2 className="text-xl font-semibold">Total Volume</h2>
            <p className="text-xl font-bold">
              ₹{Number(total_volume).toLocaleString()}
            </p>
          </div>

          {/* High/Low Prices */}
          <div className="bg-white p-4 shadow-md rounded-md">
            <h2 className="text-xl font-semibold">High (24h)</h2>
            <p className="text-xl font-bold text-green-600">{high_24h}</p>
          </div>
          <div className="bg-white p-4 shadow-md rounded-md">
            <h2 className="text-xl font-semibold">Low (24h)</h2>
            <p className="text-xl font-bold text-red-600">{low_24h}</p>
          </div>

          {/* Price Change Data */}
          <div className="bg-white p-4 shadow-md rounded-md">
            <h2 className="text-xl font-semibold">Price Change (24h)</h2>
            <p
              className={`text-xl font-bold ${
                price_change_24h >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {price_change_24h}
            </p>
          </div>
          <div className="bg-white p-4 shadow-md rounded-md">
            <h2 className="text-xl font-semibold">
              Price Change Percentage (24h)
            </h2>
            <p
              className={`text-xl font-bold ${
                price_change_percentage_24h >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {price_change_percentage_24h}%
            </p>
          </div>

          {/* Supply and Rank */}
          <div className="bg-white p-4 shadow-md rounded-md">
            <h2 className="text-xl font-semibold">Market Cap Rank</h2>
            <p className="text-xl ">{market_cap_rank}</p>
          </div>
          <div className="bg-white p-4 shadow-md rounded-md">
            <h2 className="text-xl font-semibold">Max Supply</h2>
            <p className="text-xl font-bold">{max_supply}</p>
          </div>
          <div className="bg-white p-4 shadow-md rounded-md">
            <h2 className="text-xl font-semibold">Circulating Supply</h2>
            <p className="text-xl font-bold">{circulating_supply}</p>
          </div>
          <div className="bg-white p-4 shadow-md rounded-md">
            <h2 className="text-xl font-semibold">Total Supply</h2>
            <p className="text-xl font-bold">{total_supply}</p>
          </div>

          {/* All-Time High/Low */}
          <div className="bg-white p-4 shadow-md rounded-md">
            <h2 className="text-xl font-semibold">All-Time High</h2>
            <p className="text-xl font-bold">{ath}</p>
            <p className="text-red-600">{ath_change_percentage}%</p>
          </div>
          <div className="bg-white p-4 shadow-md rounded-md">
            <h2 className="text-xl font-semibold">All-Time Low</h2>
            <p className="text-xl font-bold">{atl}</p>
            <p className="text-green-600">{atl_change_percentage}%</p>
          </div>
        </div>

        {/* Quote Section */}
        <div className="bg-blue-50 p-4 rounded-md shadow-md mb-8 mt-8">
          <h2 className="text-xl font-semibold text-center">
            "The internet is for everyone. Digital currency is the next logical
            step." – Anonymous
          </h2>
        </div>

        {/* Additional Information */}
        <div className="mt-8 bg-white p-4 shadow-md rounded-md">
          <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
          <p>
            <strong>ATH Date:</strong>{" "}
            <span className="text-green-500">
              {" "}
              {new Date(ath_date).toLocaleDateString()}
            </span>{" "}
          </p>
          <p>
            <strong>ATL Date:</strong>{" "}
            <span className="text-red-500">
              {new Date(atl_date).toLocaleDateString()}
            </span>{" "}
          </p>
          {/* <p>
            <strong>Last Updated:</strong>{" "}
            {new Date(coin.last_updated).toLocaleString()}
          </p> */}
        </div>
      </div>
      <Mapes name={name} />
    </div>
  );
};

export default CoinData;
