import React from 'react'
import Header from '../../Header'

function CompanySignUp() {
    return (
        <>
            <Header />
            <div className='relative min-h-[100vh] w-full flex items-center justify-center '>
                <div className="banner h-[100vh] w-full  flex items-center ">
                    <div className="punchline w-[65%] h-full  p-6 flex items-center ">
                        <h1 className='text-9xl tracking-tight'>Great companies start with great people.
                            <p className='text-3xl mt-7 pl-2 tracking-normal'><span className='text-blue-400 cursor-pointer'>Register</span>  and find yours today!</p></h1>
                    </div>
                    <div className="absolute right-0  image w-[70%] h-full z-[-1]">
                        <img className='h-full w-full absolute opacity-30' src={require("../../../assets/vector-register-2.png")} alt="" />

                    </div>
                </div>
            </div>

            <div className=" registration-form h-[100vh] w-full flex justify-center items-center ">
                <div className="bg relative h-[85%] w-[90%] bg-white p-5 rounded-md  shadow-lg shadow-zinc-400"><h1 className='text-6xl font-semibold'>Register to skyrocket your growth</h1>
                <div className="absolute bottom-0 right-0 image z-3 opacity-50">
                        <img src={require("../../../assets/vector-register-1.png")} alt="" />
                    </div>
                    <form action="" className='absolute h-[85%] w-[95%] z-5 p-5 grid grid-cols-2'>
                    <div className="left-form  flex flex-col">
                    <div className="form-group flex flex-col  mt-4">
                            <label htmlFor="companyName">Company Name</label>
                            <input type="text" id="companyName" name="companyName" required className='w-[80%] p-3 rounded-lg bg-zinc-100 mt-2' placeholder='Enter your company name' />
                        </div>
                        <div className="form-group flex flex-col mt-4">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" required className='w-[80%] p-3 rounded-lg bg-zinc-100 mt-2' placeholder='Enter email id' />
                        </div>
                        <div className="form-group flex flex-col mt-4">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" required className='w-[80%] p-3 rounded-lg bg-zinc-100 mt-2' placeholder='enter your password ' />
                        </div>
                        <div className="form-group flex flex-col mt-4">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input type="password" id="confirmPassword" name="confirmPassword" required className='w-[80%] p-3 rounded-lg bg-zinc-100 mt-2' placeholder='confirm your password' />
                        </div>
                        <div className="form-group flex flex-col mt-4">
                            <label htmlFor="description">Description</label>
                            <textarea rows="5"  type="text" id="confirmPassword" name="description" required className='w-[80%] p-3 rounded-lg resize-none bg-zinc-100 mt-2' placeholder='enter your description'/>
                        </div>
                    </div>

                    <div className="right-form">
                        
                    <div className="form-group flex flex-col mt-4">
                            <label htmlFor="confirmPassword">Website</label>
                            <input type="password" id="confirmPassword" name="confirmPassword" required className='w-[80%] p-3 rounded-lg bg-zinc-100 mt-2' />
                        </div>
                        <div className="form-group flex flex-col mt-4">
                            <label htmlFor="confirmPassword">Location</label>
                            <input type="password" id="confirmPassword" name="confirmPassword" required className='w-[80%] p-3 rounded-lg bg-zinc-100 mt-2' />
                        </div>
                        <div className="form-group flex flex-col mt-4">
                            <label htmlFor="confirmPassword">Logo</label>
                            <input type="password" id="confirmPassword" name="confirmPassword" required className='w-[80%] p-3 rounded-lg bg-zinc-100 mt-2' />
                        </div>
                        <div className="form-group flex flex-col mt-4">
                            <label htmlFor="confirmPassword">Recruiter</label>
                            <input type="password" id="confirmPassword" name="confirmPassword" required className='w-[80%] p-3 rounded-lg bg-zinc-100 mt-2' />
                        </div>
                    </div>

                       
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary bg-blue-500 text-white px-5 py-3 rounded-md min-w-[160px] mt-6">Register</button>
                        </div>
                    </form>
                    
                    </div>

            </div>
        </>
    )
}

export default CompanySignUp
