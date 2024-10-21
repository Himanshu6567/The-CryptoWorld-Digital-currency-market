import React from "react";
import { FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="  bg-gray-800 text-white bottom-0    py-4 mt-auto">
      <div className="container    mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Left side - Company Info */}
        <div className="mb-4 md:mb-0">
          <h2 className="text-xl font-bold">Cryptoworld</h2>
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} All Rights Reserved.
          </p>
        </div>

        <div className="flex space-x-6">
          <a
            href="https://github.com/Himanshu6567"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition duration-300"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/himanshu-chandola-361a6924b/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition duration-300"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
