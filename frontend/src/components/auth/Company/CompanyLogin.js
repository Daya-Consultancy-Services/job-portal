// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import Header from '../../Header'
// import { useDispatch } from 'react-redux';
// import { loginCompany } from '../../../operations/companyAPI';

// function CompanyLogin() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [errors, setErrors] = useState({});
//   const [loginForm, setLoginForm] = useState({
//     email: '',
//     password: '',
//   });
//   const { email, password } = loginForm;

//   // Validate the form
//   const validateForm = () => {
//     const newErrors = {};
//     if (!email) newErrors.email = 'Email is required';
//     if (!password) newErrors.password = 'Password is required';
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Handle form field changes
//   const handleChange = (e) => {
//     setLoginForm((prevData) => ({
//       ...prevData,
//        [e.target.name]: e.target.value,
 
//     }));
//   };

//   // Handle form submit
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!validateForm()) {
//       alert("invalid email or password");
//       return;
//     }

//     try {
//       const response =  dispatch(loginCompany(email, password, navigate));

//       console.log("response login", response);

//       if (response && response.token) {
//         localStorage.setItem("token", response.token);
//         console.log("company token",response.token);

//         navigate("/dashboard");
//       }

//     } catch (error) {
//       console.error("login error", error);
//       alert("something went wrong. Please try again");
//     }

//     setLoginForm({
//       email: '',
//       password: '',
//     })
//   };
//   const isFormValid = loginForm.email.trim() !== '' && loginForm.password.trim().length >=6;
//   return (
//     <>
//       <div className="h-[100vh] w-full  bg-zinc-200 flex">
//         <Header/>
//         <div className="left-div  h-full w-[60%]  flex justify-center items-center ">
//         <div className="login-form bg-white rounded-lg flex flex-col w-[60%] h-[70%] items-center p-10">
//             <h1 className='text-6xl font-semibold text-blue-600'>Log in to Account</h1>
//             <form onSubmit={handleSubmit} className='relative mt-12  h-[90%] w-[85%] '>
//                 <div className="email flex flex-col mt-6">
//                     <label htmlFor="email" className='text-xl'>email</label>
//                     <input type="email" onChange={handleChange} value={email} id='email' name='email' required placeholder="Enter email id" className='p-4 mt-2 rounded-lg bg-zinc-100'/>
//                 </div>
//                 <div className="password flex flex-col mt-6">
//                     <label htmlFor="password" className='text-xl'>password</label>
//                     <input type="password" onChange={handleChange} value={password} name='password' placeholder="Enter password" className='p-4 mt-2 rounded-lg bg-zinc-100' />
//                 </div>
//               <button disabled={!isFormValid} className='absolute bottom-7 w-full h-[70px] rounded-lg bg-blue-400 text-xl font-semibold text-white hover:bg-blue-500' type="submit">Login</button>
//             </form>
//             <p>Don't have an account?  
//                 <Link to="/components/auth/Company/register">
//                 <span className='text-blue-500 text-lg'> Sign up</span>
//                 </Link>
//                 </p>
//         </div>
//         </div>
//         <div className="relative right-div h-full w-[40%]  bg-blue-500 flex items-center justify-center flex-col">
//         <div className="h-[50%] w-[70%]  flex items-center p-3 flex-col justi">
//             <h1 className='text-6xl font-semibold text-white'>Welcome Back, Sir</h1>
//             <p className='mt-10 text-2xl text-white'>Fill up personal Information and start journey with us.</p>
//         </div>
//         <div className="image h-[500px] w-[700px] absolute bottom-0 opacity-45">
//             <img className='h-full w-full' src={require('../../../assets/vector-register-3.png')} alt="" />
//         </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default CompanyLogin
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../../Header'
import { useDispatch } from 'react-redux';
import { getPasswordResetToken, loginCompany } from '../../../operations/companyAPI';
import toast from 'react-hot-toast';

function CompanyLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });
  const { email, password } = loginForm;
  let userType = localStorage.getItem("userType");
  if(userType === "Company"){
    userType = "company";
  };

  // Validate the form
  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form field changes
  const handleChange = (e) => {
    setLoginForm((prevData) => ({
      ...prevData,
       [e.target.name]: e.target.value,
    }));
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert("invalid email or password");
      return;
    }

    try {
      const response = dispatch(loginCompany(email, password, navigate));

      console.log("response login", response);

      if (response && response.token) {
        localStorage.setItem("token", response.token);
        console.log("company token",response.token);

        navigate("/dashboard");
      }

    } catch (error) {
      console.error("login error", error);
      alert("something went wrong. Please try again");
    }

    setLoginForm({
      email: '',
      password: '',
    })
  };

  // Handle forgot password
  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!forgotEmail) {
      alert("Please enter your email address");
      return;
    }
    console.log(forgotEmail,userType, setEmailSent);

if(dispatch(getPasswordResetToken(forgotEmail,userType, setEmailSent))){
    // Reset form after 3 seconds and go back to login
    setTimeout(() => {
    toast.success("Password reset link sent to your email");
      setShowForgotPassword(false);
    }, 1500);
}
    
   
    

  };

  const isFormValid = loginForm.email.trim() !== '' && loginForm.password.trim().length >= 6;
  
  return (
    <>
      <div className="h-[100vh] w-full bg-zinc-200 flex">
        <Header/>
        <div className="left-div h-full w-[60%] flex justify-center items-center">
          <div className="login-form bg-white rounded-lg flex flex-col w-[60%] h-[70%] items-center p-10">
            {!showForgotPassword ? (
              // Regular Login Form
              <>
                <h1 className='text-6xl font-semibold text-blue-600'>Log in to Account</h1>
                <form onSubmit={handleSubmit} className='relative mt-12 h-[90%] w-[85%]'>
                  <div className="email flex flex-col mt-6">
                    <label htmlFor="email" className='text-xl'>email</label>
                    <input 
                      type="email" 
                      onChange={handleChange} 
                      value={email} 
                      id='email' 
                      name='email' 
                      required 
                      placeholder="Enter email id" 
                      className='p-4 mt-2 rounded-lg bg-zinc-100'
                    />
                  </div>
                  <div className="password flex flex-col mt-6">
                    <label htmlFor="password" className='text-xl'>password</label>
                    <input 
                      type="password" 
                      onChange={handleChange} 
                      value={password} 
                      name='password' 
                      placeholder="Enter password" 
                      className='p-4 mt-2 rounded-lg bg-zinc-100' 
                    />
                  </div>
                  <div className="text-right mt-2">
                    <button 
                      type="button"
                      onClick={() => setShowForgotPassword(true)}
                      className="text-blue-500 hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <button 
                    disabled={!isFormValid} 
                    className='absolute bottom-7 w-full h-[70px] rounded-lg bg-blue-400 text-xl font-semibold text-white hover:bg-blue-500' 
                    type="submit"
                  >
                    Login
                  </button>
                </form>
                <p>Don't have an account?  
                  <Link to="/components/auth/Company/register">
                    <span className='text-blue-500 text-lg'> Sign up</span>
                  </Link>
                </p>
              </>
            ) : (
              // Forgot Password Form
              <>
                <h1 className='text-4xl font-semibold text-blue-600'>Reset Password</h1>
                {emailSent ? (
                  <div className="mt-10 text-center">
                    <p className="text-green-600 text-xl">Password reset link sent to your email!</p>
                    <p className="mt-4">Check your inbox for further instructions.</p>
                  </div>
                ) : (
                  <form onSubmit={handleForgotPassword} className='relative mt-8 h-[90%] w-[85%]'>
                    <p className="text-gray-600 mb-6">
                      Enter your email address and we'll send you a link to reset your password.
                    </p>
                    <div className="email flex flex-col mt-6">
                      <label htmlFor="forgotEmail" className='text-xl'>Email</label>
                      <input 
                        type="email" 
                        onChange={(e) => setForgotEmail(e.target.value)} 
                        value={forgotEmail} 
                        id='forgotEmail' 
                        required 
                        placeholder="Enter your email address" 
                        className='p-4 mt-2 rounded-lg bg-zinc-100'
                      />
                    </div>
                    <div className="flex space-x-4 mt-10">
                      <button 
                        type="button"
                        onClick={() => setShowForgotPassword(false)}
                        className='w-1/2 h-[50px] rounded-lg bg-gray-300 text-xl font-semibold text-gray-700 hover:bg-gray-400'
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit"
                        className='w-1/2 h-[50px] rounded-lg bg-blue-400 text-xl font-semibold text-white hover:bg-blue-500'
                      >
                        Reset Password
                      </button>
                    </div>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
        <div className="relative right-div h-full w-[40%] bg-blue-500 flex items-center justify-center flex-col">
          <div className="h-[50%] w-[70%] flex items-center p-3 flex-col justi">
            <h1 className='text-6xl font-semibold text-white'>Welcome Back, Sir</h1>
            <p className='mt-10 text-2xl text-white'>Fill up personal Information and start journey with us.</p>
          </div>
          <div className="image h-[500px] w-[700px] absolute bottom-0 opacity-45">
            <img className='h-full w-full' src={require('../../../assets/vector-register-3.png')} alt="" />
          </div>
        </div>
      </div>
    </>
  )
}

export default CompanyLogin