import React, { useEffect, useMemo, useState } from "react";
import Header from "../../components/Header";
import Sidebar from "./Sidebar";
import Main from "./Main";
import HeadBar from "./HeadBar";
import HomeHeader from "../home/Header";
import { useDispatch, useSelector } from "react-redux";
import { fetchallJob } from "../../operations/userAPI";

function Jobs() {
  const dispatch = useDispatch();
  const selectors = useMemo(() => ({
    selectToken: (state) => state.user.token,
    selectJobs: (state) => state.user.alljob
  }), []);
  
  const token = useSelector(selectors.selectToken);
  const jobs = useSelector(selectors.selectJobs) || [];
  
  console.log("jobs", jobs);
  
  useEffect(() => {
    if (token) {
      dispatch(fetchallJob());
    }
  }, [dispatch, token]);
  
  // State for filtered jobs - initialize with empty array
  const [filteredList, setFilteredList] = useState([]);
  
  // Update filteredList when jobs data changes
  useEffect(() => {
    if (jobs && jobs.length > 0) {
      setFilteredList(jobs);
    }
  }, [jobs]);
  
  const isLogin = true;
  
  return (
    <div>
      <div className="layout-container h-[200vh] flex flex-col">
        {/* Header */}
        <header
          className="relative text-white text-center text-xl font-semibold h-[250px]"
          style={{
            background:
              "linear-gradient(141deg, rgba(254,243,240,1) 5%, rgba(252,203,214,1) 30%, rgba(238,155,227,1) 84%)",
          }}
        >
          {/* Conditional Rendering of Header */}
          {isLogin ? (
            <HomeHeader />
          ) : (
            <Header />
          )}
          <HeadBar />
        </header>
        {/* Main Content */}
        <div className="flex flex-1">
          {/* Sidebar (Aside) */}
          <aside className="w-[20%] p-4 flex justify-center">
            {/* Pass jobs and setFilteredList to Sidebar */}
            <Sidebar jobs={jobs} setFilteredList={setFilteredList} />
          </aside>
          {/* Main Content Area */}
          <main className="flex-1 bg-white p-6">
            {/* Pass filteredList to Main */}
            <Main jobs={filteredList} />
          </main>
        </div>
      </div>
    </div>
  );
}

export default Jobs;