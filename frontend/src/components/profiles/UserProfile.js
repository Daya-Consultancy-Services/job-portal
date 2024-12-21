import React, {  useRef, useState } from 'react';
import Header from '../../pages/home/Header';
import Footer from '../Footer';
import { FaPencilAlt } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { HiOutlineBriefcase } from "react-icons/hi2";
import { SlCalender } from "react-icons/sl";
import { MdLocalPhone } from "react-icons/md";
import { CiMail } from "react-icons/ci";
import { TbDeviceMobileCheck } from "react-icons/tb";
import ResumeUpload from './ResumeUpload';
import EducationForm from './EducationForm';
import SkillsForm from './SkillForm';
import ProjectForm from './ProjectForm';
import ProfileSummery from './ProfileSummery';
import { useDispatch } from 'react-redux';
import { updateProfile } from '../../operations/userAPI';

function UserProfile() {
   const [user, setUser] = useState(null);
    const [profileImage, setProfileImage] = useState(require('../../assets/profile.png'));
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupType, setPopupType] = useState('');
    const [newInput, setNewInput] = useState('');
    const [location, setLocation] = useState('Add Location');
    const [type, setType] = useState('Fresher');
    const [join, setJoin] = useState('Immediate');
    const [activeLink, setActiveLink] = useState('resume');
    const [isEducationVisible, setEducationVisible] = useState(false);
    const [educationData, setEducationData] = useState(null); // State to store the submitted education data

    const [isSkillsVisible, setSkillsVisible] = useState(false);
    const [skillsData, setSkillsData] = useState([]);
    const [isProjectVisible, setProjectVisible] = useState(false);
    const [projectsData, setProjectsData] = useState([]);
    const [isPersonalDetailsVisible, setPersonalDetailsVisible] = useState(false);
    const [personalDetails, setPersonalDetails] = useState('');
    const [firstName, setFirstName] = useState('ladukishor');
    const [lastName, setLastName] = useState('subudhi');
    const [email, setEmail] = useState('abcd@gmail.com');




    const handleButtonClick1 = () => {
        setEducationVisible(!isEducationVisible);
    };


    const handleEducationSaved = (data) => {
        setEducationData(data); 
        setEducationVisible(false); 
    };



    const handleButtonClick2 = () => {
        setSkillsVisible(!isSkillsVisible);
    };


    const handleSkillsSaved = (data) => {
        if (data) {
            setSkillsData([...skillsData, data]); 
        }
        setSkillsVisible(false); 
    };

    const handleButtonClick3 = () => {
        setProjectVisible(!isProjectVisible);
    };

    const handleProjectSaved = (data) => {
        if (data) {
            setProjectsData([...projectsData, data]); 
        }
        setProjectVisible(false); 
    };


    const handleButtonClick4 = () => {
        setPersonalDetailsVisible(!isPersonalDetailsVisible);
    };

    const handlePersonalDetailsSaved = (details) => {
        if (details) {
            setPersonalDetails(details); 
        }
        setPersonalDetailsVisible(false);
    };


    const mainSectionRef = useRef(null);
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setProfileImage(imageURL);
        }
    };

    const togglePopup = (field) => {
        setPopupType(field);
        setIsPopupOpen(!isPopupOpen);
        setNewInput('');
    };

    const dispatch = useDispatch();

    const handleSave = () => {
        if (newInput.trim()) {
            switch (popupType) {
                case 'name':
                    setFirstName(newInput);
                    setLastName(newInput);
                    break;
                case 'location':
                    setLocation(newInput);
                    break;
                case 'type':
                    setType(newInput);
                    break;
                case 'join':
                    setJoin(newInput);
                    break;
                default:
                    break;
            }
        }
        setIsPopupOpen(false);
    };

    const userData = {

        firstName: firstName,
        lastName: lastName,
        email: email,

        // Add any other fields you want to update

    };
    // Dispatch the updateProfile action

    dispatch(updateProfile(userData));


    const scrollToDiv = (div) => {
        setActiveLink(div);
        const targetElement = document.getElementById(div);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };


    return (
        <>
            <div className='relative min-h-[100vh] w-full '>
                <div className="header absolute z-[999999]">
                    <Header />
                </div>

                <div className="profile-div min-h-[100vh] w-full  flex justify-center">
                    <div className="mt-[80px] min-h-[80%] w-[60%]  p-5 flex flex-col gap-5">
                        <div className="h-[250px] w-full bg-zinc-50 rounded-xl overflow-hidden flex">
                            <div className="profile-info w-[65%] h-full  flex ">
                                <div className="profile h-full w-[30%]  flex items-center justify-center">
                                    <div className="img-div h-[150px] w-[150px]  rounded-full overflow-hidden relative group">
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
                                </div>
                                <div className="profile-info w-[70%] p-4">
                                    <div className="heading w-full flex flex-col gap-4 border-b-[0.5px] pb-3">
                                        <div className="name flex gap-5 items-center pt-4 group">
                                            <h1 className='w-fit h-fit text-3xl font-semibold'>{firstName} {lastName}</h1>
                                            <FaPencilAlt onClick={() => togglePopup('name')} className="cursor-pointer text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                        <p className='text-zinc-400'>Profile last updated - <span className='font-semibold text-black'>Yesterday</span></p>
                                    </div>
                                    <div className="lower-div w-full flex">
                                        <div className="left-div h-full w-[50%] flex flex-col gap-3 p-2">
                                            <div className="location flex gap-5 items-center group">
                                                <IoLocationOutline />
                                                <span className={`text-md font-medium `}>{location}</span>
                                                <FaPencilAlt onClick={() => togglePopup('location')} className="cursor-pointer text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                            <div className="type flex gap-5 items-center group">
                                                <HiOutlineBriefcase />
                                                <span className="text-md font-medium text-black">{type}</span>
                                                <FaPencilAlt onClick={() => togglePopup('type')} className="cursor-pointer text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                            <div className="join flex gap-5 items-center group">
                                                <SlCalender />
                                                <span className="text-md font-medium text-black">{join}</span>
                                                <FaPencilAlt onClick={() => togglePopup('join')} className="cursor-pointer text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                        </div>

                                        <div className="right-div h-full w-[50%] flex flex-col gap-3 p-2">
                                            <div className="p-number flex gap-5 items-center group">
                                                <MdLocalPhone />
                                                <span className="text-md font-medium text-black">Phone number</span>
                                                <FaPencilAlt onClick={() => togglePopup('phone number')} className="cursor-pointer text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                            <div className="p-number flex gap-5 items-center group">
                                                <CiMail />
                                                <span className="text-md font-medium text-black">{email}</span>
                                                <FaPencilAlt onClick={() => togglePopup('email id')} className="cursor-pointer text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="extra-info w-[35%] h-full flex justify-center items-center">
                                <div className="box h-[85%] w-[85%] bg-[#FFF2E3] rounded-xl p-5 flex flex-col gap-6">
                                    <div className="relative mobile flex gap-5 items-center">
                                        <TbDeviceMobileCheck className='scale-[1.4] bg-white rounded-full ' />
                                        <p>Verify mobile number</p>
                                        <span className='px-3 py-1 bg-white rounded-full absolute right-1'>10%</span>
                                    </div>
                                    <div className="relative location flex gap-5 items-center">
                                        <TbDeviceMobileCheck className='scale-[1.4] bg-white rounded-full ' />
                                        <p>Add Prefered location</p>
                                        <span className='px-3 py-1 bg-white rounded-full absolute right-1'>5%</span>
                                    </div>
                                    <div className="relative resume flex gap-5 items-center ">
                                        <TbDeviceMobileCheck className='scale-[1.4] bg-white rounded-full ' />
                                        <p>Upload Resume</p>
                                        <span className='px-3 py-1 bg-white rounded-full absolute right-1'>2%</span>
                                    </div>

                                    <button className='px-3 py-2 rounded-full bg-orange-500 text-white'>Add 13 missing details</button>

                                </div>
                            </div>


                        </div>

                        <div className=" min-h-[600px] w-full flex gap-3 rounded-xl  ">
                            <div className=" sidebar h-full w-[30%] flex ">
                                <div className=" bg-zinc-50 sticky top-0  h-[700px] w-full flex flex-col justify-center shadow-lg  rounded-xl  p-4">
                                    <div className="h-[60px] w-full p-2 flex items-center">
                                        <h1 className='text-2xl font-semibold'>Quick Links :</h1>
                                    </div>

                                    <div className="links  h-[500px] w-full bg-white p-4 flex flex-col gap-4 rounded-lg">
                                        <div onClick={() => scrollToDiv('Resume')} className={`Resume flex justify-between items-center p-1 hover:font-semibold cursor-pointer ${activeLink === 'Resume' ? 'bg-[#ffdfdf]' : ''} `}><h3>Resume</h3> </div>
                                        <div onClick={() => scrollToDiv('Resume-headline')} className={`Resume headline flex justify-between items-center p-1 hover:font-semibold cursor-pointer  `}><h3>Resume headline</h3> </div>
                                        <div onClick={() => scrollToDiv('key-skills')} className={`Key-skills flex justify-between items-center p-1 hover:font-semibold cursor-pointer  `}><h3>Key skills</h3> </div>
                                        <div onClick={() => scrollToDiv('education')} className={`Education flex justify-between items-center p-1 hover:font-semibold cursor-pointer  `}><h3>Education</h3> </div>
                                        <div onClick={() => scrollToDiv('IT-skills')} className={`IT-skills flex justify-between items-center p-1 hover:font-semibold cursor-pointer  `}><h3>IT skills</h3> </div>
                                        <div onClick={() => scrollToDiv('Projects')} className={`Projects flex justify-between items-center p-1 hover:font-semibold cursor-pointer  `}><h3>Projects</h3> </div>
                                        <div onClick={() => scrollToDiv('Profile-summery')} className={`Profile-summery flex justify-between items-center p-1 hover:font-semibold cursor-pointer  `}><h3>Profile summery</h3> </div>
                                        <div onClick={() => scrollToDiv('Accomplishments')} className="Accomplishments flex"><h3>Acomplishments</h3></div>
                                        <div onClick={() => scrollToDiv('Career-profile')} className="Career-profile flex"><h3>Career profile</h3></div>
                                        <div onClick={() => scrollToDiv('Personal-details')} className="Personal-details flex"><h3>Personal Details</h3></div>
                                    </div>
                                </div>
                            </div>

                            <div ref={mainSectionRef} className="main min-h-full w-[70%]  flex flex-col gap-4">
                                <div className="min-h-[400px] border  p-5 rounded-lg shadow-lg" id='Resume'>
                                    <div className="head">
                                        <div className=""><h1 className='font-semibold text-2xl'>Resume </h1> <p className='text-green-400'>Add 10%</p></div>
                                        <p className='text-zinc-400'>70% of recruiters discover candidates through their resume</p>


                                    </div>
                                    <ResumeUpload />
                                </div>
                                <div className="min-h-[100px] border rounded-lg flex p-4 flex-col shadow-lg" id='Resume-headline'>
                                    <div className="head flex w-full justify-between px-4">
                                        <div className="flex justify-between px-2 h-fit w-fit gap-5 items-center "><h1 className='font-semibold text-2xl'>Resume headline</h1> <p className='text-green-400'>Add 8%</p></div>
                                        <h1 className='text-blue-700 font-semibold cursor-pointer' onClick={() => togglePopup('add resume headlines')}>Add resume headline</h1>
                                    </div>
                                    <p className='text-zinc-400 px-6'>Add a summary of your resume to introduce yourself to recruiters</p>
                                </div>
                                <div className="min-h-[100px] border rounded-lg flex p-4 flex-col shadow-lg" id='key-skills'>
                                    <div className="head flex w-full justify-between px-4">
                                        <div className="flex justify-between px-2 w-fit gap-5 items-center"><h1 className='font-semibold text-2xl'>Key skills</h1> <p className='text-green-400'>Add 8%</p></div>
                                        <h1 className='text-blue-700 font-semibold cursor-pointer' onClick={() => togglePopup('Add key skills')}>Add key Skills</h1>
                                    </div>
                                    <p className='text-zinc-400 px-6'>Recruiters look for candidates with specific key skills</p>
                                </div>



                                <div className="min-h-[100px] border rounded-lg flex p-4 flex-col shadow-lg" id='education'>
                                    <div className="head flex w-full px-4 flex-col">
                                        <div className="flex justify-between w-full"><div className="flex justify-between px-2 w-fit gap-5 items-center"><h1 className='font-semibold text-2xl'>Education</h1> <p className='text-green-400'>Add 10%</p></div>
                                            <h1 className='text-blue-700 font-semibold cursor-pointer flex flex-col' onClick={handleButtonClick1}>Add education</h1></div>

                                        {isEducationVisible && (
                                            <EducationForm onSave={handleEducationSaved} />
                                        )}

                                        {educationData && (
                                            <div className="flex justify-between px-2 w-fit gap-5 items-center mt-3">

                                                <div className='flex flex-col'>
                                                    <p><strong>University/Institute:</strong> {educationData.universityOrInstitute}</p>
                                                    <p><strong>Course:</strong> {educationData.course}</p>
                                                    <p><strong>Specialization:</strong> {educationData.specialization}</p>
                                                    <p><strong>Course Type:</strong> {educationData.courseType}</p>
                                                    <p><strong>Course Duration:</strong> From {educationData.courseDurationFrom} To {educationData.courseDurationTo}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <p className='text-zinc-400 px-6'>Your qualifications help employers know your educational background</p>
                                </div>


                                <div className="min-h-[100px] border rounded-lg flex p-4 flex-col shadow-lg" id='IT-skills'>
                                    <div className="head flex w-full justify-between px-4">
                                        <div className="flex justify-between px-2 w-fit gap-5 items-center "><h1 className='font-semibold text-2xl'>IT skills</h1> <p className='text-green-400'>Add 18%</p></div>
                                        <h1 className='text-blue-700 font-semibold cursor-pointer'
                                            onClick={handleButtonClick2}>Add IT skills</h1>
                                    </div>
                                    <p className='text-zinc-400 px-6'>Show your technical expertise by mentioning softwares and skills you know</p>

                                    {isSkillsVisible && (
                                        <SkillsForm onSave={handleSkillsSaved} />
                                    )}

                                    <div className="skills-list mt-6 p-4">
                                        {skillsData.length > 0 ? (
                                            skillsData.map((skill, index) => (
                                                <div key={index} className="skill-entry flex justify-between p-2 border-b">
                                                    <p><strong>Skill Name:</strong> {skill.skillName}</p>
                                                    <p><strong>Experience:</strong> {skill.experienceYears} Years, {skill.experienceMonths} Months</p>
                                                </div>
                                            ))
                                        ) : (
                                            <p></p>
                                        )}
                                    </div>
                                </div>



                                <div className="min-h-[100px] border rounded-lg flex p-4 flex-col shadow-lg" id='Projects'>
                                    <div className="head flex w-full justify-between px-4">
                                        <div className="flex justify-between px-2 w-fit gap-5 items-center "><h1 className='font-semibold text-2xl'>Projects</h1> <p className='text-green-400'>Add 8%</p></div>
                                        <h1 className='text-blue-700 font-semibold cursor-pointer'
                                            onClick={handleButtonClick3}>Add projects</h1>
                                    </div>
                                    <p className='text-zinc-400 px-6'>Stand out to employers by adding details about projects that you have done so far</p>
                                    {isProjectVisible && (
                                        <ProjectForm onSave={handleProjectSaved} />
                                    )}

                                    <div className="projects-list mt-6">
                                        {projectsData.length > 0 ? (
                                            projectsData.map((project, index) => (
                                                <div key={index} className="project-entry flex justify-between p-2 border-b flex-col pl-5">
                                                    <p><strong>Project Title:</strong> {project.title}</p>
                                                    <p><strong>Role:</strong> {project.role}</p>
                                                    <p><strong>Technologies Used:</strong> {project.technologies.join(', ')}</p>
                                                    <p><strong>Duration:</strong> {project.duration}</p>
                                                </div>
                                            ))
                                        ) : (
                                            <p></p>
                                        )}
                                    </div>
                                </div>



                                <div className="min-h-[100px] border rounded-lg flex p-4 flex-col shadow-lg" id='Profile-summery'>
                                    <div className="head flex w-full justify-between px-4">
                                        <div className="flex justify-between px-2 w-fit gap-5 items-center "><h1 className='font-semibold text-2xl'>Profile summery</h1> <p className='text-green-400'>Add 10%</p></div>
                                        <h1 className='text-blue-700 font-semibold cursor-pointer'
                                            onClick={handleButtonClick4}>Add profile summery</h1>
                                    </div>
                                    <p className='text-zinc-400 px-6'>Highlight your key career achievements to help employers know your potential</p>
                                    {isPersonalDetailsVisible && (
                                        <ProfileSummery
                                            onSave={handlePersonalDetailsSaved}
                                            initialDetails={personalDetails} // Pass existing details to the form
                                        />
                                    )}

                                    {personalDetails && (
                                        <div className="personal-details-display mt-6 px-4">
                                            <h2 className='text-xl font-semibold'>Your Personal Details</h2>
                                            <p className='text-zinc-600 mt-2'>{personalDetails}</p>
                                        </div>
                                    )}

                                </div>



                                <div className="min-h-[100px] border rounded-lg flex p-4 flex-col shadow-lg" id='Accomplishments'>
                                    <div className="head flex w-full justify-between px-4">
                                        <div className="flex justify-between px-2 w-fit gap-5 items-center "><h1 className='font-semibold text-2xl'>Accomplishments</h1> <p className='text-green-400'>Add 8%</p></div>
                                        <h1 className='text-blue-700 font-semibold'>Add Accomplishments</h1>
                                    </div>
                                    <p className='text-zinc-400 px-6'>Showcase your credentials by adding relevant certifications, work samples, online profiles, etc.</p>
                                </div>



                                <div className="min-h-[100px] border rounded-lg flex p-4 flex-col shadow-lg" id='Career-profile'>
                                    <div className="head flex w-full justify-between px-4">
                                        <div className="flex justify-between px-2 w-fit gap-5 items-center "><h1 className='font-semibold text-2xl'>Career Profile</h1> <p className='text-green-400'>Add 18%</p></div>
                                        <h1 className='text-blue-700 font-semibold'>Add Career profile</h1>
                                    </div>
                                    <p className='text-zinc-400 px-6'>Add details about your current and preferred career profile. This helps us personalise your job recommendations.</p>
                                </div>



                                <div className="min-h-[100px] border rounded-lg flex p-4 flex-col shadow-lg" id='Personal-details'>
                                    <div className="head flex w-full justify-between px-4">
                                        <div className="flex justify-between px-2 w-fit gap-5 items-center "><h1 className='font-semibold text-2xl'>Personal details</h1> <p className='text-green-400'>Add 18%</p></div>
                                        <h1 className='text-blue-700 font-semibold' >Add personal details</h1>
                                    </div>
                                    <p className='text-zinc-400 px-6'>This information is important for employers to know you better</p>
                                </div>


                            </div>

                        </div>
                    </div>
                </div>

                <div className="footer">
                    <Footer />
                </div>

                {/*------------------Common Popup ---------------------*/}
                {isPopupOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-5 rounded-lg shadow-lg w-[400px] relative">
                            <button
                                onClick={() => setIsPopupOpen(false)}
                                className="absolute top-2 right-2 text-zinc-500 text-xl"
                            >
                                <FaTimes />
                            </button>
                            <h2 className="text-xl font-semibold mb-4">Edit {popupType.charAt(0).toUpperCase() + popupType.slice(1)}</h2>
                            <div className="flex flex-col gap-4">
                                <input
                                    type="text"
                                    placeholder={`Enter your ${popupType}`}
                                    value={newInput}
                                    onChange={(e) => setNewInput(e.target.value)}
                                    className="border p-2 rounded"
                                />
                                <div className="flex justify-end gap-2">
                                    <button
                                        onClick={() => setIsPopupOpen(false)}
                                        className="bg-zinc-400 text-white px-4 py-2 rounded"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        className="bg-blue-500 text-white px-4 py-2 rounded"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}





            </div >
        </>
    );
}

export default UserProfile;
