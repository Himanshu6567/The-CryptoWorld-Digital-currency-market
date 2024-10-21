import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import debounce from "lodash.debounce";


const Allcoins: React.FC = () => {
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("market_cap"); // Default sorting option
  const [coins, setCoins] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalCoins, setTotalCoins] = useState(0);
  const [loading, setLoading] = useState(false); // Loading state

  const coinsPerPage = 50;

  const fetchCoins = async (pageNumber: number, searchQuery = "") => {
    try {
      setLoading(true); // Show loading indicator
      const response = await fetch(
        `http://localhost:5000/api/allcoins?page=${pageNumber}&search=${searchQuery}`
      );
      const data = await response.json();
      setCoins(data.coins);
      console.log(data.coins);
      setTotalCoins(data.totalCoins);
      setLoading(false); // Hide loading indicator
    } catch (error) {
      console.error("Error fetching coins:", error);
      setLoading(false); // Hide loading indicator
    }
  };

  useEffect(() => {
    fetchCoins(page); // Fetch coins when page changes
  }, [page]);

  // Debounced search
  const debouncedSearch = useCallback(
    debounce((query: any) => {
      setPage(1); // Reset page to 1 on new search
      fetchCoins(1, query); // Fetch coins on search input
    }, 500), // 500ms debounce
    []
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    debouncedSearch(e.target.value); // Call debounced search
  };

  // Sorting logic
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = e.target.value;
    setSortOption(selectedSort);

    // Sort coins based on the selected option
    const sortedCoins = [...coins]; // Create a copy of the current coins array

    switch (selectedSort) {
      case "price":
        sortedCoins.sort((a, b) => b.current_price - a.current_price); // Sort by price (descending)
        break;
      case "high_24h":
        sortedCoins.sort((a, b) => b.high_24h - a.high_24h); // Sort by 24h high (descending)
        break;
      case "name":
        sortedCoins.sort((a, b) => a.name.localeCompare(b.name)); // Sort by name (alphabetically)
        break;
      default:
        break;
    }

    setCoins(sortedCoins); // Update the sorted coins in state
  };

  // Calculate total pages
  const totalPages = Math.ceil(totalCoins / coinsPerPage);

  coins.map((coin) => {
    return console.log(coin.market_cap_rank);
  });

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <h1 className="text-4xl font-bold text-green-700">
              Welcome to the CryptoWorld
            </h1>
            <p className="text-lg text-gray-700 mt-4">
              “Bitcoin is a technological tour de force.” <br />
              <strong> - Bill Gates</strong>
            </p>
            <p className="text-lg text-gray-700 mt-4">
              Discover the latest updates in digital currencies, track your
              favorite coins, and stay informed.
            </p>
          </div>
          <div className="md:w-1/3">
            <img
              src="/rr.jpg"
              alt="Stock market trends"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Search & Sort */}
        <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0">
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Search by name"
              value={search}
              onChange={handleSearch}
              className="w-full md:w-60 p-2 rounded-lg bg-white text-gray-800 border border-green-300 shadow-sm focus:ring-2 focus:ring-green-500"
            />
            <button className="p-2 bg-green-600 text-white rounded-lg shadow-sm hover:bg-green-500 transition">
              Search
            </button>
          </div>
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="w-full md:w-44 p-2 rounded-lg bg-white text-gray-800 border border-green-300 shadow-sm focus:ring-2 focus:ring-green-500"
          >
            <option value="price">Sort by Price</option>
            <option value="high_24h">Sort by 24h High</option>
            <option value="name">Sort by Name</option>
          </select>
        </div>

        {/* Coins or Loading Indicator */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          style={{ minHeight: "300px" }} // Ensure consistent height
        >
          {loading ? (
            <div className="col-span-full text-center text-xl text-gray-700">
              Loading...
            </div>
          ) : coins.length > 0 ? (
            coins.map((coin) => (
              <Link
                // onClick={() => {
                //   idwork(coin.id);
                // }}
                to={`/coins/${coin.name}`}
                key={coin.id}
                className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition duration-300 border border-green-300 mx-2 sm:mx-0"
              >
                <img
                  src={coin.image}
                  alt={coin.name}
                  className="w-16 h-16 mb-4 mx-auto"
                />
                <h2 className="text-xl font-semibold text-center text-green-700">
                  {coin.name} ({coin.symbol})
                </h2>
                <p className="text-center text-lg text-gray-700">
                  Price: ₹{coin.current_price}
                </p>
                <p className="text-center text-sm text-gray-600">
                  24h High: ₹{coin.high_24h} <br></br> Low: ₹{coin.low_24h}
                </p>
                <p className="text-center text-sm text-gray-600">
                  Market Cap Rank: {coin.market_cap_rank}
                </p>
                <p
                  className={`text-center font-bold ${
                    coin.price_change_percentage_24h >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  24h Change: {coin.price_change_percentage_24h}%
                </p>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center text-xl text-gray-700">
              No coins found
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-8 space-x-2">
          <button
            onClick={() => setPage((prev) => (prev > 1 ? prev - 1 : prev))}
            disabled={page === 1}
            className="bg-green-600 disabled:bg-green-400 flex justify-center items-center text-white py-1 px-3 rounded-lg shadow-sm hover:bg-green-500 transition"
          >
            &lt;
          </button>
          <span className="text-green-700 font-semibold">P.{page}</span>
          <button
            className="bg-green-600  disabled:bg-green-400 flex justify-center items-center text-white py-1 px-3 rounded-lg shadow-sm hover:bg-green-500 transition"
            onClick={() =>
              setPage((prev) => (prev < totalPages ? prev + 1 : prev))
            }
            disabled={page === totalPages}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Allcoins;
