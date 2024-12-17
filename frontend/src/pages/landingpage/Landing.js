import React, { useState } from 'react'
import Header from '../../components/Header'
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

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    console.log('Toggle dropdown visibility')
  };
  const handleItemClick = () => {
    setIsOpen(false); // Close dropdown
  };

  return (
    <>
      <div className='min-h-[100vh] w-full bg-slate-100   overflow-hiddenr'>
        <Header />
        <div className="hero h-[100vh] w-full  flex justify-center items-center p-5 ">
          <div className="hero-div h-[90%] mt-[60px]  w-full  rounded-[50px]   flex items-center flex-col" 
          style={{ 
                      background: "linear-gradient(141deg, rgba(254,243,240,1) 5%, rgba(252,203,214,1) 30%, rgba(238,155,227,1) 84%)",
                  }}
          >
<div className="  hero-heading-searchbar flex items-center justify-center flex-col h-fit w-fit relative top-[10%]">
  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-sans tracking-tight">
    Modernizing the job
  </h1>
  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-sans tracking-tight">
    search experience
  </h1>
  <p className='h-[20%] w-[68%] flex flex-col  items-center  text-[5px] sm:text-[5px] md:text-[10px] lg:text-[15px] xl:text-[20px] mt-7 text-gray-600'><span>search and find your dream job now easier than ever, you can </span><span>simply browse and find a job if you need it</span></p>

  <div className="search-bar h-[70px]  w-[140%] gap-4  rounded-full overflow-hidden flex items-center mt-10 ">
    <div className='bg-white h-full  w-[90%]  rounded-full  flex  items-center'>
    <input type="text" className=' h-[90%] w-[45%] border-r-[0.1px] border-slate-300 flex items-center text-[18px] box-border pl-4 focus:outline-none' placeholder='Enter skills / designations / companies'/>

<button
onClick={toggleDropdown}
className="inline-flex justify-between w-[30%] px-4 py-2 text-lg font-medium text-gray-400 shadow-sm  focus:outline-none "
>
Select Experience
<svg
className={`w-5 h-5 ml-2 transition-transform duration-300 ${
  isOpen ? 'rotate-180' : 'rotate-0'
}`}
xmlns="http://www.w3.org/2000/svg"
fill="none"
viewBox="0 0 24 24"
stroke="currentColor"
>
<path
  strokeLinecap="round"
  strokeLinejoin="round"
  strokeWidth="2"
  d="M19 9l-7 7-7-7"
/>
</svg>
</button>

{/* Dropdown Menu */}
{isOpen && (
<div className="absolute left-[278px] bottom-[-150px] w-[300px] z-2 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
<ul className="py-1">
<li>
    <a
      href="#buy-online"
      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      onClick={handleItemClick}
    >
      Fresher
    </a>
  </li>
  <li>
    <a
      href="#buy-online"
      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      onClick={handleItemClick}
    >
      0-5 years
    </a>
  </li>
  <li>
    <a
      href="#onecareer-hiring-suite"
      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      onClick={handleItemClick}
    >
      5-10 years
    </a>
  </li>
  <li>
    <a
      href="#employer-login"
      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      onClick={handleItemClick}
    >
      10+ years
    </a>
  </li>
</ul>
</div>
)}

<input type="text" className='h-[80%] w-[23%]  right-0 pl-4 focus:outline-none text-[18px] border-l-[0.1px] border-slate-300' placeholder='Enter location'/>
    </div>

    <button className='px-[50px] py-[18px] bg-black  rounded-full  font-semibold text-white   transition-all duration-900 ease hover:text-black hover:bg-white'>Search</button>

    
  </div>
</div>



          </div>
        </div>
        <div className="about h-[60vh] pl-5 pr-5">
          <Section2/>
        </div>
        <div className="job h-[70vh] p-5 ">
          <Section3/>
        </div>
        <div className="job min-h-[100vh] p-5  ">
          <Section4/>
        </div>
        <div className="job min-h-[100vh] p-5  ">
          <Section5/>
        </div>
        <div className="job min-h-[100vh] p-5  ">
          <Section6/>
        </div>
        <div className="job min-h-[100vh] p-5  ">
          <Section7/>
        </div>
        <div className="job min-h-[100vh] p-5  ">
          <Section8/>
        </div>
        <Footer/>
      </div>
     

    </>
  )
}

export default Landing
