import React, { useState, useEffect } from 'react';

function Section7() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = [
    "image1.jpg",
    "image2.jpg",
    "image3.jpg",
    "image4.jpg",
    "image5.jpg",
    "image6.jpg",
  ];
  const totalSlides = slides.length;

  // Change slide every 3 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [totalSlides]); 
  return (
    <>
       <div div className="sec7-head mt-[50px] flex flex-col items-center ">
        <h2 className='text-3xl font-semibold text-pink-500'>Success Experience</h2>
        <div className='flex flex-col justify-center items-center mt-10'>
        <h1 className='sm:text-4xl md:text-6xl lg:text-8xl'>Insights from Connect</h1>
        <h1 className='sm:text-4xl md:text-6xl lg:text-8xl'>Users</h1>
        </div>
        </div>

        <div className="slider-container">
      <div className="slider" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {slides.map((src, index) => (
          <div className="slide bg-red-400 border border-black" key={index}>
            <img src={src} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>
      <style jsx>{`
        .slider-container {
          width: 100%;
          overflow: hidden;
        }

        .slider {
          display: flex;
          transition: transform 0.5s ease;
        }

        .slide {
          min-width: 100%;
        }

        img {
          width: 100%;
          display: block;
        }
      `}</style>
    </div>

    </>
  )
}

export default Section7
