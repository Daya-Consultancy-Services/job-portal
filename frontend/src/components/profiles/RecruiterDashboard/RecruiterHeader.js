
import React from 'react'
import { GoBellFill } from 'react-icons/go'
import { Link } from 'react-router-dom'


function RecruiterHeader() {
  return (
    <div className="fixed bg-white h-[80px] w-full flex items-center justify-center shadow-md z-[90]">
    <div className='h-full w-[70%] flex items-center pl-2 pr-2 justify-between'>
        <div className="h-full w-16 flex justify-center items-center">
        <Link>
            <div className="logo h-full ">
                <img className='scale-[1.5] mt-1' src={require("../../../assets/logo.png")} alt="" />
            </div>
        </Link>
        </div>
        

        <div className="section h-full w-[30%] flex items-center justify-center gap-8 ">
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

        <div className="search">
            <Link to="/components/AdvanceSearch">
            <h1 className="text-blue-400">search candidate</h1>
            </Link>
        </div>

    </div>
</div>
  )
}

export default RecruiterHeader
