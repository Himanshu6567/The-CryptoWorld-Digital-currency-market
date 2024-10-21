import React from "react";

const BlogSection: React.FC = () => {
  const questions = [
    "What are the key principles of investing in digital currencies?",
    "How can I minimize risks while trading cryptocurrencies?",
    "What strategies can help in analyzing cryptocurrency trends?",
    "What resources are available for learning about cryptocurrency trading?",
    "How does blockchain technology support digital currencies?",
  ];

  const blogPosts = [
    {
      title: "Understanding Digital Currency Basics",
      description:
        "A beginner's guide to the fundamentals of cryptocurrency trading.",
      imageUrl: "/share2.png",
      content:
        "In this post, we will explore the fundamental concepts that every digital currency investor should know. We'll cover key terms, how blockchain works, and the different types of cryptocurrencies.",
    },
    {
      title: "How to Analyze Cryptocurrency Trends",
      description:
        "Learn the techniques to evaluate cryptocurrency market trends effectively.",
      imageUrl: "/analysis3.jpg",
      content:
        "This article provides an in-depth analysis of various tools and methods used to track cryptocurrency trends. From blockchain analytics to technical analysis, we break down what you need to know.",
    },
    {
      title: "Investing Strategies for Long-term Crypto Growth",
      description:
        "Discover effective strategies to grow your crypto investments.",
      imageUrl:"/digital.png",content:
        "Long-term investing in digital currencies can yield significant returns. In this post, we discuss different strategies that can help cryptocurrency investors achieve their financial goals over time.",
    },
    {
      title: "The Importance of Diversifying Your Crypto Portfolio",
      description:
        "Why diversifying your cryptocurrency holdings is crucial for success.",
      imageUrl:
        "https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=1200",
      content:
        "This blog post outlines the importance of diversification in cryptocurrency investing. Learn how to spread your investments across various digital assets to minimize risk.",
    },
  ];

  return (
    <section className="py-16 bg-white text-gray-700">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">From the Blog</h2>
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-center mb-4">
            Questions to Consider
          </h3>
          <ul className="list-disc list-inside">
            {questions.map((question, index) => (
              <li key={index} className="text-lg text-gray-600">
                {question}
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogPosts.map((post, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600">{post.description}</p>
                <p className="text-gray-500 mt-4">{post.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
