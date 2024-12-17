import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
    });

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

    const handleClick = (status) => {
        setSelectedStatus(status);
        setLocation('');
        setSuggestions([]);
    };

    const handleLocationChange = (e) => {
        const userInput = e.target.value;
        setLocation(userInput);
        setSuggestions(
            locationsList.filter((loc) =>
                loc.toLowerCase().startsWith(userInput.toLowerCase())
            )
        );
    };
    const handleResumeChange = (e) => {
        setResume(e.target.files[0]);
      };

    const getBorderClass = (status) =>
        selectedStatus === status ? 'border-blue-500' : 'border-gray-300';

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        setErrors({ ...errors, [name]: false });
    };


    //----------------- form validation methods -----------------------
    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) {
            newErrors.name = true;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = true;
        }
        if (formData.password.length < 6) {
            newErrors.password = true;
        }
        if (!/^\d{10}$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = true;
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            alert(`
        Name: ${formData.name}
        Email: ${formData.email}
        Password: ${formData.password}
        Phone Number: ${formData.phoneNumber}
        Location: ${location}
        Resume: ${resume? resume.name : 'No resume uploaded'}
        Status: ${selectedStatus}
      `);
        }
    };
    const isFormValid = 
    formData.name.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.password.trim().length >= 6 &&
    selectedStatus && 
    ((selectedStatus === 'experienced' ) || 
     (selectedStatus === 'fresher'));

    const inputClass = (field) =>
        `w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`;
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
                                            Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
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
                                            value={formData.email}
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
                                            value={formData.password}
                                            onChange={handleChange}
                                            className={inputClass('password')}
                                            placeholder="Enter your password (min 6 characters)"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 font-medium mb-2">
                                            Phone Number 
                                        </label>
                                        <input
                                            type="tel"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            className={inputClass('phoneNumber')}
                                            placeholder="Enter your phone number (10 digits)"
                                        />
                                    </div>

                                    <div className="work-status min-h-[180px] w-full flex items-center  gap-10 justify-center flex-col">
                                        <div className=" flex justify-start items-center w-full">     <h1>Work Status <span className="text-red-500">*</span></h1></div>

                                        <div className="h-[120px] w-full flex items-center justify-center gap-10 mt-[-40px]"><div className={`experience h-[80%] w-[45%] flex p-3 justify-between cursor-pointer border-2 rounded-lg ${getBorderClass(
                                            'experienced'
                                        )}`}
                                            onClick={() => handleClick('experienced')}
                                            value="experienced"
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
                                                value="fresher"
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

                                        <div className="additional-fields w-full flex ">
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
                                        </div>
                                    </div>
                                    <div className="ters-cond mt-5">
                                        <p>By clicking Register, you agree to the <span className='text-blue-500 cursor-pointer hover:text-blue-800'>Terms and Conditions</span> & <span className='text-blue-500 cursor-pointer hover:text-blue-800'>Privacy Policy</span> of Onecareer.com</p>
                                    </div>
                                    <button
                                        type="submit"
                                        className={`px-6 py-2 text-white rounded-lg ${
                                            isFormValid
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
