import React, { useState } from 'react'

function Section5() {
    const cards = [
        { id: 1, title: "Card 1", description: "This is card 1", colors:"yellow", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUk2zBfHzeV5yxsgE4tRO6Z2q5SozMWph8Og&s" },
        { id: 2, title: "Card 2", description: "This is card 2", colors:"green" , image:"https://www.indifi.com/blog/wp-content/uploads/2019/12/Why-Flipkart-Should-be-a-Preferred-Choice-If-You-Are-Thinking-of-Taking-Business-Online-.jpg"},
        { id: 3, title: "Card 3", description: "This is card 3", colors:"blue" , image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCLvx1x8oeXs-DidUVmNti1LMUwkdDG3Fn0Q&s"},
        { id: 4, title: "Card 4", description: "This is card 4", colors:"purple", image:"https://i.pcmag.com/imagery/reviews/068BjcjwBw0snwHIq0KNo5m-15..v1602794215.png" },
        { id: 5, title: "Card 5", description: "This is card 5", colors:"white", image:"https://pub-f8c0307ce82b4885975558b04e13a858.r2.dev/2025/01/OMB-Q2-Earnings-Hero-960x540.png" },
        { id: 6, title: "Card 6", description: "This is card 6", colors:"pink", image:"https://images.samsung.com/is/image/samsung/assets/us/about-us/brand/logo/mo/360_197_1.png?$720_N_PNG$" },
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
          let position = "translate-x-[100%] scale-90  z-[5]";
          if (index === activeIndex) {
            position = "translate-x-[23%] scale-100  z-[10]";
          } else if (
            index === (activeIndex - 1 + cards.length) % cards.length
          ) {
            position = "translate-x-[-50%] scale-90  z-[5]";
          } 

          return (
            <div
              key={card.id}
              className={`card absolute  w-[600px] h-[350px]  rounded-lg shadow-lg transition-all duration-500 ${position} flex items-center justify-center`}
            >
              <img src={card.image} alt={`card-${card.id}`}  className='h-full w-full'/>
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
