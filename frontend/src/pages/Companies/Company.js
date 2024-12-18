import React, { useState } from 'react';
import Header from '../home/Header';
import Slider from './Slider';
import SideBar from './SideBar';
import Footer from '../../components/Footer';
import Main from './Main';

function Company() {
  const compCard = [
    {
      companylogo: "company-logo-1.png",
      companyname: "Company One",
      reviews: "110 reviews",
      type: {
        type1: "Technology",
        type2: "AI",
      },
      location: "bhubaneswar",
      industry: "IT Services & Consulting",
      department: "Engineering - Software & QA",
      natureOfBusiness: "B2C",
      jobPostingdate: "<15Days",
    },
    {
      companylogo: "company-logo-2.png",
      companyname: "Company Two",
      reviews: "210 reviews",
      type: {
        type1: "Technology",
        type2: "AI",
      },
      location: "bhubaneswar",
      industry: "IT Services & Consulting",
      department: "Engineering - Software & QA",
      natureOfBusiness: "B2C",
      jobPostingdate: "<7Days",
    },
    {
      companylogo: "company-logo-3.png",
      companyname: "Company Three",
      reviews: "310 reviews",
      type: {
        type1: "Technology",
        type2: "AI",
      },
      location: "bhubaneswar",
      industry: "IT Services & Consulting",
      department: "Engineering - Software & QA",
      natureOfBusiness: "B2C",
      jobPostingdate: "<15Days",
    },
  ];

  // Default state for displaying all cards
  const [compFilteredList, setCompFilteredList] = useState(compCard);

  return (
    <div className="bg-slate-50">
      {/* Fixed Header */}
      <div className="header fixed z-[99999]">
        <Header />
      </div>
      <div className="layout-container min-h-[200vh] w-full flex flex-col items-center z-[-1]">
        <div className="h-[80px] bg-red-400"></div>
        <div className="w-full min-h-[100vh] flex flex-col items-center mx-auto">
          {/* Page Header */}
          <header className="w-[60%] text-black p-4 text-xl font-semibold h-[300px] flex items-start flex-col justify-center gap-7">
            <h1 className="font-semibold text-2xl">Top companies hiring now</h1>
            <div className="slider w-full rounded-2xl overflow-hidden">
              <Slider />
            </div>
          </header>
          {/* Main Content */}
          <div className="flex flex-1 w-[60%]">
            {/* Sidebar (Aside) */}
            <aside className="w-[25%] p-4 flex justify-center">
              <SideBar
                company={compCard}
                setCompFilteredList={setCompFilteredList}
              />
            </aside>
            {/* Main Content Area */}
            <main className="flex-1 w-[75%] p-6">
              {/* Pass filtered list to Main */}
              <Main compCards={compFilteredList} />
            </main>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="w-full bg-red-600 footer">
        <Footer />
      </div>
    </div>
  );
}

export default Company;
