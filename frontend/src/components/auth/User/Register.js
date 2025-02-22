import React, {  useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from "react-hot-toast"
// import { userPoint } from '../../../services/apis';
import { ROLE_TYPE , USER_TYPE} from '../../../slices/constant';
import { useDispatch } from "react-redux"
import { setSignupData } from "../../../slices/userSlice"
import { signupUser } from '../../../operations/userAPI';

function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const [userType, setUserType] = useState(USER_TYPE.FRESHER);

    const [formData, setFormData] = useState({

        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: ROLE_TYPE.JOBSEEKER,
       workstatus:""
        
    

    });
       
    const handleClick = (status) => {
        setSelectedStatus(status);
    
        // Update userType and formData status based on the selected status
        if (status === 'experienced') {
            
            setFormData((prevData) => ({
                ...prevData,
                workstatus: USER_TYPE.EXPERIENCED, // Update status to 'experienced'
            }));
        } else {
        
            setFormData((prevData) => ({
                ...prevData,
                workstatus: USER_TYPE.FRESHER, // Update status to 'fresher'
            }));
        }
    
        // Reset location and suggestions
        setLocation('');
        setSuggestions([]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
       dispatch(signupUser(
        firstName,
        lastName,
        email,
        password,
        role,
        workstatus,
        navigate
       ));
        if (validateForm()) {
            const signupData = { ...formData };
           dispatch(setSignupData(signupData));
            //for reseting after submiting
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                role:ROLE_TYPE.JOBSEEKER,
                workstatus: "",
            
                
            });
        } else {
            alert("Form is not valid.");
        }

       
    };


    
    // const [role, setRole] = useState(ROLE_TYPE.JOBSEEKER)
    const [errors, setErrors] = useState({});
    const [selectedStatus, setSelectedStatus] = useState(''); 
    const [location, setLocation] = useState('');
    const [resume, setResume] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const [locationsList] = useState([
        'New York',
        'Los Angeles',
        'Chicago',
        'Houston',
        'Phoenix',
        'San Francisco',
        'Seattle',
    ]);


  

 

    // const handleLocationChange = (e) => {
    //     const userInput = e.target.value;
    //     setLocation(userInput);
    //     setSuggestions(
    //         locationsList.filter((loc) =>
    //             loc.toLowerCase().startsWith(userInput.toLowerCase())
    //         )
    //     );
    // };
    // const handleResumeChange = (e) => {
    //     setResume(e.target.files[0]);
    //   };

    const getBorderClass = (status) =>
        selectedStatus === status ? 'border-blue-500' : 'border-gray-300';
    const {firstName, lastName, email, password,role, workstatus} = formData

    const handleChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
          }))
    };


    //----------------- form validation methods -----------------------
    const validateForm = () => {
        const newErrors = {};
        if (!formData.firstName.trim()) {
            newErrors.firstName = true;
        }
        if (!formData.lastName.trim()) {
            newErrors.lastName = true;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = true;
        }
        if (!formData.password.length >= 6) {
            newErrors.password = true;
        }
        if (!formData.role.trim()) {
            newErrors.role = true;
        }
        // if (!/^\d{10}$/.test(formData.phoneNumber)) {
        //     newErrors.phoneNumber = true;
        // }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }



    

   
    const isFormValid =
        formData.firstName.trim() !== "" &&
        formData.lastName.trim() !== "" &&
        formData.email.trim() !== "" &&
        formData.password.trim().length >= 6 &&
        formData.role.trim() !== "";
    // selectedStatus && 
    // ((selectedStatus === 'experienced' ) || 
    //  (selectedStatus === 'fresher'));



    const inputClass = (field) => `w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`
    return (
        <>
            <div className="div min-h-[100vh] w-full bg-zinc-100">
                <div className="head w-full h-[80px] bg-white px-[50px] flex justify-center items-center  ">
                    <div className="h-full w-[60%] flex items-center justify-between ">
                        <div className="logo h-full w-[85px] flex items-center justify-center"><img src={require('../../../assets/logo.png')} alt="logo" className='relative top-[2px]' /></div>
                        <div className="login">
                            <h2 className='text-lg font-semibold'>Already Registered ?  <span><Link to="/components/auth/User/login" className='text-lg text-blue-600 hover:text-pink-400 '>Login </Link></span> here</h2>
                        </div>
                    </div>

                </div>

                <div className="container w-full h-[calc(100vh - 80px)] mx-auto px-[50px] flex justify-center items-center">

                    <div className="container w-[60%] min-h-[80%] bg-white mt-[50px] rounded-[25px] shadow-md">
                        <div className="form w-full h-full flex flex-col p-5 ">
                            <h2 className="text-2xl font-semibold mb-5">Create your One Career Profile</h2>
                            <p className='mt-[-15px] text-zinc-500 text-sm' >Search and apply jobs in India's Leading Website</p>

                            <div className="form-group mt-11">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 font-medium mb-2">
                                            First Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={firstName}
                                            onChange={handleChange}
                                            className={inputClass('name')}
                                            placeholder="Enter your name"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 font-medium mb-2">
                                            Last Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={lastName}
                                            onChange={handleChange}
                                            className={inputClass('name')}
                                            placeholder="Enter your name"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 font-medium mb-2">
                                            Email <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={email}
                                            onChange={handleChange}
                                            className={inputClass('email')}
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 font-medium mb-2">
                                            Password <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={password}
                                            onChange={handleChange}
                                            className={inputClass('password')}
                                            placeholder="Enter your password (min 6 characters)"
                                        />
                                    </div>



                                    <div className="work-status min-h-[180px] w-full flex items-center  gap-10 justify-center flex-col">
                                        <div className=" flex justify-start items-center w-full">     <h1>Work Status <span className="text-red-500">*</span></h1></div>

                                        <div className="h-[120px] w-full flex items-center justify-center gap-10 mt-[-40px]"><div className={`experience h-[80%] w-[45%] flex p-3 justify-between cursor-pointer border-2 rounded-lg ${getBorderClass(
                                            'experienced'
                                        )}`}
                                            onClick={() => handleClick('experienced')}
                                            value="Experienced"
                                            >
                                            <div className="info w-[65%] h-full p-1">
                                                <h1 className='font-semibold text-md '>I'm Experienced</h1>
                                                <p className='text-zinc-400 text-sm'>I have work experience (excluding internship)</p>
                                            </div>
                                            <div className="img h-full w-[25%] p-1 flex items-center justify-center">
                                                <img src={require('../../../assets/briefcase.png')} alt="img" className='h-full w-full ' />
                                            </div>
                                        </div>
                                            <div className={`fresher h-[80%] w-[45%] flex p-3 justify-between cursor-pointer border-2 rounded-lg ${getBorderClass(
                                                'fresher')}`}
                                                onClick={() => handleClick('fresher')}  
                                                value="Fresher"
                                            >
                                                <div className="info w-[65%] p-1">
                                                    <h1 className='font-semibold text-md '>I'm Fresher</h1>
                                                    <p className='text-zinc-400 text-sm'>I am a student/ Haven't worked after graduation</p>
                                                </div>
                                                <div className="imgh-full  w-[25%] p-1 flex items-center justify-center">
                                                    <img src={require('../../../assets/book.jpg')} alt="img" style={{ height: "60px", width: "60px" }} />
                                                </div>
                                            </div>
                                        </div>

                                        {/* <div className="additional-fields w-full flex ">
                                            {selectedStatus === 'experienced' && (
                                                <div className="upload-resume w-[60%] flex flex-col">
                                                    <label htmlFor="resume" className="font-semibold text-sm mb-2">
                                                        Upload Resume 
                                                    </label>
                                                    <input
                                                        type="file"
                                                        id="resume"
                                                        className="border border-gray-200 rounded-full p-2"
                                                        onChange={handleResumeChange}
                                                    />
                                                </div>
                                            )}
                                            {selectedStatus === 'fresher' && (
                                                <div className="enter-location w-full flex flex-col">
                                                    <label htmlFor="location" className="font-semibold text-sm mb-2">
                                                        Enter Your Location 
                                                    </label>
                                                    <input
                                                        type="text"
                                                        id="location"
                                                        value={location}
                                                        onChange={handleLocationChange}
                                                        className="border border-gray-300 rounded-lg p-2"
                                                        placeholder="Enter your location"
                                                    />
                                                    {location && suggestions.length > 0 && (
                                                        <ul className="mt-2 border border-gray-300 rounded-lg bg-white shadow-lg">
                                                            {suggestions.map((suggestion, index) => (
                                                                <li
                                                                    key={index}
                                                                    className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                                                                    onClick={() => setLocation(suggestion)}
                                                                >
                                                                    {suggestion}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </div>
                                            )}
                                        </div> */}

                                    </div>
                                    <div className="ters-cond mt-5">
                                        <p>By clicking Register, you agree to the <span className='text-blue-500 cursor-pointer hover:text-blue-800'>Terms and Conditions</span> & <span className='text-blue-500 cursor-pointer hover:text-blue-800'>Privacy Policy</span> of Onecareer.com</p>
                                    </div>
                                    <button
                                        type="submit"
                                        className={`px-6 py-2 text-white rounded-lg ${isFormValid
                                                ? 'bg-blue-500 hover:bg-blue-600'
                                                : 'bg-blue-200 cursor-not-allowed'
                                            } mt-10`}
                                        disabled={!isFormValid}
                                    >
                                        Register
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="footer h-[20vh] bg-transparent w-full flex justify-center items-center">
                    2022 © Onecareer.com. All rights reserved.
                </div>

            </div>
        </>
    )
}

export default Register