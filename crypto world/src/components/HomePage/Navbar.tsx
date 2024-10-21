import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 left-0 right-0 z-10">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo */}
        <a
          href="/"
          className="text-blue-800 flex justify-center items-center font-bold text-2xl"
        >
          <img className="w-16 h-16 " src="/bull.jpg" alt="" /> Cryptoworld
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link
            to={"/coins"}
            className="text-blue-700 hover:text-blue-500 transition duration-300"
          >
            Explore
          </Link>
          {/* <a
            href="/contact"
            className="text-blue-700 hover:text-blue-500 transition duration-300"
          >
            Get In Touch
          </a> */}
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="focus:outline-none text-blue-700 hover:text-blue-500 transition duration-300"
          >
            <GiHamburgerMenu />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <a
            href="/explore"
            className="block px-4 py-2 text-blue-700 hover:text-blue-500 transition duration-300"
            onClick={() => setMenuOpen(false)}
          >
            Explore
          </a>
          {/* <a
            href="/contact"
            className="block px-4 py-2 text-blue-700 hover:text-blue-500 transition duration-300"
            onClick={() => setMenuOpen(false)}
          >
            Get In Touch
          </a> */}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
