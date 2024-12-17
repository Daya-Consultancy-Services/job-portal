import React, { useState } from 'react'

function Section5() {
    const cards = [
        { id: 1, title: "Card 1", description: "This is card 1", colors:"yellow" },
        { id: 2, title: "Card 2", description: "This is card 2", colors:"green" },
        { id: 3, title: "Card 3", description: "This is card 3", colors:"blue" },
        { id: 4, title: "Card 4", description: "This is card 4", colors:"purple" },
        { id: 5, title: "Card 5", description: "This is card 5", colors:"white" },
        { id: 6, title: "Card 6", description: "This is card 6", colors:"pink" },
      ];
    
      const [activeIndex, setActiveIndex] = useState(0);
    
      const nextSlide = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % cards.length);
      };
    
      const prevSlide = () => {
        setActiveIndex((prevIndex) =>
          prevIndex === 0 ? cards.length - 1 : prevIndex - 1
        );
      };
  return (
    <>
      <div div className="sec5-head mt-[50px] flex flex-col items-center ">
        <h2 className='text-3xl font-semibold text-pink-500'>Top Companies</h2>
        <div className='flex flex-col justify-center items-center mt-10'>
        <h1 className='text-8xl'>Best Companies for</h1>
        <h1 className='text-8xl'>Employees 2024</h1>
        </div>
        </div>
{/*--------------------------swiper------------------------- */}
        <div className="swiper mt-10">
        <div className="slider-container relative w-full h-[400px] overflow-hidden flex items-center justify-center top-[90px]">
      <button
        onClick={prevSlide}
        className="absolute left-5 z-10 bg-gray-700 text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition"
      >
        {"<"}
      </button>

      <div className="slider-wrapper  flex items-center justify-center w-[100%] h-full relative left-[-150px]">
        {cards.map((card, index) => {
          let position = "translate-x-[100%] scale-90 opacity-50 z-[5]";
          if (index === activeIndex) {
            position = "translate-x-[23%] scale-100 opacity-100 z-[10]";
          } else if (
            index === (activeIndex - 1 + cards.length) % cards.length
          ) {
            position = "translate-x-[-50%] scale-90 opacity-75 z-[5]";
          } 

          return (
            <div
              key={card.id}
              className={`card absolute w-[600px] h-[550px] bg-${card.colors}-600 rounded-lg shadow-lg p-5 transition-all duration-500 ${position} flex items-center justify-center`}
            >
              <h2 className="font-bold text-5xl ">{card.title}</h2>
              <p className="text-gray-500">{card.description}</p>
            </div>
          );
        })}
      </div>

      <button
        onClick={nextSlide}
        className="absolute right-5 z-10 bg-gray-700 text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition"
      >
        {">"}
      </button>
    </div>
        </div>




        </>
    
  )
}

export default Section5
