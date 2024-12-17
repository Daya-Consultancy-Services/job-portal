import React from 'react'
import Header from './Header'
import Profile from './Profile'
import News from './News'
// import Header from '../components/Header'

function Home() {
  return (
    <div className='relative bg-[#F8F9FA] min-h-[100vh]'>
      <Header/>

      <div className="main flex h-full w-full   gap-4">
        <div className="profile-sec mt-14  w-[25%]  p-5 flex justify-center ">
          <Profile/>
        </div>
        <div className="job-div  mt-[115px] border border-black w-[50%] h-[300vh]">job</div>
        <div className=" mt-14 fixed right-0 news-div w-[25%] h-screen overflow-y-auto">
          <News/>
        </div>

      </div>

      

        
   
    </div>
  )
}

export default Home
