import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import Header from '../../components/Header';
import Section2 from './Section2';
import Section3 from './Section3';
import Section4 from './Section4';
import Section5 from './Section5';
import Section6 from './Section6';
import Section7 from './Section7';
import Section8 from './Section8';
import Footer from '../../components/Footer';

function Landing() {
  const [isOpen, setIsOpen] = useState(false);
  
  // References to the card images
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const card4Ref = useRef(null);
  const card5Ref = useRef(null);
  const card6Ref = useRef(null);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    console.log('Toggle dropdown visibility');
  };
  
  const handleItemClick = () => {
    setIsOpen(false); // Close dropdown
  };

  // GSAP animation for floating cards
  useEffect(() => {
    // Create random floating animation for each card
    const createFloatingAnimation = (element, delay) => {
      // Initial position
      gsap.set(element, {
        x: 0,
        y: 0
      });

      // Create timeline for continuous floating
      const timeline = gsap.timeline({
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });

      // Add floating animation
      timeline.to(element, {
        y: "-=15",
        x: "+=8",
        rotation: 2,
        duration: 3,
        delay: delay,
        ease: "sine.inOut"
      });

      timeline.to(element, {
        y: "+=15",
        x: "-=8",
        rotation: -2,
        duration: 3.5,
        ease: "sine.inOut"
      });

      return timeline;
    };

    const animations = [
      createFloatingAnimation(card1Ref.current, 0),
      createFloatingAnimation(card2Ref.current, 0.5),
      createFloatingAnimation(card3Ref.current, 1),
      createFloatingAnimation(card4Ref.current, 1.5),
      createFloatingAnimation(card5Ref.current, 0.3),
      createFloatingAnimation(card6Ref.current, 0.8)
    ];

    return () => {
      animations.forEach(animation => animation.kill());
    };
  }, []);

  return (
    <>
      <div className='min-h-[100vh] w-full bg-slate-100 overflow-hidden'>
        <Header />
        <div className="hero h-[100vh] w-full flex justify-center items-center p-5 relative">
          {/* Card images with refs for animation */}
          <img 
            ref={card1Ref}
            src={require('../../assets/card1.png')}
            alt="Job Card"
            className="absolute h-[570px] w-[570px] top-[18%] left-[-2%] z-10"
          />
          
          <img 
            ref={card2Ref}
            src={require('../../assets/card2.png')}
            alt="Job Card"
            className="absolute h-[600px] w-[600px] top-[48%] right-[20%] z-10"
          />
          
          <img 
            ref={card3Ref}
            src={require('../../assets/card3.png')}
            alt="Job Card"
            className="absolute h-[570px] w-[570px] top-[40%] left-[20%] z-10"
          />
          
          <img 
            ref={card4Ref}
            src={require('../../assets/card4.png')}
            alt="Job Card"
            className="absolute h-[570px] w-[570px] bottom-[2%] right-[-7%] z-10"
          />
          
          <img 
            ref={card5Ref}
            src={require('../../assets/card5.png')}
            alt="Job Card"
            className="absolute h-[550px] w-[570px] top-[-6%] right-0 z-10"
          />
          
          <img 
            ref={card6Ref}
            src={require('../../assets/card6.png')}
            alt="Job Card"
            className="absolute h-[570px] w-[570px] bottom-[45%] left-[5%] z-10"
          />

          <div className="hero-div h-[90%] mt-[60px] w-full rounded-[50px] flex items-center flex-col" 
            style={{ 
              background: "linear-gradient(141deg, rgba(254,243,240,1) 5%, rgba(252,203,214,1) 30%, rgba(238,155,227,1) 84%)",
            }}
          >
            <div className="hero-heading-searchbar flex items-center justify-center flex-col h-fit w-fit relative top-[25%]">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-sans tracking-tight">
                Modernizing the job
              </h1>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-sans tracking-tight">
                search experience
              </h1>
              <p className='h-[20%] w-[68%] flex flex-col items-center text-[5px] sm:text-[5px] md:text-[10px] lg:text-[15px] xl:text-[20px] mt-7 text-gray-600'>
                <span>search and find your dream job now easier than ever, you can </span>
                <span>simply browse and find a job if you need it</span>
              </p>

              
            </div>
          </div>
        </div>
        <div className="about h-[60vh] pl-5 pr-5">
          <Section2/>
        </div>
        <div className="job h-[70vh] p-5">
          <Section3/>
        </div>
        <div className="job min-h-[100vh] p-5">
          <Section4/>
        </div>
        <div className="job min-h-[100vh] p-5">
          <Section5/>
        </div>
        <div className="job min-h-[100vh] p-5">
          <Section6/>
        </div>
        <div className="job min-h-[100vh] p-5">
          <Section7/>
        </div>
        <div className="job min-h-[100vh] p-5">
          <Section8/>
        </div>
        <Footer/>
      </div>
    </>
  )
}

export default Landing