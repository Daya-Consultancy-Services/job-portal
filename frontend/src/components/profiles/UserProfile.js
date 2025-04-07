import React, { useEffect, useMemo, useRef, useState } from 'react';
import Header from '../../pages/home/Header';
import Footer from '../Footer';
import { FaPencilAlt } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { MdLocalPhone, MdVerified } from "react-icons/md";
import { CiMail } from "react-icons/ci";
import { TbDeviceMobileCheck } from "react-icons/tb";
import EducationForm from './EducationForm';
import SkillsForm from './SkillForm';
import ProjectForm from './ProjectForm';
import { useDispatch, useSelector } from 'react-redux';
import { changePasswords, deleteUser, logout, updateDetail } from '../../operations/userAPI';
import ExtraProfile from './ExtraProfile';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { fetchExtraProfile, uploadProfileImage } from '../../operations/profileAPI';
import ProfileForm from './ProfileForm';
import { ModalComponent } from './Accomplishment';
import { deleteOnlineProfiles, updateonlineProfiles, getOnlineProfiles } from '../../operations/onlineprofileAPI';
import { Calendar, Globe, MapPin, Pencil, PencilIcon, Trash2, Trash2Icon, User } from 'lucide-react';
import { deleteCertificates, fetchCertificates, updateCertificates } from '../../operations/certificateAPI';
import { deleteSkillProfiles, fetchSkillProfiles } from '../../operations/skillprofileAPI';
// import { onlineProfile } from '../../operations/apis';
import CareerProfileModal from './CareerProfileModal';
import { deleteCareers, fetchCareers } from '../../operations/careerAPI';
import { deleteProjects, fetchProject } from '../../operations/projectAPI';
import EmploymentForm from './EmployeementForm';
import { deleteEmploymentProfiles, fetchEmploymentProfile } from '../../operations/employmentprofileAPI';
import { deleteEducationProfiles, fetchEducationProfile } from '../../operations/educationprofileAPI';
import ResumeUpload from './ResumeUpload';
import { deletePersonaldetails, fetchPersonalDetails } from '../../operations/personaldetailAPI';
import ProfileWithProgressRing from '../ProfileCompletionWidget';



function UserProfile() {
  const selectors = useMemo(() => ({
    selectUser: (state) => state.user.user,
    selectToken: (state) => state.user.token,
    selectCertificates: (state) => state.profile.certificates,
    selectOnlineProfiles: (state) => state.profile.Onlineprofile,
    selectCareerProfiles: (state) => state.profile.careers,
    selectProjectProfiles: (state) => state.profile.projects,
    selectEmployeeProfiles: (state) => state.profile.empProfile,
    selectEducationProfiles: (state) => state.profile.education,
    selectImage: (state) => state.profile.extraprofile?.image,
    selectPersonalDetails: (state) => state.profile.personalDetails,
    selectAbout: (state) => state.profile.extraprofile?.about,
    selectLocation: (state) => state.profile.extraprofile?.location,
    selectContactNumber: (state) => state.profile.extraprofile?.contactNumber,
    selectProfileSummery: (state) => state.profile.extraprofile?.profileSummary,
    selectResumeHeadline: (state) => state.profile.extraprofile?.resumeHeadline
  }), []);

  const user = useSelector(selectors.selectUser);
  const token = useSelector(selectors.selectToken);
  const certificates = useSelector(selectors.selectCertificates);
  const Onlineprofile = useSelector(selectors.selectOnlineProfiles);
  const skillProfiles = useSelector((state) => state.profile.skillprofiles);
  const careerProfiles = useSelector(selectors.selectCareerProfiles);
  const projectProfiles = useSelector(selectors.selectProjectProfiles);
  const empProfile = useSelector(selectors.selectEmployeeProfiles);
  const educationProfiles = useSelector(selectors.selectEducationProfiles);
  const imageUrl = useSelector(selectors.selectImage);
  const personalDetail = useSelector(selectors.selectPersonalDetails);
  const about = useSelector(selectors.selectAbout);
  const location = useSelector(selectors.selectLocation);
  const contactNumber = useSelector(selectors.selectContactNumber);
  const profileSummery = useSelector(selectors.selectProfileSummery);
  const resumeHeadline = useSelector(selectors.selectResumeHeadline);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch certificates on component mount
  useEffect(() => {
    if (token && user) {
      if (certificates && certificates.length === 0) {
        dispatch(fetchCertificates(token));
      }
      if (!Onlineprofile || Object.keys(Onlineprofile).length === 0) {
        dispatch(getOnlineProfiles(token));
      }
      if (skillProfiles && skillProfiles.length === 0) {
        dispatch(fetchSkillProfiles(token));
      }
      if (careerProfiles && careerProfiles.length === 0) {
        dispatch(fetchCareers(token));
      }
      if (projectProfiles && projectProfiles.length === 0) {
        dispatch(fetchProject(token));

      }
      if (empProfile && empProfile.length === 0) {
        dispatch(fetchEmploymentProfile(token));
      }
      if (educationProfiles && educationProfiles.length === 0) {
        dispatch(fetchEducationProfile(token));
      }
      if (token && user) {
        dispatch(fetchExtraProfile(token));
      }
      if (token && user) {
        dispatch(fetchPersonalDetails(token));
      }
    }
  }, [dispatch, token]);

  // Update sectionData when onlineProfile change in Redux

  useEffect(() => {
    if (Onlineprofile && Object.keys(Onlineprofile).length > 0) {
      setSectionData(prevData => ({
        ...prevData,
        onlineprofile: [Onlineprofile]
      }));
    }
  }, [Onlineprofile]);

  // Update sectionData when certificates change in Redux
  useEffect(() => {
    if (certificates && certificates.length > 0) {
      setSectionData(prevData => ({
        ...prevData,
        certification: certificates
      }));
    }
  }, [certificates]);

  useEffect(() => {
    if (educationProfiles) {

      setSectionData(prevData => ({
        ...prevData,
        education: educationProfiles
      }));
    }
  }, [educationProfiles]);

  useEffect(() => {
    if (skillProfiles && skillProfiles.length > 0) {
      setSkillsData(skillProfiles);
    }
  }, [skillProfiles]);


  const [profileImage, setProfileImage] = useState(require('../../assets/profile.png'));
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupType, setPopupType] = useState('');
  const [newInput, setNewInput] = useState('');
  const [activeLink, setActiveLink] = useState('resume');
  const [isSkillsVisible, setSkillsVisible] = useState(false);
  const [skillsData, setSkillsData] = useState([]);
  const [showExtraProfile, setShowExtraProfile] = useState(false);
  const [isNamePopupOpen, setIsNamePopupOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [initialValue, setInitialValue] = useState("");
  const [openModal, setOpenModal] = useState(null);
  const [changePassword, setChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  // const [openEmpForm, setOpenEmpForm] = useState(null);
  const totalFields = 10; 
  const completedFields = [
    // imageUrl && { field: 'profile image', value: imageUrl },
    // about && { field: 'about', value: about },
    // location && { field: 'location', value: location },
    // user?.email && { field: 'email', value: user.email },
    // contactNumber && { field: 'contact number', value: contactNumber },
    resumeHeadline && { field: 'resume headline', value: resumeHeadline },
    projectProfiles?.length > 0 && { field: 'projects', value: projectProfiles },
    skillsData?.length > 0 && { field: 'IT skills', value: skillsData },
    educationProfiles?.length > 0 && { field: 'education', value: educationProfiles },
    profileSummery && { field: 'profile summary', value: profileSummery },
    empProfile?.length > 0 && { field: 'employment', value: empProfile },
    careerProfiles?.length > 0 && { field: 'career profile', value: careerProfiles },
    personalDetail && { field: 'personal details', value: personalDetail },
  ].filter(Boolean);
  





  // -------------------------------------skillprofile update and deletion------------------------------------

  const [sectionData, setSectionData] = useState({});

  const [editModal, setEditModal] = useState({ sectionId: null, itemIndex: null, fieldKey: null, fieldValue: "" }); // Manage edit modal state

  const [editingSkill, setEditingSkill] = useState(null);




  const handleSkillEditClick = (skill, index) => {
    console.log(skill._id);
    setEditingSkill({ ...skill, index });


  };


  const handleDeleteSkill = (token, skillId) => {
    dispatch(deleteSkillProfiles(token, skillId)).then(() => {
      setSkillsData(prevSkills => prevSkills.filter(skill => skill._id !== skillId));
    }).catch(error => {
      console.error("Error deleting skill:", error);
    });
  };

  const handleCloseEditModal = () => {
    setEditingSkill(null);
  };

  // -------------------------------------------------------------------------------------------------------------


  //------------------------------ updation and deletion of personal detail-----------------------------------

  const [showModal, setShowModal] = useState(false);
  const handleDelete = () => {

    if (window.confirm('Are you sure you want to delete your personal details?')) {

      dispatch(deletePersonaldetails(token));

    }

  };



  const handleModalClose = () => {
    setShowModal(false);
    setChangePassword(false);
  };

  // --------------------------------------------------------------------------------------------------------------

  // ---------------------------------- save , edit, delete of Accomplishments ---------------------------------------

  const handleSaveData = async (sectionType, data) => {
    try {
      if (sectionType === 'certification') {
        // Update the sectionData state with the new certificate
        setSectionData(prevData => ({
          ...prevData,
          certification: [...(prevData.certification || []), data]
        }));

        // Refresh certificates from the server
        //dispatch(fetchCertificates(token));

      } else if (sectionType === 'onlineprofile') {
        setSectionData((prevData) => ({
          ...prevData,
          onlineprofile: [...(prevData.onlineprofile || []), data,],
        }));
        //dispatch(getOnlineProfiles(token));
      }



    } catch (error) {
      console.error("Error saving data:", error);
    }
  };





  const handleSaveForProfile = (updatedData) => {
    setProfileData((prevData) => ({
      ...prevData,
      ...updatedData,
    }));
    setIsPopupOpen(false);
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
    const { sectionId, itemIndex, fieldKey, certificateData, fieldValue } = editModal;

    if (!sectionData[sectionId]?.[itemIndex]) {
      console.error("Selected item not found");
      return;
    }

    try {
      if (sectionId === 'certification') {
        const currentCertificate = sectionData[sectionId][itemIndex];

        // Ensure all required fields are present
        const updatedCertificate = {
          certificateName: certificateData.certificateName,
          certificateDescription: certificateData.certificateDescription,
          certificateLink: certificateData.certificateLink,
        };

        // Make sure we have the certificate ID
        if (!currentCertificate._id) {
          throw new Error('Certificate ID is missing');
        }

        // Dispatch the update action and wait for the response
        const response = await dispatch(updateCertificates(token, currentCertificate._id, updatedCertificate))

        if (response && response.data) {
          // Update the local state with the response data
          setSectionData(prev => {
            const updatedCertificates = [...prev[sectionId]];
            updatedCertificates[itemIndex] = response.data;
            return {
              ...prev,
              [sectionId]: updatedCertificates
            };
          });

          // Optionally refetch certificates to ensure sync
          //dispatch(fetchCertificates(token));
        }
      } else if (sectionId === 'onlineprofile') {
        // New logic for online profiles
        const currentProfile = sectionData[sectionId][itemIndex];

        // Create an object with the updated field
        const updatePayload = {
          [fieldKey]: fieldValue
        };

        const response = await dispatch(updateonlineProfiles(token, updatePayload));

        if (response && response.data) {
          setSectionData(prev => {
            const updatedProfiles = [...prev[sectionId]];
            updatedProfiles[itemIndex] = {
              ...updatedProfiles[itemIndex],
              [fieldKey]: fieldValue
            };
            return {
              ...prev,
              [sectionId]: updatedProfiles
            };
          });


        }


      }



      // Close the modal after successful update
      closeModal();

    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const handleDeletes = async (sectionId, itemIndex, item) => {
    try {
      if (sectionId === 'certification') {
        const currentCertificate = sectionData[sectionId][itemIndex];
        // Delete for certificates
        await dispatch(deleteCertificates(token, currentCertificate._id));

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

  const renderCertificate = (item, index, sectionId) => {
    if (!item) return null;

    return (
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
  };
  //------------------------------- Oneline Profile Design ---------------------------------------   
  const renderOnlineProfile = (item, index, sectionId) => {
    if (!item) return null;

    // Define which fields to display and their labels
    const profileFields = {
      instagramLink: "Instagram",
      facebookLink: "Facebook",
      githubLink: "GitHub",
      linkedinLink: "LinkedIn"
    };

    return (
      <div key={index} className=" rounded-md bg-white shadow-sm">
        {Object.entries(item)
          .filter(([key, value]) =>
            profileFields[key] && value && value !== null && value !== ""
          )
          .map(([key, value]) => (
            <div key={key} className="flex justify-between items-center mt-4">
              <div>
                <h1 className="font-medium">{profileFields[key]}</h1>

                <a href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  {value}
                </a>
              </div><div className="flex gap-4">
                <button
                  onClick={() => handleEdit(sectionId, index, key, value)}
                  className="text-blue-600 hover:text-blue-800"
                  aria-label={`Edit ${profileFields[key]}`}
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleDeletes(sectionId, index, key)}
                  className="text-red-600 hover:text-red-800"
                  aria-label={`Delete ${profileFields[key]}`}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
      </div>
    );
  };


  // ---------------------------------------------------------------------------------------------------------------------



  // ------------------------------- update and delete of career profile ---------------------------------------------

  const [currentProfile, setCurrentProfile] = useState(null);
  const handleAddProfile = () => {
    setCurrentProfile(null);
    setIsModalOpen(true);
  };

  const updateCareersProfile = (profile) => {
    setCurrentProfile(profile);
    setIsModalOpen(true);
  };

  const handleSubmitForCareerProfile = (submitData) => {
    setIsModalOpen(false);
  };

  const handleDeleteForCareerProfile = (profileId) => {
    dispatch(deleteCareers(token, profileId));
  };

  // --------------------------------------------------------------------------------------------------------------------


  // --------------------------------update and delete of education -------------------------------------------------
  const [isEducationProfileVisible, setIsEducationProfileVisible] = useState(false);
  const [editingEducation, setEditingEducation] = useState(null);

  const handleButtonEducation = () => {
    setEditingEducation(null);
    setIsEducationProfileVisible(true);
  };

  const handleEditEducation = (education) => {
    setEditingEducation(education);
    setIsEducationProfileVisible(true);
  };

  const handleEducationSaved = () => {
    setIsEducationProfileVisible(false);
    setEditingEducation(null);
  };

  const handleDeleteEducation = (token, educationId) => {
    dispatch(deleteEducationProfiles(token, educationId));
  };
  // --------------------------------------------------------------------------------------------------------------------

  // --------------------------------update and delete of projects ---------------------------------------------------

  const [isProjectVisible, setIsProjectVisible] = useState(false);
  const [editingProject, setEditingProject] = useState(null);


  const handleButtonClick = () => {
    setEditingProject(null);
    setIsProjectVisible(true);
  };

  const handleProjectEditClick = (project) => {
    setEditingProject(project);
    setIsProjectVisible(true);
  };

  const handleProjectSaved = (projectData) => {
    setIsProjectVisible(false);
    setEditingProject(null);
  };

  const handleDeleteProject = (token, projectId) => {
    dispatch(deleteProjects(token, projectId));
  };
  // --------------------------------------------------------------------------------------------------------------------


  // ------------------------------------update and delete of employement -----------------------------------------
  const [showEmp, setShowEmp] = useState(false);
  const [selectEmpProfile, setselectEmpProfile] = useState(null);
  const [empProfiles, setEmpProfiles] = useState();
  const [selectedEmployment, setSelectedEmployment] = useState(null);  // Added missing state
  const [showEmploymentForm, setShowEmploymentForm] = useState(false);

  const handleAddEmployment = () => {
    setSelectedEmployment(null);
    setShowEmploymentForm(true);
  };

  const handleEditEmployment = (employment) => {
    setSelectedEmployment(employment);
    setShowEmploymentForm(true);
  };

  const handleFormClose = () => {
    setShowEmploymentForm(false);
    setSelectedEmployment(null);
  };

  const handleDeleteEmployment = async (token, profileId) => {
    try {
      console.log("token", token, "emp id", profileId);
      await dispatch(deleteEmploymentProfiles(token, profileId));
      setEmpProfiles(empProfile.filter(profile => profile._id !== profileId));
    } catch (error) {
      console.error('Error deleting profile:', error);
    }
  };

  const handleFormSubmitSuccess = async () => {
    try {
      const updatedProfiles = empProfile;
      setEmpProfiles(updatedProfiles);
      setShowEmp(false);
      setselectEmpProfile(null);
    } catch (error) {
      console.error('Error refreshing profiles:', error);
    }
  };
  // --------------------------------------------------------------------------------------------------------------------

  const { register, handleSubmit } = useForm({

  });


  const handleSaveForName = (updatedData) => {


    try {
      dispatch(updateDetail(token, updatedData)); // Dispatch updated data

    } catch (error) {
      console.log(error.message);
    }
    setIsNamePopupOpen(false);
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



  const handleButtonClick2 = () => {
    setSkillsVisible(!isSkillsVisible);
  };


  const handleSkillsSaved = (data) => {
    if (data) {
      setSkillsData([...skillsData, data]);
    }
    setSkillsVisible(false);
  };



  const mainSectionRef = useRef(null);


  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const tempImageURL = URL.createObjectURL(file);
      setProfileImage(tempImageURL);

      try {
        // Upload to server

        await dispatch(uploadProfileImage(token, file));

      } catch (error) {
        console.error("Error uploading image:", error);
        setProfileImage(user?.image || require("../../assets/default-profile.jpg"));
      }
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

  const handleDeleteUser = () => {
    dispatch(deleteUser(token, navigate));
    console.log("Profile deleted");
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    console.log("Profile deletion canceled");
    setIsModalOpen(false);
  };

  const handleChangePass = (e) => {
    e.preventDefault();
    setChangePassword(true);
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (oldPassword === newPassword) {
      setError('New password must be different from the current password');
      return;
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }


    try {

      // await changePasswordAPI(oldPassword, newPassword);
      await changePasswords(token, oldPassword, newPassword);


      setOldPassword('');
      setNewPassword('');
      setError('');
      setChangePassword(false);


      // Optional: Show success message or close modal
    } catch (err) {
      setError('Failed to change password');
    }
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


  const sections = [
    {
      id: 'onlineprofile',
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
                <ProfileWithProgressRing 
          imageUrl={imageUrl}
          handleImageUpload={handleImageUpload}
          completedFields={completedFields}
          totalFields={totalFields}
        />
      
                <div className="profile-info w-[70%] p-4">
                  <div className="heading w-full flex flex-col gap-4 border-b-[0.5px] pb-3 ">
                    <div className="name flex gap-5 items-center pt-4 group">
                      <h1 className='w-fit h-fit text-3xl font-semibold'>{user?.firstName} {user?.lastName}</h1>
                      <FaPencilAlt onClick={() => togglePopupForName()} className="cursor-pointer text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className='about flex gap-5  items-center pt-4 group'>
                      <h2 className='text-zinc-600 text-lg'>{about ? about : "enter your profile"}</h2>
                      <FaPencilAlt onClick={() => togglePopup("about")} className="cursor-pointer text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>


                  </div>
                  <div className="lower-div w-full flex">
                    <div className="left-div h-full w-[50%] flex flex-col gap-3 p-2">
                      <div className="location flex gap-5 items-center group">
                        <IoLocationOutline />
                        <span className={`text-md font-medium `}>{location ? location : "enter your location"}</span>
                        <FaPencilAlt onClick={() => handleEditClick("location", "New York")} className="cursor-pointer text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      {/* <div className="email flex gap-5 items-center group ">
                        <CiMail />
                        <span className="text-md font-medium text-black"> {user?.email?.length > 8 ? `${user.email.slice(0, 12)}...` : user?.email}</span>
                        <FaPencilAlt onClick={() => handleEditClick("email", "Enter your email id")} className="cursor-pointer text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div> */}
                       <div className="email flex gap-5 items-center group">
          <CiMail />
          <span className="text-md font-medium text-black">
            {user?.email?.length > 8 ? `${user.email.slice(0, 12)}...` : user?.email}
          </span>
          <div className="verified-badge flex items-center">
            <MdVerified className="text-green-500 ml-1" title="Verified Email" />
          </div>
          <FaPencilAlt onClick={() => handleEditClick("email", "Enter your email id")} className="cursor-pointer text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
                    </div>

                    <div className="right-div h-full w-[50%] flex flex-col gap-3 p-2">
                      <div className="p-number flex gap-5 items-center group">
                        <MdLocalPhone />
                        <span className="text-md font-medium text-black">{contactNumber}</span>
                        <FaPencilAlt onClick={() => handleEditClick("contactNumber", "123-456-7890")} className="cursor-pointer text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
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
                    {/* <button onClick={() => setIsDeleteModalOpen(true)} className='px-3 py-2 border bg-red-500 text-white rounded-full cursor-pointer font-semibold hover:bg-red-600'>
                      Delete profile
                    </button> */}

                    <h1 className=' text-blue-500 cursor-pointer' onClick={handleChangePass}>Reset Password</h1>
                  </div>
                </div>
              </div>

              <div ref={mainSectionRef} className="main min-h-full w-[70%] flex flex-col gap-4">
  <div className="min-h-[400px] border p-5 rounded-lg shadow-lg" id='Resume'>
    <div className="head">
      <div className=""><h1 className='font-semibold text-2xl'>Resume </h1> </div>
      <p className='text-zinc-400'>70% of recruiters discover candidates through their resume</p>
    </div>
    <ResumeUpload />
  </div>
  
  <div className="min-h-[100px] border rounded-lg flex p-4 flex-col shadow-lg" id='Resume-headline'>
    <div className="head flex w-full justify-between px-4">
      <div className="flex justify-between px-2 h-fit w-fit gap-5 items-center">
        <h1 className='font-semibold text-2xl'>Resume headline</h1> 
        {!resumeHeadline && <p className='text-green-400'>Add 8%</p>}
      </div>
      <h1 className='text-blue-700 font-semibold cursor-pointer' 
        onClick={() => togglePopup('add resume headlines')}>
        {resumeHeadline ? 'Edit resume headline' : 'Add resume headline'}
      </h1>
    </div>
    
    {!resumeHeadline ? (
      <p className='text-zinc-400 px-6'>Add a summary of your resume to introduce yourself to recruiters</p>
    ) : (
      <div className='p-6 mt-5 border'>
        <p>{resumeHeadline}</p>
      </div>
    )}
  </div>
  
  <div className="min-h-[100px] border rounded-lg flex p-4 flex-col shadow-lg" id='key-skills'>
    <div className="head flex w-full justify-between px-4">
      <div className="flex justify-between px-2 w-fit gap-5 items-center">
        <h1 className='font-semibold text-2xl'>Key skills</h1> 
        {!skillsData && <p className='text-green-400'>Add 8%</p>}
      </div>
      <h1 className='text-blue-700 font-semibold cursor-pointer' 
        onClick={() => togglePopup('Add key skills')}>
        {skillsData ? 'Edit key skills' : 'Add key Skills'}
      </h1>
    </div>
    <p className='text-zinc-400 px-6'>Recruiters look for candidates with specific key skills</p>
  </div>

  <div className="min-h-[100px] border rounded-lg flex p-4 flex-col shadow-lg" id='education'>
    <div className="head flex w-full px-4 flex-col">
      <div className="flex justify-between w-full">
        <div className="flex justify-between px-2 w-fit gap-5 items-center">
          <h1 className='font-semibold text-2xl'>Education</h1>
          {educationProfiles.length === 0 && <p className='text-green-400'>Add 10%</p>}
        </div>
        <h1
          className='text-blue-700 font-semibold cursor-pointer flex flex-col'
          onClick={handleButtonEducation}
        >
          {educationProfiles.length > 0 ? 'Add more education' : 'Add education'}
        </h1>
      </div>
      <p className='text-zinc-400 px-2'>Your qualifications help employers know your educational background</p>

      <div className="space-y-4">
        {educationProfiles.length > 0 ? (
          educationProfiles.map((education, index) => (
            <div key={index} className="flex justify-between px-2 w-full gap-5 items-start mt-5 border p-3 rounded-xl">
              <div className="flex flex-col space-y-2">
                <p className='font-medium'>Institution Name: {education.institutionName}</p>
                <p className='font-medium'>Course Name: {education.courseName}</p>
                <p className='font-medium'>Course Type: {education.courseType}</p>
                <p className='font-medium'>Duration: {education.duration}</p>
                <p className='font-medium'>Marks: {education.marks}</p>
                <p className='font-medium'>Location: {education.location}</p>
                <p className='font-medium'>Education Level: {education.education}</p>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleEditEducation(education)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <Pencil size={20} />
                </button>
                <button
                  onClick={() => handleDeleteEducation(token, education._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div></div>
        )}
        {isEducationProfileVisible && (
          <EducationForm
            onSave={handleEducationSaved}
            initialData={editingEducation}
            onClose={() => setIsEducationProfileVisible(false)}
          />
        )}
      </div>
    </div>
  </div>

  <div className="min-h-[100px] border rounded-lg flex p-4 flex-col shadow-lg" id='IT-skills'>
    <div className="head flex w-full justify-between px-4">
      <div className="flex justify-between px-2 w-fit gap-5 items-center">
        <h1 className='font-semibold text-2xl'>IT skills</h1> 
        {skillsData.length === 0 && <p className='text-green-400'>Add 18%</p>}
      </div>
      <h1 className='text-blue-700 font-semibold cursor-pointer'
        onClick={handleButtonClick2}>
        {skillsData.length > 0 ? 'Add more IT skills' : 'Add IT skills'}
      </h1>
    </div>
    <p className='text-zinc-400 px-6'>Show your technical expertise by mentioning softwares and skills you know</p>

    {isSkillsVisible && (
      <SkillsForm onSave={handleSkillsSaved} />
    )}

    <div className="space-y-4">
      {skillsData.length > 0 ? (
        skillsData.map((skill, index) => (
          <div
            key={index}
            className="flex justify-between items-center border p-3 mt-3 rounded-lg bg-white shadow-sm"
          >
            <div>
              <div className=" text-gray-800">
                <span className='font-medium'>Skill Name:</span> {skill.skillName}
              </div>
              <div className="text-gray-800 ">
                <span className='font-medium'>Experience:</span> {skill.experience} Years
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleSkillEditClick(skill, index)}
                className="text-blue-500 hover:text-blue-700"
              >
                <Pencil size={20} />
              </button>
              <button
                onClick={() => handleDeleteSkill(token, skill._id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))
      ) : (
        <div></div>
      )}
      {editingSkill && (
        <SkillsForm
          editMode={true}
          initialSkill={editingSkill}
          onSave={handleCloseEditModal}
          skillId={editingSkill._id}
        />
      )}
    </div>
  </div>

  <div className="min-h-[100px] border rounded-lg flex p-4 flex-col shadow-lg" id='Projects'>
    <div className="head flex w-full justify-between px-4">
      <div className="flex justify-between px-2 w-fit gap-5 items-center">
        <h1 className='font-semibold text-2xl'>Projects</h1>
        {projectProfiles.length === 0 && <p className='text-green-400'>Add 8%</p>}
      </div>
      <h1
        className='text-blue-700 font-semibold cursor-pointer'
        onClick={handleButtonClick}
      >
        {projectProfiles.length > 0 ? 'Add more projects' : 'Add projects'}
      </h1>
    </div>

    <p className='text-zinc-400 px-6'>
      Stand out to employers by adding details about projects that you have done so far
    </p>

    {isProjectVisible && (
      <ProjectForm
        onSave={handleProjectSaved}
        isEdit={!!editingProject}
        initialData={editingProject}
      />
    )}

    <div className="projects-list mt-6">
      {projectProfiles.length > 0 ? (
        projectProfiles.map((project, index) => (
          <div key={index} className="project-entry flex justify-between pl-6 pr-4 pt-2 pb-2 border flex-col ">
            <div className="w-full flex justify-between items-start">
              <div className='w-full'>
                <p><span className='font-medium'>Project Title:</span> {project.projectTitle}</p>
                <p><span className="font-medium">Link:</span> {project.projectLink}</p>
                <p><span className='font-medium'>Description:</span> {project.projectDescription}</p>
                <p><span className='font-medium'>Skills:</span> {project.projectSkills}</p>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleProjectEditClick(project)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <PencilIcon size={20} />
                </button>
                <button
                  onClick={() => handleDeleteProject(token, project._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2Icon size={20} />
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p></p>
      )}
    </div>
  </div>

  <div className="min-h-[100px] border rounded-lg flex p-4 flex-col shadow-lg" id='Profile-summery'>
    <div className="head flex w-full justify-between px-4">
      <div className="flex justify-between px-2 w-fit gap-5 items-center">
        <h1 className='font-semibold text-2xl'>Profile summery</h1> 
        {!profileSummery && <p className='text-green-400'>Add 10%</p>}
      </div>
      <h1 className='text-blue-700 font-semibold cursor-pointer'
        onClick={() => togglePopup('add profile summary')}>
        {profileSummery ? 'Edit profile summary' : 'Add profile summary'}
      </h1>
    </div>

    {!profileSummery ? (
      <p className='text-zinc-400 px-6'>Highlight your key career achievements to help employers know your potential</p>
    ) : (
      <div className='p-6 mt-5 border'>
        <p>
          {profileSummery}
        </p>
      </div>
    )}
  </div>

  <div className="min-h-[100px] border rounded-lg flex p-4 flex-col shadow-lg" id="employment">
    <div className="head flex w-full justify-between px-4">
      <div className="flex justify-between px-2 w-fit gap-5 items-center">
        <h1 className="font-semibold text-2xl">Employment</h1>
        {(!empProfile || empProfile.length === 0) && <p className="text-green-400 relative top-1">Add 15%</p>}
      </div>
      <button
        className="text-blue-700 font-semibold hover:text-blue-800"
        onClick={handleAddEmployment}
      >
        {empProfile && empProfile.length > 0 ? 'Add more employment' : 'Add employment'}
      </button>
    </div>
    {showEmploymentForm && (
      <EmploymentForm
        initialData={selectedEmployment}
        onClose={handleFormClose}
        onSubmitSuccess={handleFormSubmitSuccess}
      />
    )}
    {empProfile && empProfile.length > 0 ? (
      <div className="empProfile-display mt-6 px-4">
        <ul className="space-y-4">
          {empProfile.map((employment) => (
            <div key={employment._id} className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-gray-900 text-lg">{employment.currentJobTitle}</h4>
                    {employment.isCurrentEmp && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Current</span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p><span className="font-semibold">Type:</span> {employment.empType}</p>
                      <p><span className="font-semibold">Experience:</span> {employment.totalExp} years</p>
                      <p><span className="font-semibold">Salary:</span> {employment.currentSalary}</p>
                      <p><span className="font-semibold">Company:</span> {employment.companyName}</p>
                      <p><span className="font-semibold">Notice Period:</span> {employment.noticePeriod}</p>
                      <p><span className="font-semibold">Join Date:</span> {new Date(employment.joinDate).toLocaleDateString()}</p>
                      {!employment.isCurrentEmp && employment.leaveDate && (
                        <p><span className="font-semibold">Leave Date:</span> {new Date(employment.leaveDate).toLocaleDateString()}</p>
                      )}
                      <p><span className="font-semibold">Profile:</span> {employment.jobProfile}</p>
                    </div>
                  </div>
                  <div className="-mt-5">
                    <p><span className="font-semibold">Skills:</span> {employment.skill}</p>
                    <p><span className="font-semibold">Description:</span> {employment.jobDescription}</p>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleEditEmployment(employment)}
                    className="text-blue-500 hover:text-blue-700 p-1"
                    aria-label="Edit employment"
                  >
                    <PencilIcon size={20} />
                  </button>
                  <button
                    onClick={() => handleDeleteEmployment(token, employment._id)}
                    className="text-red-500 hover:text-red-700 p-1"
                    aria-label="Delete employment"
                  >
                    <Trash2Icon size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </ul>
      </div>
    ) : (
      <p className="text-zinc-400 px-6 mt-4">
        Add your work history to showcase your professional experience and career progression
      </p>
    )}
  </div>

  <div className="p-6 shadow-lg border rounded-lg">
    <div className="flex justify-between">
      <div className="flex gap-5 items-center">
        <h2 className="text-xl font-medium">Accomplishments</h2>
      
      </div>
    </div>
    <p className="text-gray-600 mb-4">
      Showcase your credentials by adding relevant certifications, work samples, online profiles, etc.
    </p>

    <div className='space-y-6' >
      {sections.map((section) => (
        <div key={section.id} >
          <div className="flex justify-between items-start">
            <div >
              <h3 className="font-medium text-gray-800">{section.title}</h3>
              <p className="text-gray-600 text-sm mt-1">{section.description}</p>
            </div>
            <button
              className="text-blue-600 font-medium"
              onClick={() => setOpenModal(section.id)}
            >
              {sectionData[section.id]?.length > 0 ? 'Add more' : 'Add'}
            </button>
          </div>

          {sectionData[section.id]?.length > 0 && (
            <div>
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
      <div className="flex justify-between px-2 w-fit gap-5 items-center ">
        <h1 className='font-semibold text-2xl'>Career Profile</h1>
        {(!careerProfiles || careerProfiles.length === 0) && <p className='text-green-400'>Add 18%</p>}
      </div>
      <h1
        className='text-blue-700 font-semibold cursor-pointer'
        onClick={handleAddProfile}
      >
        {careerProfiles && careerProfiles.length > 0 ? 'Edit Career Profile' : 'Add Career Profile'}
      </h1>
    </div>

    {careerProfiles && careerProfiles.length > 0 ? (
      <div className="mt-4 px-6">
        <div className="p-4 rounded-lg border">
          {careerProfiles.map((career, index) => (
            <div key={index} className="mb-4 pb-4 border-b last:border-b-0 relative">
              <div className="absolute right-0 top-0 flex space-x-2">
                <Pencil
                  className="text-blue-500 cursor-pointer hover:text-blue-700"
                  size={20}
                  onClick={() => updateCareersProfile(career)}
                />
                <Trash2
                  className="text-red-500 cursor-pointer hover:text-red-700"
                  size={20}
                  onClick={() => handleDeleteForCareerProfile(career._id)}
                />
              </div>
              {Object.entries(career).map(([key, value]) =>
                value && key !== '_id' ? (
                  <div key={key} className="flex mt-2">
                    <span className="font-medium mr-2 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').toLowerCase()}:
                    </span>
                    <span>{value}</span>
                  </div>
                ) : null
              )}
            </div>
          ))}
        </div>
      </div>
    ) : (
      <p className='text-zinc-400 px-6'>
        Add details about your current and preferred career profile.
        This helps us personalise your job recommendations.
      </p>
    )}

    <CareerProfileModal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onSubmit={handleSubmitForCareerProfile}
      initialData={currentProfile}
    />
  </div>

  <div className="min-h-[100px] border rounded-lg flex p-4 flex-col shadow-lg" id="Personal-details">
    <div className="head flex w-full justify-between px-4">
      <div className="flex justify-between px-2 w-fit gap-5 items-center">
        <h1 className="font-semibold text-2xl">Personal details</h1>
        {!personalDetail && <p className="text-green-400">Add 18%</p>}
      </div>
      <button
        className="text-blue-700 font-semibold cursor-pointer hover:text-blue-800"
        onClick={() => setShowModal(true)}
      >
        {personalDetail ? 'Edit personal details' : 'Add personal details'}
      </button>
    </div>

    <p className="text-zinc-400 px-6 mb-4">
      This information is important for employers to know you better
    </p>

    {personalDetail && (
      <div className="px-6 space-y-3 relative">
        {/* Only show delete button if there's at least one field with data */}
        {(personalDetail.gender || personalDetail.dateOfBirth || personalDetail.martialStatus ||
          personalDetail.address || personalDetail.permanentAddress ||
          (personalDetail.language && personalDetail.language.length > 0)) && (
            <button
              onClick={handleDelete}
              className="absolute top-0 right-0 p-2 text-red-500 transition-colors"
              aria-label="Delete personal details"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {personalDetail.gender && (
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Gender</p>
                <p className="font-medium">{personalDetail.gender}</p>
              </div>
            </div>
          )}

          {personalDetail.dateOfBirth && (
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Date of Birth</p>
                <p className="font-medium">{personalDetail.dateOfBirth}</p>
              </div>
            </div>
          )}

          {personalDetail.martialStatus && (
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Martial Status</p>
                <p className="font-medium">{personalDetail.martialStatus}</p>
              </div>
            </div>
          )}

          {personalDetail.address && (
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Current Address</p>
                <p className="font-medium">{personalDetail.address}</p>
              </div>
            </div>
          )}

          {personalDetail.permanentAddress && (
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Permanent Address</p>
                <p className="font-medium">
                  {personalDetail.permanentAddress}
                  {personalDetail.pincode && ` - ${personalDetail.pincode}`}
                </p>
              </div>
            </div>
          )}

          {personalDetail.language?.length > 0 && (
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Languages</p>
                <p className="font-medium">{personalDetail.language.join(', ')}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    )}

    {showModal && (
      <ExtraProfile
        isEdit={!!personalDetail}
        initialData={personalDetail}
        onSave={(data) => {
          handleModalClose();
        }}
      />
    )}
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

        {changePassword && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-96 p-6 relative">
              <button
                onClick={handleModalClose}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl"
              >
                &times;
              </button>

              <h2 className="text-2xl font-bold mb-6 text-center">Change Password</h2>

              <form onSubmit={handlePasswordChange}>
                <div className="mb-4">
                  <label
                    htmlFor="oldPassword"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="oldPassword"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="Enter current password"
                    required
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="newPassword"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    required
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {error && (
                  <div className="mb-4 text-red-500 text-sm text-center">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                  Change Password
                </button>
              </form>
            </div>
          </div>
        )}







        {/* {isDeleteModalOpen && (
          <div className="modal fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="modal-content bg-white p-6 rounded shadow-lg w-1/3 text-center">
              <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
              <p className="text-gray-700 mb-6">Are you sure you want to delete your profile?</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleDeleteUser}
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
        )} */}
      </div >
    </>
  );
}
export default UserProfile;

