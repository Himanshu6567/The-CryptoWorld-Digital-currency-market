import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const MostExpensiveCryptos: React.FC = () => {
  const [expensiveCoins, setExpensiveCoins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const requiredCoins = [
    "Bitcoin",
    "Ethereum",
    "Binance Coin",
    "Avalanche",
    "Solana",
    "Monero",
    "Aave",
  ]; // Names of the coins we want to fetch

  useEffect(() => {
    const fetchexpensiveCoins = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/allcoins");
        if (!response.ok) {
          throw new Error("Failed to fetch coins");
        }
        const data = await response.json();

        // Filter the coins to only include the required ones
        // const filteredCoins = data.coins.filter((coin: any) =>
        //   requiredCoins.includes(coin.name)
        // );
        const filteredCoins = data.coins.filter((coin: any) =>
          requiredCoins.some((requiredCoin) =>
            coin.name.toLowerCase().includes(requiredCoin.toLowerCase().trim())
          )
        );
        setExpensiveCoins(filteredCoins);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchexpensiveCoins();
  }, []); // Fetch when the component mounts

  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  return (
    <section id="expensive" className="py-16 bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Expensive Cryptocurrencies
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {expensiveCoins.map((crypto, index) => (
            <div
              key={index}
              className="bg-gray-900 rounded-lg overflow-hidden shadow-lg transition transform hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="w-full   flex justify-center items-center h-32 object-cover overflow-hidden p-16">
                <img
                  src={crypto.image}
                  alt={crypto.name}
                  className="rounded-full "
                />
              </div>
              <div className="  p-4">
                <Link
                  to={`/coins/${crypto.name}`}
                  className="text-lg font-semibold mb-2"
                >
                  {crypto.name}
                </Link>
                <div className="flex items-center  justify-between">
                  <p className="text-gray-400">₹ {crypto.current_price}</p>
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MostExpensiveCryptos;
