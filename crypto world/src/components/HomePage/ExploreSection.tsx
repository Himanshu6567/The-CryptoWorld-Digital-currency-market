import React from "react";
const ExploreSection: React.FC = () => {
  const exploreItems = [
    {
      title: "Digital Currency Basics",
      description: "Learn how digital currencies work and how to invest.",
      imageUrl: "/learn.jpg",
      link: "https://www.rba.gov.au/education/resources/explainers/cryptocurrencies.html",
    },
    {
      title: "Risk Management in Crypto",
      description:
        "Master the art of managing risk to maximize gains in cryptocurrency.",
      imageUrl: "/risk.jpg",
      link: "https://coinswitch.co/switch/crypto/risk-management-in-crypto-trading/#:~:text=You%20can%20follow%20the%201,case%20of%20adverse%20market%20conditions.&text=Traders%20are%20advised%20to%20pre,risk%20management%20in%20crypto%20trading.",
    },
    {
      title: "Crypto Investment Strategies",
      description:
        "Explore different strategies to build a strong crypto portfolio.",
      imageUrl: "/share4.jpg",
      link: "https://economictimes.indiatimes.com/markets/cryptocurrency/8-best-crypto-investing-strategies-to-follow-mudrex-research-team/articleshow/114208123.cms?from=mdr",
    },
    {
      title: "Cryptocurrency Market Trends",
      description:
        "Stay updated with the latest trends in the digital currency market.",
      imageUrl: "/analysis1.jpg",
      link: "https://www.fortunebusinessinsights.com/industry-reports/cryptocurrency-market-100149",
    },
    {
      title: "Blockchain Indicators",
      description:
        "Learn about key indicators for evaluating the performance of cryptocurrencies.",
      imageUrl: "/analysis.jpg",
      link: "https://medium.com/web3prophet/key-performance-indicators-for-a-successful-cryptocurrency-service-in-2024-a219b1eacdb6",
    },
    {
      title: "Crypto Trading Strategies",
      description:
        "Discover effective trading strategies for success in the digital currency world.",
      imageUrl: "/share2.jpg",
      link: "https://kriptomat.io/finance-investing/top-crypto-trading-strategies-that-every-investor-should-know/",
    },
  ];

  return (
    <section id="explore" className="py-16 bg-red-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Explore Digital Currencies
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {exploreItems.map((item, index) => (
            <a
              href={item.link}
              target="_blank"
              key={index}
              className="bg-red-800 rounded-lg overflow-hidden shadow-lg transition transform hover:-translate-y-1 hover:shadow-xl"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreSection;
