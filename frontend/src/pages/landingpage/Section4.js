import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Section4() {
  const categories = [
    "All Jobs",
    "UI/UX Design",
    "Sales",
    "Development",
    "Analytics",
    "Digital Media Specialist",
    "Data Operator",
    "Project Management",
    "Others"
  ];

  // Enhanced card info with categories
  const jobsData = [
    {
      image: "url",
      imgTitle: "Image Title 1",
      title: "UX Designer",
      location: "San Francisco",
      workTime: "Full Time",
      workType: "Remote",
      salary: "$70k - $90k",
      category: "UI/UX Design",
      company: "Gojek"
    },
    {
      image: "url",
      imgTitle: "Image Title 2",
      title: "UI Designer",
      location: "New York",
      workTime: "Part Time",
      workType: "On-site",
      salary: "$60k - $75k",
      category: "UI/UX Design",
      company: "Dribbble"
    },
    {
      image: "url",
      imgTitle: "Image Title 3",
      title: "Sales Representative",
      location: "Chicago",
      workTime: "Full Time",
      workType: "Hybrid",
      salary: "$45k - $60k",
      category: "Sales",
      company: "Salesforce"
    },
    {
      image: "url",
      imgTitle: "Image Title 4",
      title: "Frontend Developer",
      location: "Austin",
      workTime: "Contract",
      workType: "Remote",
      salary: "$80k - $110k",
      category: "Development",
      company: "Meta"
    },
    {
      image: "url",
      imgTitle: "Image Title 5",
      title: "Data Analyst",
      location: "Boston",
      workTime: "Full Time",
      workType: "On-site",
      salary: "$65k - $85k",
      category: "Analytics",
      company: "Google"
    },
    {
      image: "url",
      imgTitle: "Image Title 6",
      title: "Social Media Manager",
      location: "Los Angeles",
      workTime: "Part Time",
      workType: "Hybrid",
      salary: "$40k - $60k",
      category: "Digital Media Specialist",
      company: "TikTok"
    },
    {
      image: "url",
      imgTitle: "Image Title 7",
      title: "Backend Developer",
      location: "Seattle",
      workTime: "Full Time",
      workType: "Remote",
      salary: "$90k - $120k",
      category: "Development",
      company: "Amazon"
    },
    {
      image: "url",
      imgTitle: "Image Title 8",
      title: "Data Entry Specialist",
      location: "Atlanta",
      workTime: "Part Time",
      workType: "Remote",
      salary: "$30k - $45k",
      category: "Data Operator",
      company: "IBM"
    },
    {
      image: "url",
      imgTitle: "Image Title 9",
      title: "Project Manager",
      location: "Dallas",
      workTime: "Full Time",
      workType: "On-site",
      salary: "$75k - $95k",
      category: "Project Management",
      company: "Microsoft"
    },
    {
      image: "url",
      imgTitle: "Image Title 10",
      title: "Content Writer",
      location: "Denver",
      workTime: "Freelance",
      workType: "Remote",
      salary: "$40k - $65k",
      category: "Others",
      company: "Upwork"
    }
  ];

  const [visibleCards, setVisibleCards] = useState(2);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Jobs");

  const handleShowMore = () => {
    setVisibleCards((prev) => prev + 2);  // Show 2 more cards at a time
  };

  const handleApply = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setVisibleCards(2); // Reset to show only first 2 cards when changing category
  };

  // Filter jobs based on selected category
  const filteredJobs = selectedCategory === "All Jobs" 
    ? jobsData 
    : jobsData.filter(job => job.category === selectedCategory);

  return (
    <>
      <div className="btns h-[300px] w-full flex flex-wrap gap-[20px] p-4 justify-center items-center">
        <div className="w-[60%] h-full flex flex-wrap gap-7 p-4 justify-center">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`pl-2 pr-2 h-[60px] w-[170px] rounded-full font-semibold border transition-all duration-200 ease-in-out 
                ${selectedCategory === category 
                  ? 'bg-gradient-to-r from-[#FEF3F0] via-[#FCCBD6] to-[#EE9BE3] text-white'
                  : 'bg-white text-black hover:text-white hover:bg-gradient-to-r hover:from-[#FEF3F0] hover:via-[#FCCBD6] hover:to-[#EE9BE3]'
                }`}
              onClick={() => handleCategorySelect(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="cards-section w-full flex flex-col items-center mt-[80px]">
        {filteredJobs.length === 0 ? (
          <div className="flex flex-col items-center p-10">
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No jobs found</h3>
            <p className="text-gray-500">No jobs available in this category at the moment.</p>
          </div>
        ) : (
          <>
            <div className="cards-container grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 w-[60%]">
              {filteredJobs.slice(0, visibleCards).map((job, index) => (
                <div
                  key={index}
                  className="card w-full h-[360px] bg-gray-100 shadow-md rounded-[30px] p-4 flex flex-col justify-between hover:bg-red-100 transition-colors duration-300 cursor-pointer"
                >
                  <div className="bg-white h-[90%] rounded-[30px] flex p-3 flex-col">
                    <div className="image&title h-[25%] w-full flex items-center justify-between pl-3 pr-3 border-b-[0.1px] border-gray-300">
                      <div className="img flex items-center gap-3">
                        <span><img src="#" alt="card-img" className='h-[60px] w-[60px] bg-yellow-100 rounded-full'/></span>
                        <p className='font-semibold text-[25px]'>{job.company}</p>
                      </div>
                      <div className="save-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 hover:text-black cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                      </div>
                    </div>
                    <div className="card-details p-2">
                      <h2 className="font-bold text-xl mt-2">{job.title}</h2>
                      <span className="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs mt-1">{job.category}</span>
                      <div className='grid grid-cols-2 mt-2'>
                        <div className="location&type">
                          <p className="text-gray-500 mt-1">{job.location}</p>
                          <p className="text-gray-500 mt-1">{job.workType}</p>
                        </div>
                        <div className="worktime&salary">
                          <p className="text-gray-500 mt-1">{job.workTime}</p>
                          <p className="text-gray-500 mt-1">{job.salary}</p>
                        </div>
                      </div>
                      <div className="card-btn w-full mt-4 h-[50px] ">
                        <button 
                          onClick={handleApply}
                          className='h-full w-full bg-black rounded-full text-white hover:bg-gray-800 transition duration-300'
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className='flex justify-center text-slate-400 font-semibold'>Posted 1 month ago</div>
                </div>
              ))}
            </div>

            {visibleCards < filteredJobs.length && (
              <button
                onClick={handleShowMore}
                className="mt-6 px-6 py-2 bg-white text-black font-semibold rounded-full hover:bg-blue-700 hover:text-white hover:border-0 border border-black transition duration-300"
              >
                Show More
              </button>
            )}
          </>
        )}
      </div>

      {/* Login/Signup Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative">
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <h2 className="text-2xl font-bold text-center mb-6">Almost there!</h2>
            <p className="text-gray-600 text-center mb-8">
              You need to create an account or login to apply for this job
            </p>
            
            <div className="flex flex-col gap-4">
              <Link to="/components/auth/User/login" className="w-full flex items-center justify-center py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition duration-300">
                Login
              </Link>
              <Link to="/components/auth/User/register" className="w-full py-3 flex items-center justify-center bg-white text-black border border-black rounded-full font-semibold hover:bg-gray-100 transition duration-300">
                Create Account
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Section4;