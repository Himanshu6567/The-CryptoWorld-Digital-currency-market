import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/HomePage/Navbar";
import HomePage from "./HomePage";
import AllCoins from "./AllCoins";
import Footer from "./components/HomePage/Footer";
import CoinData from "./CoinDetails";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/coins" element={<AllCoins />} />
        <Route path="/coins/:name" element={<CoinData />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
