import React, { useState } from "react";

const GetInTouch: React.FC = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage("Successfully subscribed!");

        setTimeout(() => {
          setMessage("");
        }, 2000);
      } else {
        setMessage("Failed to subscribe. Please try again.");
      }
    } catch (error) {
      setMessage("Error connecting to server.");
    }

    setEmail("");
  };

  return (
    <section id="get-in-touch" className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8">
          Stay Connected with Us
        </h2>
        <p className="text-lg text-center text-gray-400 mb-12">
          Enter your email below to get the latest updates on the cryptocurrency
          market, tips, and more!
        </p>
        <div className="max-w-lg mx-auto">
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-4 mx-10 rounded-lg mb-4 text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition duration-300"
            >
              Get In Touch
            </button>
          </form>
          {message && <p className="mt-4">{message}</p>}
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;
