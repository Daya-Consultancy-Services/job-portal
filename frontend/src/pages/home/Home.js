// import React, { useEffect, useMemo } from 'react'
// import Header from './Header'
// import Profile from './Profile'
// import News from './News'
// import { useDispatch, useSelector } from 'react-redux'
// import { fetchallJob } from '../../operations/userAPI'

// function Home() {

//   const dispatch = useDispatch();
//   const selectors = useMemo(()=>(
//     {
//       selectToken: (state)=> state.user.token,
//       selectJobs: (state) => state.user.alljob
//     }
//   ), []);

//   const token = useSelector(selectors.selectToken);
//   const jobs = useSelector(selectors.selectJobs);
//   console.log("jobs in the main page",jobs);

//   useEffect(()=>{
//     if(token){
//       dispatch(fetchallJob(token));
//     }
//   }, [dispatch, token]);
  
//   return (
//     <div className='relative bg-[#F8F9FA] min-h-[100vh]'>
//       <Header/>

//       <div className="main flex h-full w-full   gap-4">
//         <div className="profile-sec mt-14  w-[25%]  p-5 flex justify-center ">
//           <Profile/>
//         </div>
//         <div className="job-div  mt-[115px] border border-black w-[50%] h-[300vh]">
//           job

//           </div>
//         <div className=" mt-14 fixed right-0 news-div w-[25%] h-screen overflow-y-auto">
//           <News/>
//         </div>

//       </div>

      

        
   
//     </div>
//   )
// }

// export default Home

import React, { useEffect, useMemo } from 'react'
import Header from './Header'
import Profile from './Profile'
import News from './News'
import JobListings from './JobListing'  // Import the new component
import { useDispatch, useSelector } from 'react-redux'
import { fetchallJob } from '../../operations/userAPI'

function Home() {
  const dispatch = useDispatch();
  const selectors = useMemo(()=>(
    {
      selectToken: (state)=> state.user.token,
      selectJobs: (state) => state.user.alljob
    }
  ), []);
  const token = useSelector(selectors.selectToken);
  const jobs = useSelector(selectors.selectJobs);
  const userRole = localStorage.getItem('userType');
  // console.log("user type",userType)

  useEffect(()=>{
    if(token){
      dispatch(fetchallJob(token));
    }
  }, [dispatch, token]);
 
  return (
    <div className='relative bg-[#F8F9FA] min-h-[100vh]'>
      <Header/>
      <div className="main flex h-full w-full gap-4 ">
        <div className="profile-sec mt-14 w-[25%] p-5 flex justify-center">
          <Profile/>
        </div>
        <div className="job-div mt-[115px] w-[50%] bg-white rounded-lg overflow-y-auto">
          <JobListings jobs={jobs} userRole={userRole} />
        </div>
        <div className="mt-14 fixed right-0 news-div w-[25%] h-screen overflow-y-auto z-[60]">
          <News/>
        </div>
      </div>
    </div>
  )
}

export default Home
