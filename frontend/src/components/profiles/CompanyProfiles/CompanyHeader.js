import React from 'react'
import { CiSearch } from 'react-icons/ci'
import { GoBellFill } from 'react-icons/go'
import { Link } from 'react-router-dom'


function CompanyHeader() {
  return (
    <div className="fixed bg-white h-[80px] w-full flex items-center justify-center shadow-md z-[90]">
    <div className='h-full w-[70%] flex items-center pl-2 pr-2 justify-between'>
        <Link to="/home">
            <div className="logo h-full w-[10%]">
                <img className='scale-[1.5] mt-1' src={require("../../../assets/logo.png")} alt="" />
            </div>
        </Link>

        <div className="section h-full w-[30%] flex items-center justify-center gap-8">
            <div className="jobs">
                <Link to="/jobs">
                    <h1 className='text-black font-thin'>Jobs</h1>
                </Link>
            </div>
            <div className="companies">
                <Link>
                    <h1 className='text-black font-thin'>Companies</h1>
                </Link>
            </div>
            <div className="service">
                <Link>
                    <h1 className='text-black font-thin'>Services</h1>
                </Link>
            </div>
        </div>

        <div className="relative border search-bar p-4 flex h-[60%] w-[20%] justify-center items-center bg-white rounded-full">
            <input
                type="text"
                placeholder="Search..."
                className="bg-white outline-none text-gray-700 w-full rounded-full pl-3"
            />
            <button className="absolute right-3 text-white scale-[1.5] p-1 bg-black rounded-full">
                <CiSearch />
            </button>
        </div>

        <div className="profile h-full w-[15%] flex items-center justify-between">
            <div className="notification h-full w-[50%] flex justify-end items-center">
                <div className="icon h-[30px] w-[30px]">
                    <GoBellFill className='h-full w-full' />
                </div>
            </div>
            {/* <div className="h-full w-[90%] flex justify-center items-center">
                <Link to={}>
                    <div className="h-[45px] w-[45px] rounded-full border border-zinc-300 overflow-hidden">
                        <img 
                            className="h-full w-full object-cover" 
                            src={image || require("../../assets/default-profile.jpg")} 
                            alt="profile" 
                        />
                    </div>
                </Link>
            </div> */}
        </div>
    </div>
</div>
  )
}

export default CompanyHeader
