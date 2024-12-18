import React, { useState } from "react";
import Header from "../../components/Header";
import Sidebar from "./Sidebar";
import Main from "./Main";
import HeadBar from "./HeadBar";
import HomeHeader from "../home/Header";

function Jobs() {

  
  
  const cards = [
    {
      date: "2024-12-16",
      company: "Amazon",
      role: "Senior UI/UX Designer",
      companyLogo: "company-logo",
      workingSchedule: "Part-time",
      typeofJob: ["Remote", "Part-time","intern"],
      employmentType: "Remote",
      salary: "1.5 lakh to 3 lakh",
      location: "Remote",
    },
    {
      date: "2024-12-15",
      company: "Google",
      role: "Junior UI/UX Designer",
      companyLogo: "company-logo",
      typeofJob: ["Remote", "Part-time", "full time"],
      workingSchedule: "Full-time",
      employmentType: "Distant work",
      salary: "400000",
      location: "San Francisco",
    },
    {
      date: "2024-12-14",
      company: "Dribble",
      role: "Senior Motion Designer",
      companyLogo: "company-logo",
      typeofJob: ["Remote", "Part-time"],
      workingSchedule: "Part-time",
      employmentType: "Shift work",
      salary: "350000",
      location: "New York",
    },
  ];

  // State for filtered jobs
  const [filteredList, setFilteredList] = useState(cards);
  const isLogin = true;

  return (
    <div>
     
      <div className="layout-container h-[200vh] flex flex-col">
        {/* Header */}
        <header
          className="relative text-white text-center  text-xl font-semibold h-[250px]"
          style={{
            background:
              "linear-gradient(141deg, rgba(254,243,240,1) 5%, rgba(252,203,214,1) 30%, rgba(238,155,227,1) 84%)",
          }}
        >
           
       {/* Conditional Rendering of Header */}
       {isLogin ? (
            <HomeHeader />
          ) : (
           <Header/>
          )}
          <HeadBar />
        </header>

        {/* Main Content */}
        <div className="flex flex-1">
          {/* Sidebar (Aside) */}
          <aside className="w-[20%] p-4 flex justify-center">
            {/* Pass cards and setFilteredList to Sidebar */}
            <Sidebar jobs={cards} setFilteredList={setFilteredList} />
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 bg-white p-6">
            {/* Pass filteredList to Main */}
            <Main cards={filteredList} />
          </main>
        </div>
      </div>
    </div>
  );
}

export default Jobs;
