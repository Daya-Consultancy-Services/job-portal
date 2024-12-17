import React, { useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";



const data = [
  {
    title: "MNCS",
    count: "2K+ Companies>",
    link: "https://www.naukri.com/mncs"
  },
  {
    title: "Edtech",
    count: "144 Companies>",
    link: "https://www.naukri.com/edtech"
  },
  {
    title: "Healthcare",
    count: "573 Companies>",
    link: "https://www.naukri.com/healthcare"
  },
  {
    title: "Unicorns",
    count: "94 Companies>",
    link: "https://www.naukri.com/unicorns"
  },
  {
    title: "Internet",
    count: "213 Companies>",
    link: "https://www.naukri.com/internet"
  }
];

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {data.map((item, index) => (
          <div className="min-w-full p-4 bg-gray-200 text-center h-[140px]" key={index}>
            <h3 className="text-xl font-bold">{item.title}</h3>
           
            <a
              href={item.link}
              className="mt-2 inline-block text-blue-800 hover:underline"
            >
               <p className="text-lg">{item.count}</p>
            </a>
          </div>
        ))}
      </div>
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-zinc-500 text-white p-2 rounded-full"
        onClick={handlePrev}
      >
        <FaAngleLeft />

      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-zinc-500 text-white p-2 rounded-full"
        onClick={handleNext}
      >
        <FaAngleRight />

      </button>
    </div>
  );
}