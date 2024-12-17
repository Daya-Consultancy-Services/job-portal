import React from 'react'
import { TbNotes } from "react-icons/tb";
import { MdOutlineUploadFile } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { TbUserCheck } from "react-icons/tb";
function Section6() {
    const videoCard = [
        {
            videoUrl: "url",
            icon:<TbNotes style={{height:"70px",width:"70px"}}/>,
            title: "Complete Your Profile",
          
            description: "Complete your profile so that recruiters can see information of you"
    },
        {
            videoUrl: "url",
            icon:<MdOutlineUploadFile style={{height:"70px",width:"70px"}}/>,
            title: "Directly Portfolio Upload",
            description: "You can upload your resume or CV, and recruiters will reviewed"
    },
        {
            videoUrl: "url",
            icon:<SlCalender style={{height:"70px",width:"70px"}}/>,
            title: "Scheduling Interview",
            description: "You can schedule your interview with the recruiters"
    },
        {
            videoUrl: "url",
            icon:<TbUserCheck style={{height:"70px",width:"70px"}}/>,
            title: "Selected Candidate",
            description: "Selected candidate can entry the company for interview with recruiter"
    },
]
  return (
    <>
      <div div className="sec6-head mt-[50px] flex flex-col items-center ">
        <h2 className='text-3xl font-semibold text-pink-500'>Simple Process</h2>
        <div className='flex flex-col justify-center items-center mt-10'>
        <h1 className='text-8xl'>Effortless Process,</h1>
        <h1 className='text-8xl'>Optimal Results</h1>
        </div>
        </div>

        <div className="mt-16 grid-temp h-[220vh] w-full flex flex-col gap-[20px] items-center">
        {videoCard.map((card, index)=>{
                    return(
                        <div className="grid-item-1 h-[70vh] w-full flex gap-10">
             
                        <div className="video h-full w-[45%] bg-zinc-200 border rounded-[30px]"><video src="#"></video></div>
                        <div className="vid-instr w-[40%] h-full flex justify-center items-center relative ">
                            <div className="instr">
                                <div className="icon " >{card.icon}  </div>
                                <h2 className='min-h-[30px] w-[240px]  sm:text-[25px] md:text-[30px] lg:text-[40px] py-3 font-semibold'>{card.title}</h2>
                                <p className=' min-h-fit w-[220px] font-semibold text-gray-500 sm:text-[10px] md:text-[15px] lg:text-[20px]'>{card.description}</p>
                            </div>
                        </div>
                    </div>
                    )
                })}

        </div>
    </>
  )
}

export default Section6
