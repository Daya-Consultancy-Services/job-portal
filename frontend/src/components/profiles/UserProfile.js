import React, { useEffect, useRef, useState } from 'react';

import Header from '../../pages/home/Header';

import Footer from '../Footer';

import { FaPencilAlt, FaTimes } from "react-icons/fa";

import { IoClose, IoLocationOutline } from "react-icons/io5";

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

import { useDispatch, useSelector } from 'react-redux';

import { deleteUser, logout, updateDetail } from '../../operations/userAPI';

import ExtraProfile from './ExtraProfile';

import { useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';

import { updateProfile } from '../../operations/profileAPI';

import ProfileForm from './ProfileForm';
import FORM_CONFIGS, { ModalComponent } from './Accomplishment';
import { BsPencil, BsTrash } from 'react-icons/bs';
import { deleteOnlineProfile, deleteOnlineProfiles, updateonlineProfiles } from '../../operations/onlineprofileAPI';
import { Pencil, Trash2 } from 'lucide-react';
import { createCertificates, deleteCertificates, fetchCertificates, updateCertificates } from '../../operations/certificateAPI';



function UserProfile() {
    const { user } =useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.user);
    // const {token } = useSelector((state) => state.profile.token);
    // const certificates  = useSelector((state) => state.profile.certificates);
    // console.log(certificates)
    const certificates =  useSelector((state) => state.profile.certificates);
    console.log(certificates);
   
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      if (token) {
          dispatch(fetchCertificates(token));
      }
  }, [dispatch, token]);

    const [profileImage, setProfileImage] = useState(require('../../assets/profile.png'));

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const [popupType, setPopupType] = useState('');

    const [newInput, setNewInput] = useState('');

    const [activeLink, setActiveLink] = useState('resume');

    const [isEducationVisible, setEducationVisible] = useState(false);

    const [educationData, setEducationData] = useState(null);

    const [isSkillsVisible, setSkillsVisible] = useState(false);

    const [skillsData, setSkillsData] = useState([]);

    const [isProjectVisible, setProjectVisible] = useState(false);

    const [projectsData, setProjectsData] = useState([]);

    const [isPersonalDetailsVisible, setPersonalDetailsVisible] = useState(false);

    const [personalDetails, setPersonalDetails] = useState('');

    const [showExtraProfile, setShowExtraProfile] = useState(false);

    const [isNamePopupOpen, setIsNamePopupOpen] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [initialValue, setInitialValue] = useState("");

    const [openModal, setOpenModal] = useState(null);

    // const [modalConfig, setModalConfig] = useState({
    //     isOpen: false,
    //     sectionType: null,
    //     title: ''
    // });

    const [sectionData, setSectionData] = useState({});

    const [editModal, setEditModal] = useState({ sectionId: null, itemIndex: null, fieldKey: null, fieldValue: "" }); // Manage edit modal state


  //   useEffect(() => {
  //     if (token) {
  //         const fetchCertificates = async () => {
  //             dispatch(setLoading(true));
  //             try {
  //                 const response = await apiConnector("GET",certificateProfile.getCertificate, null, {
  //                     Authorization: `Bearer ${token}`,
  //                 });

  //                 if (!response.data.success) {
  //                     throw new Error(response.data.message);
  //                 }

  //                 // Update certificates in Redux
  //                 dispatch(setCertificate({ ...response.data.data }));
                  
  //                 //toast.success("Certificates fetched successfully");
  //             } catch (error) {
  //                 console.error("Error fetching certificates:", error);
  //                 //toast.error("Failed to fetch certificates");
  //             } finally {
  //                 dispatch(setLoading(false));
  //             }
  //         };

  //         fetchCertificates();
  //     }
  // }, [dispatch, token]);

  // if (loading) {
  //     return <div>Loading certificates...</div>;
  // }




 
      
        
  

    // ---------------------------------- save , edit, delete for online profile---------------------------------------

    const handleSaveData = async (sectionType, data) => {
      try {
          if (sectionType === 'certification') {
              // loading(true)
              // const certificate = dispatch(fetchCertificates(token));
              //dispatch(fetchCertificates(token));
              // console.log(certificate);
              // loading(false)
              // Wait a bit for the state to update
              // await new Promise(resolve => setTimeout(resolve, 100));

              
              
              // setSectionData((prevData) => ({
              //     ...prevData,
              //     [sectionType]: [
              //         ...(prevData[sectionType] || []),
              //         ...certificates
              //     ],
              // }));
              
              // // setIsLoading(false);
          }
      } catch (error) {
          console.error('Error saving data:', error);
          // setIsLoading(false);
      }
  };
 
  
      const handleCertificateInputChange = (field, value) => {
        setEditModal(prev => ({
          ...prev,
          certificateData: {
            ...prev.certificateData,
            [field]: value
          }
        }));
      };
    
      const handleEdit = (sectionId, itemIndex, fieldKey, fieldValue) => {
        if (sectionId === 'certification') {
          // For certificates, store the entire certificate data
          setEditModal({
            sectionId,
            itemIndex,
            fieldKey: 'certificate',
            certificateData: {
              certificateName: fieldValue.certificateName,
              certificateDescription: fieldValue.certificateDescription,
              certificateLink: fieldValue.certificateLink
            }
          });
        } else {
          // Original behavior for online profiles
          setEditModal({ sectionId, itemIndex, fieldKey, fieldValue });
        }
      };

    

      const handleUpdate = async () => {
        const { sectionId, itemIndex, fieldKey, certificateData } = editModal;
        
        if (!sectionData[sectionId]?.[itemIndex]) {
          console.error("Selected item not found");
          return;
        }
    
        try {
          if (sectionId === 'certification') {
            const currentCertificate = sectionData[sectionId][itemIndex];            
            const updatedCertificate = {
              ...sectionData[sectionId][itemIndex],
              ...certificateData,
            
            };
            console.log(currentCertificate?._id);
    
            await dispatch(updateCertificates(token,  currentCertificate._id  ,updatedCertificate));
    
            setSectionData(prev => {
              const updatedCertificates = [...prev[sectionId]];
              updatedCertificates[itemIndex] = updatedCertificate;
              return {
                ...prev,
                [sectionId]: updatedCertificates
              };
            });
          } else {
            // Original update logic for online profiles
            const selectedItem = sectionData[sectionId][itemIndex];
            const updatedItem = {
              ...selectedItem,
              [fieldKey]: editModal.fieldValue,
            };
    
            await dispatch(updateonlineProfiles(token, updatedItem));
    
            setSectionData(prev => ({
              ...prev,
              [sectionId]: prev[sectionId].map((item, idx) => 
                idx === itemIndex ? updatedItem : item
              )
            }));
          }
    
          closeModal();
        } catch (error) {
          console.error("Error updating item:", error);
        }
      };
    
      const handleDeletes = async (sectionId, itemIndex, item) => {
        try {
          if (sectionId === 'certification') {
            // Delete for certificates
            await dispatch(deleteCertificates(token, { certificateId: item.id }));
            
            // Update local state
            setSectionData(prev => ({
              ...prev,
              [sectionId]: prev[sectionId].filter((_, idx) => idx !== itemIndex)
            }));
          } else {
            // Original delete logic for online profiles
            const dispatchPayload = {
              [item]: true
            };
            await dispatch(deleteOnlineProfiles(token, dispatchPayload));
    
            setSectionData(prev => {
              const updatedSection = [...prev[sectionId]];
              updatedSection[itemIndex] = {
                ...updatedSection[itemIndex],
                [item]: null
              };
              return {
                ...prev,
                [sectionId]: updatedSection,
              };
            });
          }
        } catch (error) {
          console.error("Error deleting item:", error);
        }
      };
    
      const closeModal = () => {
        setEditModal({
          sectionId: null,
          itemIndex: null,
          fieldKey: '',
          fieldValue: '',
          certificateData: null
        });
      };

   


    // ---------------------------------- Certificate Design ---------------------------------------

    const renderCertificate = (item, index, sectionId) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4">
          <div className="flex justify-between">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-800">
                {item.certificateName}
              </h3>
              <p className="text-sm text-gray-600">
                {item.certificateDescription}
              </p>
              {item.certificateLink && (
                <a 
                  href={item.certificateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm inline-flex items-center gap-1"
                >
                  View Certificate
                </a>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(sectionId, index, 'certificate', item)}
                className="text-blue-600 hover:text-blue-800 p-1"
                aria-label="Edit certificate"
              >
                <Pencil size={16} />
              </button>
              <button
                onClick={() => handleDeletes(sectionId, index)}
                className="text-red-600 hover:text-red-800 p-1"
                aria-label="Delete certificate"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      );
    
    //------------------------------- Oneline Profile Design ---------------------------------------   
      const renderOnlineProfile = (item, index, sectionId) => (
        <div key={index} className="p-4 rounded-md">
          {Object.entries(item)
            .filter(([key, value]) => value !== null)
            .map(([key, value]) => (
              <div key={key} className="flex justify-between items-center mt-4">
                <div>
                  <h1 className="font-medium capitalize">{key}:</h1>
                  <p className="text-sm text-gray-800">{value}</p>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => handleEdit(sectionId, index, key, value)}
                    className="text-blue-600 hover:text-blue-800"
                    aria-label={`Edit ${key}`}
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDeletes(sectionId, index, key)}
                    className="text-red-600 hover:text-red-800"
                    aria-label={`Delete ${key}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
        </div>
      );
    




    const { register, handleSubmit, reset, watch } = useForm({

    });

    const watchFields = watch();

    const handleSaveForName = (updatedData) => {


        try {
            dispatch(updateDetail(token, updatedData)); // Dispatch updated data

        } catch (error) {
            console.log(error.message);
        }
        setIsPopupOpen(false);
    };

    const handleEditClick = (type, value) => {
        setPopupType(type);
        setInitialValue(value);
        setIsPopupOpen(true);
    };


    const [profileData, setProfileData] = useState({
        location: "Enter location",
        join: "Enter joining type",
        contactNumber: "Phone number",
        email: "user@example.com",
    });


    const handleSaveForProfile = (updatedData) => {
        setProfileData((prevData) => ({
            ...prevData,
            ...updatedData,
        }));
        setIsPopupOpen(false); // Close the popup after saving
    };









    const handleButtonClick1 = () => {
        setEducationVisible(!isEducationVisible);
    };


    const handleEducationSaved = (data) => {
        setEducationData(data);
        setEducationVisible(false);
        // dispatch(updateDetail({ education: data }));
    };



    const handleButtonClick2 = () => {
        setSkillsVisible(!isSkillsVisible);
    };


    const handleSkillsSaved = (data) => {
        if (data) {
            setSkillsData([...skillsData, data]);
            // dispatch(updateDetail({ skills: [...skillsData, data] }));
        }
        setSkillsVisible(false);
    };

    const handleButtonClick3 = () => {
        setProjectVisible(!isProjectVisible);
    };

    const handleProjectSaved = (data) => {
        if (data) {
            setProjectsData([...projectsData, data]);
            // dispatch(updateDetail({ projects: [...projectsData, data] }));
        }
        setProjectVisible(false);
    };


    const handleButtonClick4 = () => {
        setPersonalDetailsVisible(!isPersonalDetailsVisible);
    };

    const handlePersonalDetailsSaved = (details) => {
        if (details) {
            setPersonalDetails(details);
            // dispatch(updateDetail({ personalDetails: details }));
        }
        setPersonalDetailsVisible(false);
    };


    const mainSectionRef = useRef(null);
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setProfileImage(imageURL);
            dispatch(updateProfile({ profileImage: imageURL }));
        }
    };

    const togglePopup = (field) => {
        setPopupType(field);
        setIsPopupOpen(!isPopupOpen);


        setNewInput('');

    };

    const togglePopupForName = () => {
        setIsNamePopupOpen(!isNamePopupOpen);

    };

    const handleDelete = () => {
        dispatch(deleteUser(token, navigate));
        console.log("Profile deleted");
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        console.log("Profile deletion canceled");
        setIsModalOpen(false);
    };

    const handleLogout = () => {
        dispatch(logout(navigate));
        console.log("Profile logged out");
    }


    const scrollToDiv = (div) => {
        setActiveLink(div);
        const targetElement = document.getElementById(div);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };




    const TextInput = ({ label, type = "text", placeholder }) => (
        <div className="mb-4">
            <label className="block text-sm font-medium mb-1">{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );

    const TextArea = ({ label, placeholder }) => (
        <div className="mb-4">
            <label className="block text-sm font-medium mb-1">{label}</label>
            <textarea
                placeholder={placeholder}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
            />
        </div>
    );

    const sections = [
        {
            id: 'online-profile',
            title: "Online profile",
            description: "Add link to online professional profiles (e.g. LinkedIn, etc.)",
            form: (
                <TextInput
                    label="Profile URL"
                    type="url"
                    placeholder="Enter your LinkedIn/portfolio URL"
                />
            ),

        },
        {
            id: 'work-sample',
            title: "Work sample",
            description: "Link relevant work samples (e.g. Github, Behance)",
            form: (
                <>
                    <TextInput label="Project Title" placeholder="Enter project title" />
                    <TextInput label="Project URL" type="url" placeholder="Enter project URL" />
                    <TextArea label="Description" placeholder="Describe your work sample" />
                </>
            )
        },
        {
            id: 'white-paper',
            title: "White paper / Research publication / Journal entry",
            description: "Add links to your online publications",
            form: (
                <>
                    <TextInput label="Publication Title" placeholder="Enter publication title" />
                    <TextInput label="Publication URL" type="url" placeholder="Enter publication URL" />
                    <TextInput label="Authors" placeholder="Enter authors' names" />
                    <TextArea label="Abstract" placeholder="Enter publication abstract" />
                </>
            )
        },
        {
            id: 'presentation',
            title: "Presentation",
            description: "Add links to your online presentations (e.g. Slide-share presentation links etc.)",
            form: (
                <>
                    <TextInput label="Presentation Title" placeholder="Enter presentation title" />
                    <TextInput label="Presentation URL" type="url" placeholder="Enter presentation URL" />
                </>
            )
        },
        {
            id: 'patent',
            title: "Patent",
            description: "Add details of patents you have filed",
            form: (
                <>
                    <TextInput label="Patent Title" placeholder="Enter patent title" />
                    <TextInput label="Patent Number" placeholder="Enter patent number" />
                    <TextInput label="Filing Date" type="date" />
                    <TextArea label="Description" placeholder="Enter patent description" />
                </>
            )
        },
        {
            id: 'certification',
            title: "Certification",
            description: "Add details of certifications you have completed",
            form: (
                <>
                    <TextInput label="Certification Name" placeholder="Enter certification name" />
                    <TextInput label="Issuing Organization" placeholder="Enter issuing organization" />
                    <TextInput label="Issue Date" type="date" />
                    <TextInput label="Expiry Date" type="date" placeholder="Select expiry date (if applicable)" />
                    <TextInput label="Credential URL" type="url" placeholder="Enter credential URL" />
                </>
            )
        },
        {
            id: 'career-profile',
            title: "Career profile",
            description: "Add details about your current and preferred career profile. This helps us personalise your job recommendations.",
            form: (
                <>
                    <TextInput label="Current Role" placeholder="Enter your current role" />
                    <TextInput label="Preferred Role" placeholder="Enter your preferred role" />
                    <TextInput label="Industry" placeholder="Enter your industry" />
                    <TextInput label="Years of Experience" type="number" placeholder="Enter years of experience" />
                    <TextArea label="Career Goals" placeholder="Describe your career goals" />
                </>
            )
        }
    ];






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
                                        <img className="h-full w-full object-cover" src={user?.profileImage ? user.profileImage : require("../../assets/default-profile.jpg")} alt="image" />
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
                                    <div className="heading w-full flex flex-col gap-4 border-b-[0.5px] pb-3 ">
                                        <div className="name flex gap-5 items-center pt-4 group">
                                            <h1 className='w-fit h-fit text-3xl font-semibold'>{user?.firstName} {user?.lastName}</h1>
                                            <FaPencilAlt onClick={() => togglePopupForName()} className="cursor-pointer text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                        <div className='about flex gap-5 items-center pt-4 group'>
                                            <h3 className='text-zinc-400'>{profileData.about}</h3>
                                            <FaPencilAlt onClick={() => togglePopup("about")} className="cursor-pointer text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>


                                    </div>
                                    <div className="lower-div w-full flex">
                                        <div className="left-div h-full w-[50%] flex flex-col gap-3 p-2">
                                            <div className="location flex gap-5 items-center group">
                                                <IoLocationOutline />
                                                <span className={`text-md font-medium `}>{profileData.location}</span>
                                                <FaPencilAlt onClick={() => handleEditClick("location", "New York")} className="cursor-pointer text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                            {/* <div className="type flex gap-5 items-center group">
                                                <HiOutlineBriefcase />
                                                <span className="text-md font-medium text-black">enter type</span>
                                                <FaPencilAlt onClick={() => togglePopup('type')} className="cursor-pointer text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div> */}
                                            <div className="join flex gap-5 items-center group">
                                                <SlCalender />
                                                <span className="text-md font-medium text-black">enter join</span>
                                                <FaPencilAlt onClick={() => handleEditClick("join", "enter the joing type")} className="cursor-pointer text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                        </div>

                                        <div className="right-div h-full w-[50%] flex flex-col gap-3 p-2">
                                            <div className="p-number flex gap-5 items-center group">
                                                <MdLocalPhone />
                                                <span className="text-md font-medium text-black">{profileData.contactNumber}</span>
                                                <FaPencilAlt onClick={() => handleEditClick("contactNumber", "123-456-7890")} className="cursor-pointer text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                            <div className="email flex gap-5 items-center group">
                                                <CiMail />
                                                <span className="text-md font-medium text-black"> {user?.email?.length > 8 ? `${user.email.slice(0, 10)}...` : user?.email}</span>
                                                <FaPencilAlt onClick={() => handleEditClick("email", "Enter your email id")} className="cursor-pointer text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                        </div>
                                        {/* Popup Component */}
                                        <ProfileForm
                                            isOpen={isPopupOpen}
                                            onClose={() => setIsPopupOpen(false)}
                                            popupType={popupType}
                                            initialValue={initialValue}
                                            onSave={handleSaveForProfile}
                                        />
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
                                    <button className='px-3 py-2 rounded-full bg-orange-500 text-white ' >Add missing details</button>
                                </div>
                            </div>
                            {showExtraProfile && <ExtraProfile token={token} />}
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
                                    <div className="delete-btn mt-5 flex justify-between items-center">
                                        <button onClick={() => setIsModalOpen(true)} className='px-3 py-2 border bg-red-500 text-white rounded-full cursor-pointer font-semibold hover:bg-red-600'>
                                            Delete profile
                                        </button>

                                        <h1 className=' text-blue-500 cursor-pointer' onClick={handleLogout}>logout</h1>


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
                                            initialDetails={personalDetails}
                                        />
                                    )}

                                    {personalDetails && (
                                        <div className="personal-details-display mt-6 px-4">
                                            <h2 className='text-xl font-semibold'>Your Personal Details</h2>
                                            <p className='text-zinc-600 mt-2'>{personalDetails}</p>
                                        </div>
                                    )}

                                </div>


                                <div className="p-6 space-y-4 shadow-lg">
      <h2 className="text-xl font-medium">Accomplishments</h2>
      <p className="text-gray-600 mb-4">
        Showcase your credentials by adding relevant certifications, work samples, online profiles, etc.
      </p>

      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.id}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-800">{section.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{section.description}</p>
              </div>
              <button
                className="text-blue-600 font-medium"
                onClick={() => setOpenModal(section.id)}
              >
                Add
              </button>
            </div>

            {sectionData[section.id] && sectionData[section.id].length > 0 && (
              <div className="mt-4">
                {sectionData[section.id].map((item, index) => (
                  section.id === 'certification' 
                    ? renderCertificate(item, index, section.id)
                    : renderOnlineProfile(item, index, section.id)
                ))}
              </div>
            )}
 {editModal.sectionId !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-xl p-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              X
            </button>
            <h2 className="text-xl font-semibold mb-4">
              {editModal.sectionId === 'certification' ? 'Edit Certificate' : 'Edit Field'}
            </h2>
            
            {editModal.sectionId === 'certification' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Certificate Name
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                    value={editModal.certificateData.certificateName}
                    onChange={(e) => handleCertificateInputChange('certificateName', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                    value={editModal.certificateData.certificateDescription}
                    onChange={(e) => handleCertificateInputChange('certificateDescription', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Certificate Link
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                    value={editModal.certificateData.certificateLink}
                    onChange={(e) => handleCertificateInputChange('certificateLink', e.target.value)}
                  />
                </div>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {editModal.fieldKey}
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2"
                  value={editModal.fieldValue}
                  onChange={(e) => setEditModal(prev => ({ ...prev, fieldValue: e.target.value }))}
                />
              </div>
            )}
            
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={closeModal}
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
            <ModalComponent
              isOpen={openModal === section.id}
              onClose={() => setOpenModal(null)}
              sectionType={section.id}
              title={section.title}
              onSave={handleSaveData}
            />
          </div>
        ))}
      </div>
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
                                        <h1 className='text-blue-700 font-semibold cursor-pointer' onClick={() => setShowExtraProfile(true)} >Add personal details</h1>
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


                {isNamePopupOpen && (
                    <div className="popup-overlay fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                        <div className="popup-container bg-white p-8 rounded-lg w-96">
                            <h2 className="text-xl font-semibold mb-4">Edit Name</h2>
                            <form onSubmit={handleSubmit(handleSaveForName)} className="flex flex-col gap-4">
                                <div>
                                    <label htmlFor="firstName" className="block text-lg">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        placeholder='enter your firstname'
                                        {...register('firstName')}
                                        className="w-full p-2 border rounded"
                                        defaultValue={user?.firstName}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-lg">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        {...register('lastName')}
                                        placeholder='enter your lastname'
                                        className="w-full p-2 border rounded"
                                        defaultValue={user?.lastName}
                                    />
                                    <label htmlFor="email" className="block text-lg">
                                        Email
                                    </label>
                                    <input
                                        type="text"
                                        id="email"
                                        placeholder='enter your email'
                                        {...register('email')}
                                        className="w-full p-2 border rounded"
                                        defaultValue={user?.email}
                                    />
                                </div>
                                <div className="flex justify-end mt-4">
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white px-4 py-2 rounded"
                                    >
                                        Save
                                    </button>
                                    <button
                                        type="button"
                                        onClick={togglePopupForName}
                                        className="ml-2 bg-gray-300 px-4 py-2 rounded"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}







                {isModalOpen && (
                    <div className="modal fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
                        <div className="modal-content bg-white p-6 rounded shadow-lg w-1/3 text-center">
                            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
                            <p className="text-gray-700 mb-6">Are you sure you want to delete your profile?</p>
                            <div className="flex justify-center gap-4">
                                <button
                                    onClick={handleDelete}
                                    className="px-4 py-2 bg-red-500 text-white rounded-full font-semibold hover:bg-red-600">
                                    Yes, Delete
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-full font-semibold hover:bg-gray-400">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div >
        </>
    );
}
export default UserProfile;

