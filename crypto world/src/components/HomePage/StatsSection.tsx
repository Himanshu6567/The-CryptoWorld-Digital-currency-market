import React from "react";

const CryptoStatsSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-800 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-12">Cryptocurrency Market Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <span className="text-6xl font-bold mb-2">10,000+</span>
            <p className="text-gray-300">Cryptocurrencies Listed</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-6xl font-bold mb-2">1.5B</span>
            <p className="text-gray-300">Daily Transactions</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-6xl font-bold mb-2">5.2%</span>
            <p className="text-gray-300">Market Growth</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CryptoStatsSection;
