import React from 'react';
import { CiBookmark } from "react-icons/ci";

function JobCard({ jobs }) {
  // Safely access nested properties
  const companyName = jobs.companyId && jobs.companyId.name ? jobs.companyId.name : "Company";
  const jobDate = jobs.date || "No date";
  
  return (
    <div>
      <div className="card w-[460px] h-[500px] shadow-md flex flex-col p-2 rounded-[30px] border gap-2 border-gray-500">
        {/* Upper Section */}
        <div className={`upper-div h-[70%] bg-[#ffe1cc] p-2 rounded-[30px]`}>
          <div className="date-and-icon flex items-center justify-between">
            <h1 className="px-3 py-2 bg-white rounded-full">{jobDate}</h1>
            <div className="icon px-2 py-2 border rounded-full bg-white cursor-pointer">
              <CiBookmark />
            </div>
          </div>
          <div className="desc-card flex flex-col mt-5">
            <h2 className="font-semibold">{companyName}</h2>
            <div className="title-and-image flex items-center justify-between mt-3">
              <h1 className="text-4xl w-[250px] font-semibold">{jobs.jobTitle || "Job Title"}</h1>
              <img src="" alt={`${companyName} logo`} className="w-12 h-12 rounded-full" />
            </div>
            <div className="job-types flex gap-3 mt-10 w-full flex-wrap">
              {jobs.jobType && Array.isArray(jobs.jobType) ? 
                jobs.jobType.map((type, index) => (
                  <span
                    key={index}
                    className="bg-transparent border border-zinc-500 text-gray-600 text-[14px] px-3 py-1 items-center flex rounded-full"
                  >
                    {type}
                  </span>
                )) : <span>No job types available</span>
              }
            </div>
          </div>
        </div>

        {/* Lower Section */}
        <div className="lower-div h-[28%] rounded-[30px] overflow-hidden px-2 py-3 flex items-center">
          <div className="salary-location w-[50%]">
            <h1 className="text-2xl font-bold">{jobs.salaryRange || "Salary not specified"}/yr</h1>
            <p className="font-bold text-zinc-400">{jobs.jobLocation || "Location not specified"}</p>
          </div>
          <div className="btn w-[50%] flex justify-end p-2">
            <button className="px-4 py-2 bg-black text-white rounded-full">Details</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobCard;