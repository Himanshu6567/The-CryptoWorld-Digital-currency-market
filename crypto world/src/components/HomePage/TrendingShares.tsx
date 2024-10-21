import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const TrendingCryptos: React.FC = () => {
  const [trendingCoins, setTrendingCoins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const requiredCoins = ["Bitcoin", "Ethereum", "Tether", "Bittensor","Aave","kaspa"]; // Names of the coins we want to fetch

  useEffect(() => {
    const fetchTrendingCoins = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/allcoins");
        if (!response.ok) {
          throw new Error("Failed to fetch coins");
        }
        const data = await response.json();

        // Filter the coins to only include the required ones
        const filteredCoins = data.coins.filter((coin: any) =>
          requiredCoins.includes(coin.name)
        );
        setTrendingCoins(filteredCoins);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingCoins();
  }, []); // Fetch when the component mounts

  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  return (
    <section id="trending" className="py-16 bg-gray-100 text-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Trending Cryptos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trendingCoins.map((crypto, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-lg overflow-hidden shadow-md transition transform hover:-translate-y-2"
            >
              <div className="w-full h-48  flex justify-center items-center object-cover p-10 overflow-hidden">
                <img src={crypto.image} alt={crypto.name} className="  " />
              </div>

              <div className="p-6">
                <Link
                  to={`/coins/${crypto.name}`}
                  className="text-xl font-semibold mb-2"
                >
                  {crypto.name} ({crypto.symbol})
                </Link>
                <p className="text-gray-600">Price: ₹{crypto.current_price}</p>
                <strong
                  className={`text-lg ${
                    crypto.price_change_percentage_24h >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {crypto.price_change_percentage_24h >= 0 ? "+" : " "}
                  {crypto.price_change_percentage_24h.toFixed(2)}%
                </strong>

                {/* <p
                  className={`text-center font-bold ${
                    crypto.price_change_percentage_24h >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  24h Change: {crypto.price_change_percentage_24h}%
                </p> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingCryptos;
