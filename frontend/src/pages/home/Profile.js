import React, { useEffect, useState } from 'react';
import { SiTicktick } from "react-icons/si";
import { Link } from 'react-router-dom';
import { IoBriefcaseOutline } from "react-icons/io5";
import { TbBuildings } from "react-icons/tb";
import { LuBookOpen } from "react-icons/lu";
import { fetchImageResume, fetchProfileImage } from '../../operations/profileAPI';
import { useDispatch, useSelector } from 'react-redux';
function Profile() {
  const image = useSelector((state) => state.profile.imageResume?.image)
  const token = useSelector((state)=> state.user.token)
  const user = useSelector((state)=> state.profile.user)

  const dispatch = useDispatch();

  useEffect(()=>{
    if (token && user) {
            dispatch(fetchImageResume(token));
        }
  }, [dispatch, token])

 

  return (
    <>
      <div className="fixed mt-10 profile-div h-[80%] w-[400px] bg-white shadow-lg rounded-lg flex flex-col items-center">
        <div className="img-name h-[25%] w-full flex flex-col items-center">
          {/* Image Div */}
          <div className="img h-[60%] w-[30%] rounded-full mt-3 overflow-hidden relative group">
          <img className="h-full w-full object-cover" src={image || require("../../assets/default-profile.jpg")} alt="image" />
        
          </div>

          {/* Name */}
          <h1 className="mt-3 font-semibold">Ladukishor Subudhi</h1>
        </div>
        <div className="info w-[80%] h-[40%] bg-[#FFF5F5] rounded-xl  p-4">
            <h1 className='text-center font-semibold text-xl mb-3'>What are you missing?</h1>
            <div className="info-1 p-2 flex items-center gap-4">
            <SiTicktick  className='h-5 w-5 text-red-700'/>
            <p>Daily job Recomendations</p>
            </div>
            <div className="info-2 p-2 flex items-center gap-4">
            <SiTicktick  className='h-5 w-5 text-red-700'/>
            <p>Job application updates</p>
            </div>
            <div className="info-3 p-2 flex items-center gap-4">
            <SiTicktick  className='h-5 w-5 text-red-700'/>
            <p>Direct jobs from recruiters</p>
            </div>

            <div className="btn flex items-center justify-center mt-5">
                <Link to="#">
            <button className='px-4 py-2 rounded-full bg-orange-600 text-white font-semibold hover:bg-orange-700'>Create Profile</button>
                </Link>

            </div>

    

        </div>
        <div className="page mt-6 flex flex-col gap-5 w-[80%]  pb-5 border-b-[0.3px] border-zinc-200">
            <div className="jobs">
                <Link><div className="btn font-semibold flex items-center gap-5 border border-zinc-200 rounded-full px-4 py-2 hover:bg-zinc-100 ">
                <IoBriefcaseOutline />
                Jobs
                    </div></Link>
            </div>
            <div className="companies">
            <Link><div className="btn font-semibold flex items-center gap-5 border border-zinc-200 rounded-full px-4 py-2 hover:bg-zinc-100 ">
            <TbBuildings />
                Companies
                    </div></Link>
            </div>
            <div className="blogs">
            <Link><div className="btn font-semibold flex items-center gap-5 border border-zinc-200 rounded-full px-4 py-2 hover:bg-zinc-100 ">
            <LuBookOpen />
                Blogs
                    </div></Link>
            </div>
        </div>
        <Link>
        <h1 className='text-center mt-2 text-zinc-500'>How OneCareer Works?</h1>
        </Link>
      </div>
    </>
  );
}

export default Profile;
