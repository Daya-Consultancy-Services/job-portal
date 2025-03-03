import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../Header';
import { useDispatch } from 'react-redux';
import { getPasswordResetToken, login } from '../../../operations/userAPI';
import toast from 'react-hot-toast';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [isRecoveryLoading, setIsRecoveryLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  
  const { email, password } = loginForm;

  let userType = localStorage.getItem('userType');

  if(userType === 'User'){
     userType = "jobseeker"
  };

  const validateForm = () => {
    const newErrors = {};
    if (!/\S+@\S+\.\S+/.test(loginForm.email)) {
      newErrors.email = true;
    }
    if (loginForm.password.length < 6) {
      newErrors.password = true;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setLoginForm((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert("Invalid email or password");
      return;
    }

    try {
      const response = await dispatch(login(email, password, navigate));

      if (response && response.token) {
        localStorage.setItem("token", response.token); 
        console.log("Token saved:", response.token);

        navigate('/dashboard'); 
      } 

    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again.");
    }

    setLoginForm({
      email: "",
      password: "",
    });
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    
    if (!recoveryEmail || !/\S+@\S+\.\S+/.test(recoveryEmail)) {
      alert("Please enter a valid email address");
      return;
    }
    
    setIsRecoveryLoading(true);

    if(dispatch(getPasswordResetToken(recoveryEmail, userType, setEmailSent))){
      setTimeout(() => {
        toast.success("Password reset link sent to your email");
        setIsRecoveryLoading(false);
        setShowForgotPassword(false);
      }, 1500);
    };
    


 
  };

  const isFormValid =
    loginForm.email.trim() !== "" && loginForm.password.trim().length >= 6;

  return (
    <>
      <Header />
      <div className="h-[100vh] w-full shadow-lg z-[10000] flex items-center justify-center">
        <div className="login-sec w-[60%] h-[70%] flex relative items-center">
          <div className="relative register-sec p-10 w-[50%] h-[95%] bg-white shadow-xl shadow-[#D2E3F1] rounded-xl">
            <h1 className='font-semibold text-2xl'>New to OneCareer ?</h1>
            <div className="desc mt-7 flex flex-col gap-3">
              <p>One click apply using OneCareer profile</p>
              <p>Get relevant job recommendations</p>
              <p>Showcase profile to top companies and consultants</p>
              <p>Know application status on applied jobs</p>
            </div>
            <Link to={"/components/auth/User/register"}>
              <button className='mt-8 border border-blue-400 px-4 py-3'>Register for Free</button>
            </Link>
            <div className="absolute right-7 bottom-3 vector-img h-[250px] w-[250px]">
              <img src={require("../../../assets/register.jpg")} alt="vector-img" />
            </div>
          </div>

          <div className="bg-white p-10 login-sec w-[50%] h-full absolute right-3 shadow-xl shadow-[#D2E3F1] rounded-xl flex flex-col">
            <h1 className='font-semibold text-2xl'>Login</h1>
            <form onSubmit={handleSubmit} className='relative flex flex-col h-[70%] mt-6'>
              <div className="flex flex-col w-full">
                <label htmlFor="email" className='text-xl '>Email ID</label>
                <input
                  type="email"
                  onChange={handleChange}
                  value={email}
                  id="email"
                  name="email"
                  required
                  placeholder='Enter your email id'
                  className='p-4 rounded-lg mt-3 bg-zinc-100'
                />
              </div>
              <div className="flex mt-5 flex-col w-full">
                <label htmlFor="password" className='text-xl '>Password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  placeholder="Enter your password (min 6 characters)"
                  className='p-4 rounded-lg mt-3 bg-zinc-100'
                />
                <div className="forgot mt-2 w-full flex items-center justify-end">
                  <button 
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className='text-blue-500 hover:text-blue-600'
                  >
                    Forgot Password ?
                  </button>
                </div>
              </div>

              <button
                type='submit'
                disabled={!isFormValid}
                className='absolute w-full h-[50px] flex items-center justify-center bg-blue-500 text-white mt-7 bottom-1 rounded-lg'>
                Login
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 z-[10001] overflow-y-auto bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Forgot Password</h2>
              <button 
                onClick={() => setShowForgotPassword(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <p className="text-gray-600 mb-6">
              Enter your email address and we'll send you a link to reset your password.
            </p>
            
            <form onSubmit={handleForgotPassword}>
              <div className="mb-6">
                <label htmlFor="recovery-email" className="block text-gray-700 text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="recovery-email"
                  value={recoveryEmail}
                  onChange={(e) => setRecoveryEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full p-3 border border-gray-300 rounded-lg bg-zinc-100"
                  required
                />
              </div>
              
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isRecoveryLoading}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  {isRecoveryLoading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;