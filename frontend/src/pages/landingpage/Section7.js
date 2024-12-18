import React, { useState, useEffect } from 'react';

function Section7() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = [
    "https://images.unsplash.com/photo-1731413263259-d01c433bb0f7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw5fHx8ZW58MHx8fHx8",
    "https://images.unsplash.com/photo-1731008948799-a23081ddf419?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0NXx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1734341320397-e4b702903127?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzNHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1733235014900-380902922aa2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2M3x8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1588982775664-556d8f975938?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3Mnx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1733169258772-298088c23f57?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3NXx8fGVufDB8fHx8fA%3D%3D",
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
    <div className='mb-12 h-[100vh]'>
       <div div className=" sec7-head mt-[50px] flex flex-col items-center ">
        <h2 className='text-3xl font-semibold text-pink-500'>Success Experience</h2>
        <div className='flex flex-col justify-center items-center mt-10'>
        <h1 className='sm:text-4xl md:text-6xl lg:text-8xl'>Insights from Connect</h1>
        <h1 className='sm:text-4xl md:text-6xl lg:text-8xl'>Users</h1>
        </div>
        </div>

        <div className="slider-container mt-12 h-full">
      <div className="slider" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {slides.map((src, index) => (
          <div className="slide h-[600px] bg-red-400 border" key={index}>
            <img className="object-cover h-full w-full" src={src} alt={`Slide ${index + 1}`} />
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

    </div>
  )
}

export default Section7
