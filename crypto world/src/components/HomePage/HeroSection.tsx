import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-gray-100 py-20">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between h-full">
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Ready to Elevate Your Investment Strategy?
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-6">
            Join us for real-time data, insights, and guidance to enhance your
            stock portfolio.
          </p>
          <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-full transition duration-300">
            Get Started
          </button>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
          <img src="/stb.png" alt="Investment Insights" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
