import React, { useEffect, useState } from "react";
import JobCard from "./JobCard"; 


function Main({cards=[]}) { 

  // Initialize noofPosts to the length of cards
  const [noofPosts, setNoofPosts] = useState(cards.length);

  useEffect(() => {
    // Update noofPosts whenever cards changes
    setNoofPosts(cards.length);
  }, [cards]);



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
      <div className="card-section min-h-[160vh] grid grid-cols-3 gap-4">
        {/* Check if cards is defined before mapping */}
        {cards.length > 0 ? (
          cards.map((card, index) => (
            <JobCard key={index} card={card} />
          ))
        ) : (
          <div>No jobs available</div> // Fallback UI if no jobs
        )}
    
      </div>
    </>
  );
}

export default Main;