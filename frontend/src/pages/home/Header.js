import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { GoBellFill } from "react-icons/go";
import { CiSearch } from "react-icons/ci";

function Header() {
   
        const [isSearchOpen, setIsSearchOpen] = useState(false);
      
        const toggleSearch = () => {
          setIsSearchOpen(!isSearchOpen);
        };
  return (
    <div className=" fixed bg-white h-[80px] w-full flex items-center justify-center  shadow-md">
        <div className='h-full w-[70%]  flex items-center pl-2 pr-2 justify-between '>
      <div className="logo h-full w-[10%]">
        <img className='h-full scale-[1.5] mt-1' src={require("../../assets/logo.png")} alt="" />
      </div>
      <div className="section h-full w-[30%] flex items-center justify-center gap-8">
        <div className="jobs  ">
            <Link to="/jobs">
            <h1 className='  '>Jobs</h1>
            </Link>
        </div>
        <div className="companies">   <Link>
            <h1 className='  '>Companies</h1>
            </Link></div>
        <div className="service">   <Link>
            <h1 className='  '>Services</h1>
            </Link></div>
      </div>

      <div className="relative border search-bar p-4 flex h-[60%] w-[20%] justify-center items-center bg-white rounded-full">
      <input
          type="text"
          placeholder="Search..."
          className="bg-white h-[100%] outline-none text-gray-700 w-full rounded-full pl-3"
          
        />
        <button className="absolute right-3 text-white scale-[1.5] p-1 bg-black rounded-full">
        <CiSearch />
        </button>
      </div>

      
      <div className="profile h-full w-[15%] flex items-center justify-between ">
        <div className="notification h-full w-[50%] flex justify-end items-center">
            <div className="icon h-[30px] w-[30px] ">
            <GoBellFill className='h-full w-full ' />
            </div>
        </div>
        <div className=" h-full w-[90%] flex justify-center items-center">
            <Link to="/components/profiles/UserProfile">
            <div className="h-[45px] w-[45px] rounded-full border border-zinc-300 overflow-hidden" >
                <img src={require("../../assets/default-profile.jpg")} alt="" />
            </div>
            </Link>
           
            
        </div>
      </div>
    </div>
    </div>
    
  )
}

export default Header
