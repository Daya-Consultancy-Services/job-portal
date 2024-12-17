import React, { useState } from 'react';
import { SiTicktick } from "react-icons/si";
import { Link } from 'react-router-dom';
import { IoBriefcaseOutline } from "react-icons/io5";
import { TbBuildings } from "react-icons/tb";
import { LuBookOpen } from "react-icons/lu";
function Profile() {
  const [profileImage, setProfileImage] = useState(require('../../assets/profile.png'));

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setProfileImage(imageURL);
    }
  };

  return (
    <>
      <div className="fixed mt-10 profile-div h-[80%] w-[400px] bg-white shadow-lg rounded-lg flex flex-col items-center">
        <div className="img-name h-[25%] w-full flex flex-col items-center">
          {/* Image Div */}
          <div className="img h-[60%] w-[30%] rounded-full mt-3 overflow-hidden relative group">
            <img className="h-full w-full object-cover" src={profileImage} alt="Profile" />
            {/* Overlay for Upload */}
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <label
                htmlFor="imageUpload"
                className="text-white text-sm rounded cursor-pointer"
              >
                Upload Image
              </label>
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
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
