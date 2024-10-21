import React from "react";
import HeroSection from "./components/HomePage/HeroSection";
import ExploreSection from "./components/HomePage/ExploreSection";
import TrendingShares from "./components/HomePage/TrendingShares";
import MostExpensiveShares from "./components/HomePage/MostExpensiveShares";
import LeastShares from "./components/HomePage/LeastShares";
import BlogSection from "./components/HomePage/BlogSection";
import StatsSection from "./components/HomePage/StatsSection";
import GetInTouch from "./components/HomePage/GetInTouch";

const HomePage: React.FC = () => {
  return (
    <div className="font-sans ">
      <HeroSection />
      <ExploreSection />
      <TrendingShares />
      <MostExpensiveShares />
      <LeastShares />
      <BlogSection />
      <StatsSection />
      <GetInTouch />
    </div>
  );
};
export default HomePage;
