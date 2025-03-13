import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";

function Main({ jobs = [] }) { // Provide default empty array
  console.log("Main component jobs:", jobs);
  
  // Initialize noofPosts state safely
  const [noofPosts, setNoofPosts] = useState(0);
  
  useEffect(() => {
    // Update noofPosts whenever jobs changes
    setNoofPosts(jobs.length || 0);
  }, [jobs]);
  
  return (
    <>
      {/* Header Section */}
      <div className="main-heading flex w-full h-[60px] justify-between items-center">
        <div className="heading-no-of-post flex items-center gap-5">
          {/* Main heading and number of posts */}
          <h1 className="text-3xl font-bold h-[40px]">Recommended jobs</h1>
          <div className="posts px-3 py-1 rounded-full border border-black">
            <h1 className="text-xl font-semibold">{noofPosts}</h1>
          </div>
        </div>
      </div>
      {/* Card Section */}
      <div className="card-section flex flex-wrap gap-4 mt-6">
        {/* Check if jobs has items before mapping */}
        {jobs && jobs.length > 0 ? (
          jobs.map((job, index) => (
            <JobCard key={index} jobs={job} />
          ))
        ) : (
          <div className="col-span-3 text-center text-xl mt-10">
            No jobs available. Please check your data source or try again later.
          </div>
        )}
      </div>
    </>
  );
}

export default Main;