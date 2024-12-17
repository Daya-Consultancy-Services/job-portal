import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../Header';
function Login() {
  return (
    <>
    <Header/>
    <div
      className={`h-[100vh] w-full shadow-lg z-[10000] 
     flex items-center justify-center }`}
    >
      <div className="login-sec w-[60%] h-[70%] flex relative items-center">
        <div className=" relative register-sec p-10 w-[50%] h-[95%] bg-white  shadow-xl shadow-[#D2E3F1] rounded-xl">
          <h1 className='font-semibold text-2xl'>New to OneCareer ?</h1>
          <div className="desc mt-7 flex flex-col gap-3">
            <p>One click apply using naukri profile</p>
            <p>Get relevant job recomendations</p>
            <p>Showcase profile to top companies and consultants</p>
            <p>Know application status on applied jobs</p>
          </div>
          <Link  to={"/components/auth/User/register"}>
          <button className='mt-8 border border-blue-400 px-4 py-3'>Register for Free</button>
          </Link>

          <div className="absolute right-7 bottom-3 vector-img h-[250px] w-[250px] ">
            <img src={require("../../../assets/register.jpg")} alt="vector-img" />
          </div>
          
        </div>
        <div className="bg-white p-10 login-sec w-[50%] h-full  absolute right-3 shadow-xl shadow-[#D2E3F1] rounded-xl flex flex-col">
          <h1 className='font-semibold text-2xl'>Login</h1>
          <form action="" className='relative flex flex-col  h-[70%] mt-6'>
            <div className="flex flex-col w-full" >
            <label htmlFor="email" className='text-xl '>Email ID</label>
            <input type="email" id="email" name="email" required placeholder='Enter your email id' className='p-4 rounded-lg mt-3 bg-zinc-100'/>
            </div>
            <div className="flex mt-5 flex-col w-full">
              <label htmlFor="password" className='text-xl '>Password</label>
              <input type="password" id="password" name="password" required placeholder='Enter your password' className='p-4 rounded-lg mt-3 bg-zinc-100'/>
              <div className="forgot mt-2 w-full flex items-center justify-end">
                <Link to="login/forgotpassword">
                <p className='text-blue-500 hover:text-blue-600'>Forgot Password ?</p>
                </Link>
              </div>
            </div>

            <button className=' absolute w-full h-[50px] flex items-center justify-center bg-blue-500 text-white mt-7 bottom-1 rounded-lg'>Login</button>


            
           
          </form>
        </div>
      </div>
    </div>
    </>
  );
}

export default Login;
