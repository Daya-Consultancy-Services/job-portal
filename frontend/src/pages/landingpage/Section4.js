import React, { useState } from 'react';

function Section4() {
  const btns = [
    "UI/UX Design",
    "Sales",
    "Development",
    "Analytics",
    "Digital Media Specialist",
    "Data Operator",
    "Project Management",
    "Others"
  ];

  const cardInfo = [
    {
      image: "url",
      imgTitle: "Image Title 1",
      title: "Card Title 1",
      location: "Location 1",
      workTime: "Full Time",
      workType: "Remote",
      salary: "$40k - $60k",
    },
    {
      image: "url",
      imgTitle: "Image Title 2",
      title: "Card Title 2",
      location: "Location 2",
      workTime: "Part Time",
      workType: "On-site",
      salary: "$25k - $35k",
    },
    {
      image: "url",
      imgTitle: "Image Title 3",
      title: "Card Title 3",
      location: "Location 3",
      workTime: "Freelance",
      workType: "Hybrid",
      salary: "$30k - $50k",
    },
    {
      image: "url",
      imgTitle: "Image Title 4",
      title: "Card Title 4",
      location: "Location 4",
      workTime: "Contract",
      workType: "Remote",
      salary: "$45k - $65k",
    },
    {
      image: "url",
      imgTitle: "Image Title 5",
      title: "Card Title 5",
      location: "Location 5",
      workTime: "Full Time",
      workType: "On-site",
      salary: "$50k - $70k",
    },
    {
      image: "url",
      imgTitle: "Image Title 6",
      title: "Card Title 6",
      location: "Location 6",
      workTime: "Part Time",
      workType: "Hybrid",
      salary: "$20k - $40k",
    },
  ];

  const [visibleCards, setVisibleCards] = useState(2);

  const handleShowMore = () => {
    setVisibleCards((prev) => prev + 2);
  };

  return (
    <>
      <div className="btns h-[300px] w-full flex flex-wrap gap-[20px] p-4 justify-center items-center">
        <div className="w-[60%] h-full flex flex-wrap gap-7 p-4 justify-center">
          {btns.map((btn, index) => (
            <button
              key={index}
              className="pl-2 pr-2 h-[60px] w-[170px] bg-white rounded-full font-semibold text-black border transition-all duration-200 ease-in-out hover:text-white hover:bg-gradient-to-r hover:from-[#FEF3F0] hover:via-[#FCCBD6] hover:to-[#EE9BE3]"
            >
              {btn}
            </button>
          ))}
        </div>
      </div>

      <div className="cards-section  w-full flex flex-col items-center mt-[80px]">
        <div className="cards-container grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 w-[60%] ">
          {cardInfo.slice(0, visibleCards).map((card, index) => (
            <div
              key={index}
              className="card w-full h-[360px] bg-gray-100 shadow-md rounded-[30px] p-4 flex flex-col justify-between hover:bg-red-100 cursor-pointer"
            >
              <div className=" bg-white  h-[90%] rounded-[30px] flex  p-3 flex-col">
                <div className="image&title h-[25%] w-full flex items-center pl-3 pr-3 border-b-[0.1px] border-gray-300">
                    <div className="img flex items-center gap-3">
                    <span><img src="#" alt="card-img"  className='h-[60px] w-[60px] bg-yellow-100 rounded-full'/></span>
                    <p className='font-semibold text-[25px]'>Gojek</p>
                    </div>
                    <div className="save-icon">
                        <i>  </i>   {/* icon will be insert here */}
                    </div>
                
                </div>
              <div className="card-details p-2">
                <h2 className="font-bold text-xl mt-2">{card.title}</h2>
                <div className='grid grid-cols-2 mt-2'>
                    <div className="location&type">
                    <p className="text-gray-500 mt-1">{card.location}</p>
                    <p className="text-gray-500 mt-1">{card.workType}</p>
                    </div>
                    <div className="worktime&salary">
                    <p className="text-gray-500 mt-1">{card.workTime}</p>
                    <p className="text-gray-500 mt-1">{card.salary}</p>
                    </div>

                   
                </div>
                <div className="card-btn w-full mt-4 h-[50px] ">
                        <button className='h-full w-full bg-black rounded-full text-white'>Apply</button>
                    </div>
                
            
              </div>
              </div>
              <div className='flex justify-center text-slate-400 font-semibold'>Posted 1 month ago</div>
             
            </div>
          ))}
        </div>

        {visibleCards < cardInfo.length && (
          <button
            onClick={handleShowMore}
            className="mt-6 px-6 py-2 bg-white text-black font-semibold rounded-full hover:bg-blue-700 hover:text-white hover:border-0 border border-black transition duration-300"
          >
            Show More
          </button>
        )}
      </div>
    </>
  );
}

export default Section4;
