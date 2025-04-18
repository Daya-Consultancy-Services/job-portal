const User = require("../models/User")
const Profile = require("../models/Profile")
const personalDetail = require("../models/ExtraProfile/personalDetail");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Job = require("../models/jobs");
const Company = require("../models/company"); 

const {passwordUpdated} = require("../routes/passwordUpdate")
const mailSender = require("../routes/mailSender")

exports.signup = async (req,res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            workstatus,
            role
        } = req.body

    // validate if those field is filled or not
    if(
        !firstName ||
        !lastName ||
        !email ||
        !password ||
        !workstatus ||
        !role
    )
        {
            return res.status(403).json({
                success:false,
                message:"All field are required too be filled"
            });
        }
    

    // check if user is exist with the help of email form body and calling the database to verify
    const existUser = await User.findOne({email});
    if(existUser){
        return res.status(400).json({
            success:false,
            message:"User already Exist"
        })
    }

    const hashedPassword = await bcrypt.hash(password,10);  //hashing the password 

    // some profile Detail are save and can be edited in profile controler
    const profileDetail = await Profile.create({
        about:null,
        contactNumber:null,
        location:null,
        image:null
    });

    //Create a database entry for the user 
    const user = await User.create({
        firstName,
        lastName,
        email,
        role,
        password:hashedPassword,
        workstatus,
        profile:profileDetail._id
    });
    
    return res.status(200).json({
        success:true,
        message:"User Register Successfully",
        user,
    })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User can't register, Try again"
        });
    }
}

exports.login = async (req,res) => {
    try {
        const {email,password} = req.body  // email and password from the request body

        // check weather email and password is entered or not
        if(!email || !password){
           return res.status(400).json({
                success:false,
                message:"All field are required for login"
            })
        }

        // check weather user exist of not 
        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not register, try register"
            })
        }

        //matching password
        if(await bcrypt.compare(password,user.password)){
            //creating JWT Token
            const token = jwt.sign(
                {
                    email:user.email,
                    id:user.id,
                    role:user.role
                },
                process.env.JWT_SECRET,
                {
                    expiresIn:"24h",
                }
            );
            user.token = token
            // removing password from the user object before response
            user.password = undefined;

            //create cookie
            const options = {
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000),  // Expires in 1 days
                httpOnly: true,                                           // Ensures the cookie is not accessible via JavaScript
            };

            // sending the response with token and user data
            return res.cookie("token",token,options).status(200).json({
                success:true,
                message:`Login successful. Welcome, ${user.firstName} ${user.lastName} !`,
                token,
                user
            })

        }
        else{
            return res.status(401).json({
                success:false,
                message:"Password is Incorrect",
            });
        }      
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Login Failed , Try again"
        })
        
    }
} 


exports.updateDetail = async(req,res) => {
    
    try {
        const {
            firstName,
            lastName,
            email,
        } = req.body

        // get the user Id from the request body
        const userID = req.user.id
        
        if (!userID) {
            return res.status(400).json({
                success: false,
                message: "User is required",
            });
        }
        

        if(!firstName || !lastName || !email  )   // || !password
        {
            return res.status(400).json({
                success:false,
                message:"All field are Required"
            });
        }

        const userDetail = await User.findByIdAndUpdate(
            userID,
            { 
                firstName: firstName,
                lastName : lastName,
                email : email
             
                // workstatus:workstatus
            },
            { new: true }
        )
        return res.status(200).json({
             success: true,
             message: "User details updated successfully!",
             userDetail
        });   
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Error while updating User data !!",
        })
        
    }
};

exports.deleteUser = async(req,res) => {
    try {
        // find the Id the user
        const userid = req.user.id

        //valid if the user exist or not
        const user = await User.findById(userid)
        const profile =  await Profile.findById(user.profile)
        
        if(!user){   // check is user is there to delete
            return res.status(404).json({
                success:false,
                message:"User Doesn't exit"
            });
        }

        // check if the user profile is there or not and if its null it will show it
        if (!profile) {
            return res.status(401).json({
                success:false,
                message:"User Profile can't be found"
            });
        }
        await personalDetail.findByIdAndDelete(profile.personalDetails)
        // from the refrence of user schema the profile will be also deleted from the data base
        await Profile.findByIdAndDelete(user.profile);
       
        
        // now delete the user
        await User.findByIdAndDelete(userid);


        return res.status(200).json({
            success:true,
            message:"User Deleted Successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error while Deleting User Account"
        })
    }
}

exports.getalldetail = async(req,res) => {
    try {
        const id = req.user.id

        const userDetail = await User.findById(id).populate();
        if(!userDetail){
            return res.status(400).json({
                success:false,
                message:"User Details cannot be found"
            });
        }

        return res.status(200).json({
            success:true,
            message:"All the user details",
            userDetail
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error while getting User detail"
        })
    }
}

exports.getJobs = async (req, res) => {
    try {
        const jobs = await Job.find()
            .select("jobTitle description skillRequired jobType salaryRange jobLocation") // Select only these fields
            .populate("companyId","name location email website description logo companyfield") // Populate only the name of the company if needed
            .exec();

        return res.status(200).json({
            success: true,
            message: "Jobs fetched successfully",
            data: jobs
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error while fetching jobs"
        });
    }
};
exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find()
            .select("jobTitle description skillRequired jobType salaryRange jobLocation") // Select only these fields
            .populate("companyId","name location email website description logo companyfield") // Populate only the name of the company if needed
            .exec();

        return res.status(200).json({
            success: true,
            message: "Jobs fetched successfully",
            data: jobs
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error while fetching jobs"
        });
    }
};

// exports.searchJobs = async (req, res) => {
//     try {
//         const { query } = req.query;
//         console.log("in backend search query");
        
//         if (!query) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Search query is required"
//             });
//         }
//         const searchPattern = new RegExp(query, 'i');
//         const companies = await Company.find({
//             $or: [
//                 { name: searchPattern },
//                 { companyfield: searchPattern }
//             ]
//         }).select("_id name location logo companyfield description");
        
//         const companyIds = companies.map(company => company._id);
        
//         const jobs = await Job.find({
//             $or: [
//                 { jobTitle: searchPattern },
//                 { description: searchPattern },
//                 { skillRequired: { $in: [searchPattern] } },
//                 { companyId: { $in: companyIds } }
//             ]
//         })
//         .select("jobTitle description skillRequired jobType salaryRange jobLocation companyId")
//         .populate("companyId", "name location email website description logo companyfield")
//         .exec();
        
//         return res.status(200).json({
//             success: true,
//             message: "Search results fetched successfully",
//             data: {
//                 companies: companies,
//                 jobs: jobs
//             }
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             success: false,
//             message: "Error while searching",
//             error: error.message
//         });
//     }
// };

exports.searchJobs = async (req, res) => {
    try {
        const { query } = req.query;
        console.log("in backend search query");
        
        if (!query) {
            return res.status(400).json({
                success: false,
                message: "Search query is required"
            });
        }

        const searchPattern = new RegExp(query, 'i');
        
        // First find companies matching the search query
        const companies = await Company.find({
            name: searchPattern
        }).select("_id");
        
        const companyIds = companies.map(company => company._id);
        
        // Then find jobs either by skill or by company ID
        const jobs = await Job.find({
            $or: [
                { skillRequired: { $regex: searchPattern } },
                { companyId: { $in: companyIds } }
            ]
        })
        .select("jobTitle description skillRequired jobType salaryRange jobLocation")
        .populate("companyId", "name location logo")
        .exec();
        
        return res.status(200).json({
            success: true,
            message: "Job results fetched successfully",
            data: jobs
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error while searching for jobs",
            error: error.message
        });
    }
};
exports.getJobDetails = async (req, res) => {
    try {
        const { jobId } = req.params;
        
        if (!jobId) {
            return res.status(400).json({
                success: false,
                message: "Job ID is required"
            });
        }

        const job = await Job.findById(jobId)
            .populate("companyId", "name location email website description logo companyfield")
            .exec();

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Job details fetched successfully",
            data: job
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error while fetching job details",
            error: error.message
        });
    }
};

exports.applyJobs = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user ID is available from auth middleware
        const { jobId } = req.body; // Get job ID from request body

        // Check if the job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found",
            });
        }

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Check if the user has already applied for this job
        if (user.appliedJobs.includes(jobId)) {
            return res.status(400).json({
                success: false,
                message: "You have already applied for this job",
            });
        }

        // Add jobId to user's appliedJobs array
        user.appliedJobs.push( jobId);
        await user.save();

        // Add userId to job's appliedUsers array
        job.appliedUsers.push(userId);
        await job.save();

        return res.status(200).json({
            success: true,
            message: `Your job application for ${job.jobTitle} position has been submitted successfully!`,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error while applying for the job",
        });
    }
};


exports.getAppliedJobs = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user ID is retrieved from authentication middleware

        // Find user and populate appliedJobs
        const user = await User.findById(userId)
            .populate({
                path: "appliedJobs",
                select: "jobTitle description skillRequired jobType jobLocation salaryRange isClose companyId", // Select only required fields
                populate: {
                    path:"companyId",
                    select : "name",
                }
            })
            .exec();

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Applied jobs fetched successfully",
            data: user.appliedJobs,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error while fetching applied jobs",
        });
    }
};

// Controller for Changing Password
exports.changePassword = async (req, res) => {
    try {
      // Get user data from req.user
      const userDetails = await User.findById(req.user.id)
  
      // Get old password, new password, and confirm new password from req.body
      const { oldPassword, newPassword } = req.body
  
      // Validate old password
      const isPasswordMatch = await bcrypt.compare(
        oldPassword,
        userDetails.password
      )
      if (!isPasswordMatch) {
        // If old password does not match, return a 401 (Unauthorized) error
        return res
          .status(401)
          .json({ success: false, message: "The password is incorrect" })
      }
  
      // Update password
      const encryptedPassword = await bcrypt.hash(newPassword, 10)
      const updatedUserDetails = await User.findByIdAndUpdate(
        req.user.id,
        { password: encryptedPassword },
        { new: true }
      )
  
      // Send notification email
      try {
        const emailResponse = await mailSender(
          updatedUserDetails.email,
          "Password for your account has been updated",
          passwordUpdated(
            updatedUserDetails.email,
            `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
          )
        )
        console.log("Email sent successfully:", emailResponse.response)
      } catch (error) {
        // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
        console.error("Error occurred while sending email:", error)
        return res.status(500).json({
          success: false,
          message: "Error occurred while sending email",
          error: error.message,
        })
      }
  
      // Return success response
      return res
        .status(200)
        .json({ success: true, message: "Password updated successfully" })
    } catch (error) {
      // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
      console.error("Error occurred while updating password:", error)
      return res.status(500).json({
        success: false,
        message: "Error occurred while updating password",
        error: error.message,
      })
    }
}
  