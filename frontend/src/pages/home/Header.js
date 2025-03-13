

// import React, { useEffect, useState, useRef } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { GoBellFill } from "react-icons/go";
// import { CiSearch } from "react-icons/ci";
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchExtraProfile } from '../../operations/profileAPI';
// import { logout } from '../../operations/userAPI';
// import { fetchRecruiter } from '../../operations/recruiterAPI';
// import { fetchCompany } from '../../operations/companyAPI';

// function HomeHeader() {
//     const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//     const dropdownRef = useRef(null);
//     const navigate = useNavigate();
    
//     const dispatch = useDispatch();
    
//     // const user = useSelector((state) => state.profile.user)
//       const userType = localStorage.getItem('userType');
//     const token = useSelector((state) => {
//         switch(userType){
//             case 'Recruiter':
//                 return state.recruiter.token;
//             case 'Company':
//                 return state.company.token;
//             default:
//                 return state.profile.token;
//         }
//     })

//     console.log(token);
    
  
    
//     // Select the appropriate profile image based on userType
//     const profileImage = useSelector((state) => {
//         switch(userType) {
//             case 'Company':
//                 return state.company.company?.logo;
//             case 'Recruiter':
//                 return state.user.recruiterProfile?.image;
//             default:
//                 return state.profile.extraprofile?.image;
//         }
//     });

//     useEffect(() => {
//         if (token) {
//             switch(userType){
//                 case 'Recruiter':
//                     dispatch(fetchRecruiter(token));
//                     break;
//                 case 'Company':
//                     dispatch(fetchCompany(token));
//                     break;
//                 default:
//                     dispatch(fetchExtraProfile(token));
//                     break;
//             }
//         }
//     }, [dispatch, token, userType])

//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//                 setIsDropdownOpen(false);
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => document.removeEventListener('mousedown', handleClickOutside);
//     }, []);

//     const getProfileLink = () => {
//               if (userType === 'Recruiter') {
//                return "/components/profiles/RecruiterDashboard/Dashboard";
//            }else if(userType === 'Company'){
//                 return "/components/profiles/CompanyProfiles/CompanyProfile"
//            }
//            else{
//             return  "/components/profiles/UserProfile";

//            } 
               
//           };

//     // Function to get the appropriate default profile image based on userType
//     const getDefaultProfileImage = () => {
//         switch (userType) {
//             case 'Company':
//                 return require("../../assets/default-profile.jpg");
//             case 'Recruiter':
//                 return require("../../assets/default-profile.jpg");
//             default:
//                 return require("../../assets/default-profile.jpg");
//         }
//     };

//     const handleLogout = () => {
//         dispatch(logout(navigate));
//     };

//     return (
//         <div className="fixed bg-white h-[80px] w-full flex items-center justify-center shadow-md z-[99999999]">
//             <div className='h-full w-[70%] flex items-center pl-2 pr-2 justify-between'>
//                 <Link to="/home">
//                     <div className="logo h-full w-[10%]">
//                         <img className='scale-[1.5] mt-1' src={require("../../assets/logo.png")} alt="" />
//                     </div>
//                 </Link>

//                 <div className="section h-full w-[30%] flex items-center justify-center gap-8">
//                     <div className="jobs">
//                         <Link to="/jobs">
//                             <h1 className='text-black font-thin'>Jobs</h1>
//                         </Link>
//                     </div>
//                     <div className="companies">
//                         <Link>
//                             <h1 className='text-black font-thin'>Companies</h1>
//                         </Link>
//                     </div>
//                     <div className="service">
//                         <Link>
//                             <h1 className='text-black font-thin'>Services</h1>
//                         </Link>
//                     </div>
//                 </div>

//                 <div className="relative border search-bar p-4 flex h-[60%] w-[20%] justify-center items-center bg-white rounded-full">
//                     <input
//                         type="text"
//                         placeholder="Search company, jobs, skills"
//                         className="bg-white outline-none text-gray-700 w-full rounded-full pl-3"
//                     />
//                     <button className="absolute right-3 text-white scale-[1.5] p-1 bg-black rounded-full">
//                         <CiSearch />
//                     </button>
//                 </div>

//                 <div className="profile h-full w-[15%] flex items-center justify-between">
//                     <div className="notification h-full w-[50%] flex justify-end items-center">
//                         <div className="icon h-[30px] w-[30px]">
//                             <GoBellFill className='h-full w-full' />
//                         </div>
//                     </div>
//                     <div className="relative h-full w-[90%] flex justify-center items-center" ref={dropdownRef}>
//                         <div 
//                             onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//                             className="cursor-pointer h-[45px] w-[45px] rounded-full border border-zinc-300 overflow-hidden"
//                         >
//                             <img 
//                                 className="h-full w-full object-cover" 
//                                 src={profileImage || getDefaultProfileImage()} 
//                                 alt={`${userType || 'User'} profile`} 
//                             />
//                         </div>
                        
//                         {isDropdownOpen && (
//                             <div className="absolute top-[70px] right-0 bg-white shadow-lg rounded-lg w-48 py-2 z-[99999999999]">
//                                 {userType !== 'Company' && userType !== 'Recruiter' && (
//                                     <Link to="/components/profiles/AppliedJobs" 
//                                     className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
//                                     onClick={() => setIsDropdownOpen(false)}
//                                     >
//                                         Applied Jobs
//                                     </Link>
//                                 )}
//                                 <Link 
//                                     to={getProfileLink()} 
//                                     className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
//                                     onClick={() => setIsDropdownOpen(false)}
//                                 >
//                                     Profile
//                                 </Link>
//                                 <button 
//                                     onClick={handleLogout}
//                                     className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
//                                 >
//                                     Logout
//                                 </button>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default HomeHeader

import React, { useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GoBellFill } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { fetchExtraProfile } from '../../operations/profileAPI';
import { logout, performSearchJobs } from '../../operations/userAPI';
import { fetchRecruiter } from '../../operations/recruiterAPI';
import { fetchCompany } from '../../operations/companyAPI';
// import { fetchallJob, searchJobs } from '../../operations/userAPI'; 

function HomeHeader() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    
    const dispatch = useDispatch();
    
    const userType = localStorage.getItem('userType');
    const token = useSelector((state) => {
        switch(userType){
            case 'Recruiter':
                return state.recruiter.token;
            case 'Company':
                return state.company.token;
            default:
                return state.profile.token;
        }
    });
    
    // Select the appropriate profile image based on userType
    const profileImage = useSelector((state) => {
        switch(userType) {
            case 'Company':
                return state.company.company?.logo;
            case 'Recruiter':
                return state.user.recruiterProfile?.image;
            default:
                return state.profile.extraprofile?.image;
        }
    });

    useEffect(() => {
        if (token) {
            switch(userType){
                case 'Recruiter':
                    dispatch(fetchRecruiter(token));
                    break;
                case 'Company':
                    dispatch(fetchCompany(token));
                    break;
                default:
                    dispatch(fetchExtraProfile(token));
                    break;
            }
        }
    }, [dispatch, token, userType]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getProfileLink = () => {
        if (userType === 'Recruiter') {
            return "/components/profiles/RecruiterDashboard/Dashboard";
        } else if(userType === 'Company'){
            return "/components/profiles/CompanyProfiles/CompanyProfile";
        } else {
            return "/components/profiles/UserProfile";
        } 
    };

    // Function to get the appropriate default profile image based on userType
    const getDefaultProfileImage = () => {
        switch (userType) {
            case 'Company':
                return require("../../assets/default-profile.jpg");
            case 'Recruiter':
                return require("../../assets/default-profile.jpg");
            default:
                return require("../../assets/default-profile.jpg");
        }
    };

    const handleLogout = () => {
        dispatch(logout(navigate));
    };

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Handle search submission
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            dispatch(performSearchJobs(token, searchTerm));
            navigate('/search-results');
        }
    };

    // Handle Enter key press in search input
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch(e);
        }
    };

    return (
        <div className="fixed bg-white h-[80px] w-full flex items-center justify-center shadow-md z-[99999999]">
            <div className='h-full w-[70%] flex items-center pl-2 pr-2 justify-between'>
                <Link to="/home">
                    <div className="logo h-full w-[10%]">
                        <img className='scale-[1.5] mt-1' src={require("../../assets/logo.png")} alt="" />
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
                        placeholder="Search company, jobs, skills"
                        className="bg-white outline-none text-gray-700 w-full rounded-full pl-3"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        onKeyPress={handleKeyPress}
                    />
                    <button 
                        className="absolute right-3 text-white scale-[1.5] p-1 bg-black rounded-full"
                        onClick={handleSearch}
                    >
                        <CiSearch />
                    </button>
                </div>

                <div className="profile h-full w-[15%] flex items-center justify-between">
                    <div className="notification h-full w-[50%] flex justify-end items-center">
                        <div className="icon h-[30px] w-[30px]">
                            <GoBellFill className='h-full w-full' />
                        </div>
                    </div>
                    <div className="relative h-full w-[90%] flex justify-center items-center" ref={dropdownRef}>
                        <div 
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="cursor-pointer h-[45px] w-[45px] rounded-full border border-zinc-300 overflow-hidden"
                        >
                            <img 
                                className="h-full w-full object-cover" 
                                src={profileImage || getDefaultProfileImage()} 
                                alt={`${userType || 'User'} profile`} 
                            />
                        </div>
                        
                        {isDropdownOpen && (
                            <div className="absolute top-[70px] right-0 bg-white shadow-lg rounded-lg w-48 py-2 z-[99999999999]">
                                {userType !== 'Company' && userType !== 'Recruiter' && (
                                    <Link to="/components/profiles/AppliedJobs" 
                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                    onClick={() => setIsDropdownOpen(false)}
                                    >
                                        Applied Jobs
                                    </Link>
                                )}
                                <Link 
                                    to={getProfileLink()} 
                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                    onClick={() => setIsDropdownOpen(false)}
                                >
                                    Profile
                                </Link>
                                <button 
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeHeader