import React, { useState } from 'react'
import { CiClock1 } from "react-icons/ci";

function Section8() {

  const newsCard = [
    {
      image: "url",
      title:"Video Interview Tips: Before, During, and After",
      description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad impedit quo, illum eum vel optio, explicabo possimus voluptatem sed accusamus ipsum officiis eveniet qui rem quam expedita, obcaecati voluptates suscipit! Ut, natus veniam! Hic labore exercitationem consequuntur, eveniet accusantium repellat!",
      time:"28 jan 2010",
  },
    {
      image: "url",
      title:"Video Interview Tips: Before, During, and After",
      description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad impedit quo, illum eum vel optio, explicabo possimus voluptatem sed accusamus ipsum officiis eveniet qui rem quam expedita, obcaecati voluptates suscipit! Ut, natus veniam! Hic labore exercitationem consequuntur, eveniet accusantium repellat!",
      time:"28 jan 2010",
  },
    {
      image: "url",
      title:"Video Interview Tips: Before, During, and After",
      description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad impedit quo, illum eum vel optio, explicabo possimus voluptatem sed accusamus ipsum officiis eveniet qui rem quam expedita, obcaecati voluptates suscipit! Ut, natus veniam! Hic labore exercitationem consequuntur, eveniet accusantium repellat!",
      time:"28 jan 2010",
  },
]
  
const styles = {
  button: {
    lineHeight: 1,
    textDecoration: "none",
    display: "inline-flex",
    border: "none",
    cursor: "pointer",
    alignItems: "center",
    gap: "0.75rem",
    backgroundColor: "var(--clr, #7808d0)",
    color: "#fff",
    borderRadius: "10rem",
    fontWeight: 600,
    padding: "0.75rem 1.5rem",
    paddingLeft: "20px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    transition: "background-color 0.3s",
  },
  buttonIconWrapper: {
    flexShrink: 0,
    width: "25px",
    height: "25px",
    position: "relative",
    color: "var(--clr, #7808d0)",
    backgroundColor: "#fff",
    borderRadius: "50%",
    display: "grid",
    placeItems: "center",
    overflow: "hidden",
  },
  iconSvg: {
    position: "relative",
    transition: "transform 0.3s ease-in-out",
  },
  iconSvgCopy: {
    position: "absolute",
    transform: "translate(-150%, 150%)",
    transition: "transform 0.3s ease-in-out 0.1s",
  },
};

const [isHovered, setIsHovered] = useState(false);

const buttonStyle = {
  ...styles.button,
  backgroundColor: isHovered ? "#000" : "var(--clr, #7808d0)",
};

const iconWrapperStyle = {
  ...styles.buttonIconWrapper,
  color: isHovered ? "#000" : "var(--clr, #7808d0)",
};

const iconSvgStyle = {
  ...styles.iconSvg,
  transform: isHovered ? "translate(150%, -150%)" : "translate(0)",
};

const iconSvgCopyStyle = {
  ...styles.iconSvgCopy,
  transform: isHovered ? "translate(0)" : "translate(-150%, 150%)",
};
  return (
    <>
        <div div className="sec8-head min-h-[32vh] mt-[50px] flex flex-col items-center  ">
        <h2 className='text-3xl font-semibold text-pink-500'>Insights and Tips</h2>
        <div className='flex flex-col justify-center items-center mt-10'>
        <h1 className='sm:text-4xl md:text-6xl lg:text-8xl'>Find Expert Tips and Growth</h1>
        <h1 className='sm:text-4xl md:text-6xl lg:text-8xl'>Insights on Our Blog</h1>
        </div>
        </div>

        <div className="sec8-news">
          <div className="btns-area flex justify-between mt-9">
            <div className="reg-btn w-[40%] flex gap-4">
            <button className='pl-2 pr-2 bg-white w-[40%] rounded-full border font-semibold text-black transition-all duration-200 ease-in-out hover:text-white hover:bg-gradient-to-r hover:from-[#FEF3F0] hover:via-[#FCCBD6] hover:to-[#EE9BE3]' >All article</button>
            <button className='pl-2 pr-2 bg-white w-[40%] rounded-full border font-semibold text-black transition-all duration-200 ease-in-out hover:text-white hover:bg-gradient-to-r hover:from-[#FEF3F0] hover:via-[#FCCBD6] hover:to-[#EE9BE3]' >News</button>
            <button className='pl-2 pr-2 bg-white w-[40%] rounded-full border font-semibold text-black transition-all duration-200 ease-in-out hover:text-white hover:bg-gradient-to-r hover:from-[#FEF3F0] hover:via-[#FCCBD6] hover:to-[#EE9BE3]' >Interview</button>

            </div>
            <div className="all-news">
            <button
      style={buttonStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span style={iconWrapperStyle}>
        <svg
          viewBox="0 0 14 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          style={iconSvgStyle}
        >
          <path
            d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
            fill="currentColor"
          ></path>
        </svg>

        <svg
          viewBox="0 0 14 15"
          fill="none"
          width="10"
          xmlns="http://www.w3.org/2000/svg"
          style={iconSvgCopyStyle}
        >
          <path
            d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
            fill="currentColor"
          ></path>
        </svg>
      </span>
      Explore All
    </button>
            </div>
          </div>


        <div className="news-area h-[100vh] grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 mt-6 p-5 ">
          <div className="top-news">
        <div className=" img h-[550px] w-[90%] overflow-hidden  rounded-[30px] flex">
       <img  src={require('../../assets/smiling.avif')} className=' object-cover  h-full w-full  ' alt="" />
        </div>
        <div className="desc w-[90%] ">
          <div className="desc-title w-[80%] p-1 ">
            <h1 className='text-6xl'>How to spot recruitment Fraud</h1>
          </div>
          <div className="desc-para w-full text-gray-500 p-1">
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo veniam ab provident incidunt saepe recusandae, reprehenderit amet aut, hic est necessitatibus commodi laboriosam itaque reiciendis. In exercitationem aut earum praesentium iste! Esse numquam pariatur optio vitae, minima asperiores beatae laudantium aspernatur. Nobis dolores hic asperiores minima nihil molestiae molestias illo.</p>
          </div>
          <div className="btn mt-3">
          <button
              className="pl-3 pr-3 h-[60px] w-[170px] bg-black rounded-full font-semibold text-white border transition-all duration-200 ease-in-out hover:text-black hover:bg-white"
            >
            Learn More
            </button>
          </div>
        </div>
          </div>
          <div className="regular-news w-[95%]  h-full flex flex-col gap-5">
  
          {newsCard.map((newsCard,index)=>{
            return(
              <div className="reg-news-1 h-[300px] bg-gray-100 rounded-[30px] overflow-hidden flex gap-3 ">

              <div className="sub-news-img h-full w-[1200px] bg-blue-500 rounded-[30px] overflow-hidden">
            <img src={require('../../assets/top-news.avif')} alt="" />
              </div>
              <div className="sub-news-desc w-[1600px] p-4">
              <h1 className='text-3xl'>Video Interview Tips: Before, During, and After</h1>
              <p className='mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad impedit quo, illum eum vel optio, explicabo possimus voluptatem sed accusamus ipsum officiis eveniet qui rem quam expedita, obcaecati voluptates suscipit! Ut, natus veniam! Hic labore exercitationem consequuntur, eveniet accusantium repellat!</p>
      
              <div className="date justify-end mt-7 flex items-center gap-2">
      
              <CiClock1 /> 28 June 2024
                
              </div>
              </div>
      
              </div>
            )
          })}
      
       
          </div>
          
        </div>
        </div>
       
          
          
        
        
    </>
  )
}

export default Section8
