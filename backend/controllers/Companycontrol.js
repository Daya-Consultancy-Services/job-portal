const { uploadCompanyLogoToCloudinary } = require("../config/cloudinary");
const Company = require("../models/company");
const Recruiter = require("../models/recruiter");
const Jobs = require("../models/jobs")
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { passwordUpdated } = require("../routes/passwordUpdate");


exports.companySignup = async (req,res) => {
    try {
        const{
            name,
            description,
            email,
            password,
            role,
            website,
            location,
            //logo,
            companyfield,
        }= req.body

        if(
            !name ||
            !description ||
            !email ||
            !password ||
            !role ||
            !website ||
            !location ||
            //!logo ||
            !companyfield
        ){
            return res.status(403).json({
                success:false,
                message:"All field are required to filled"
            });
        }

        const existCompany = await Company.findOne({email});
        if(existCompany){
            return res.status(400).json({
                success:false,
                message:"Company already Exist"
            });
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const company = await Company.create({
            name,
            description,
            email,
            password:hashedPassword,
            role,
            website,
            location,
            //logo,
            companyfield
        });

        return res.status(200).json({
            success:true,
            message:"Company register Successfully",
            company
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Error while registering Company, Try Again"
        })
    }
}

exports.loginCompany = async (req,res) => {
    try {
       const {email,password} = req.body

       if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"All field is required for login" 
            });
       }

       const company = await Company.findOne({email})

       if(!company){
            return res.status(401).json({
                success:false,
                message:"Company is not register, try register"
            })
        }

        if(await bcrypt.compare(password,company.password))
        {
            const token = jwt.sign(
                {
                    email:company.email,
                    id:company.id,
                    role:company.role
                },
                process.env.JWT_SECRET,
                {
                    expiresIn:"24h",
                }
            )
            company.token = token

            company.password = undefined

            const options = {
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000),  // Expires in 1 days
                httpOnly: true,                                           // Ensures the cookie is not accessible via JavaScript
            };
            return res.cookie("token",token,options).status(200).json({
                success:true,
                message:`Login successful. Welcome, ${company.name} !`,
                token,
                company
            })

        }
        else{
            return res.status(401).json({
                success:false,
                message:"Password is Incorrect",
            });
        }      
        

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Login Failed , Try again"
        })
    }
}

exports.updateCompanyDetail = async (req,res) => {
    try {
        const{
            name,
            description,
            email,
            website,
            location,
            //logo,
            companyfield
        } = req.body

        const compid = req.user.id

        if(!compid){
            return res.status(400).json({
                success:false,
                message:"Company not Found for updating detail"
            });
        }

        if( !name ||
            !description ||
            !email ||
            !website ||
            !location ||
            //!logo ||
            !companyfield
        )
        {
            return res.status(401).json({
                success:false,
                message:"All field required to update Details"
            });
        }

        const comp = await Company.findByIdAndUpdate(
            compid,
            {
                name:name,
                description:description,
                email:email,
                website:website,
                location:location,
                //logo:logo,
                companyfield:companyfield
            },
            {new:true}
        );

        await comp.save();

        return res.status(200).json({
            success:true,
            message:"Company details have been updated!!",
            comp
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Error while updating User data !!",
        })
    }
}

exports.deleteCompany = async (req,res) => {
    try {
        const compid = req.user.id

        const comp = await Company.findById(compid)

        if(!comp){
            return res.status(404).json({
                success:false,
                message:"Company Doesn't exist"
            });
        }
        if(!comp.recruiter){
            return res.status(401).json({
                success:false,
                message:"Company Recruiter can't be found"
            });
        }
        await Recruiter.findByIdAndDelete(comp.recruiter);

        await Company.findByIdAndDelete(compid);

        return res.status(200).json({
            success:true,
            message:"Company Deleted Successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error while Deleting Company Account"
        })
    }
}

exports.changeCompanyPassword = async (req, res) => {
    try {
        const companyDetails = await Company.findById(req.user.id);
        const { oldPassword, newPassword } = req.body;

        const isPasswordMatch = await bcrypt.compare(oldPassword, companyDetails.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ success: false, message: "The password is incorrect" });
        }

        const encryptedPassword = await bcrypt.hash(newPassword, 10);
        const updatedCompanyDetails = await Company.findByIdAndUpdate(
            req.user.id,
            { password: encryptedPassword },
            { new: true }
        );

        // Send confirmation email
        try {
            const emailResponse = await mailSender(
                updatedCompanyDetails.email,
                "Password for your account has been updated",
                passwordUpdated(
                    updatedUserDetails.email,
                    `Password updated successfully for ${updatedCompanyDetails.name}`
                )
                
            );
            console.log("Email sent successfully:", emailResponse.response);
        } catch (error) {
            console.error("Error occurred while sending email:", error);
            return res.status(500).json({
                success: false,
                message: "Error occurred while sending email",
                error: error.message,
            });
        }

        return res.status(200).json({ success: true, message: "Password updated successfully" });
    } catch (error) {
        console.error("Error updating password:", error);
        return res.status(500).json({ success: false, message: "Error updating password", error: error.message });
    }
};


exports.getAllDetailCompany = async (req,res) => {
    try {
        const id = req.user.id

        // const companyDetail = await Company.findById(id)
        //         .select("name email role website location logo companyfield recruiter")
        //         .populate({
        //             path: "recruiter",
        //             select: "name email contactNumber image role description job",
        //             populate:{
        //                 path:"job",
        //                 select: "jobTitle description skillRequired jobType salaryRange jobLocation", 
        //             },
        //         })
        //         .exec();

        // const companyDetail =  await Company.findById(id)
        //         .select("name email role website location logo companyfield recruiter")
        //         .populate({
        //             path:"recruiter",
        //             select:"name email contactNumber image role description job"
        //         })
        //         .exec();
        const companyDetail =  await Company.findById(id).populate("recruiter")
                .select("name email role website location logo companyfield recruiter description")
                .populate({
                    path:"recruiter",
                    select:"name email contactNumber image role description job"
                })
                .exec();

        return res.status(200).json({
            success:true,
            message:"Company Detail Fetched Successfully",
            data:companyDetail
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Error while Fetching Company Details"
        });
    }
}

exports.uploadCompanyLogo = async (req, res)=>{
    try {
        const compId = req.user.id
        const companyDetail = await Company.findById(compId);

        const file =  req.files?.logo || req.file
        if(!file){
            return res.status(400).json({
                success:false,
                message: "No file uploaded"
            });
        }

        const cloudinaryResponse = await uploadCompanyLogoToCloudinary(file);

        if(!cloudinaryResponse){
            return res.status(500).json({
                success:false,
                message: "Error while uploading file to cloudinary"
            });
        }

        if(!companyDetail){
            return res.status(404).json({
                success:false,
                message: "Company not found"
            });
        }

        companyDetail.logo = cloudinaryResponse.url;
        await companyDetail.save();

        return res.status(200).json({
            success: true,
            message: "Company Logo Uploaded Successfully",
            url: cloudinaryResponse.url
        });
    } catch (error) {
        console.error("logo upload error", error);
        return res.status(500).json({
            success: false,
            message: "Error while uploading logo"
        });
    }
} 

exports.createRecruiter = async (req,res) => {
    try {
        const companyId =  req.user.id
        const {
            name,
            email,
            password,
            contactNumber,
            //image,
            description,
            role
        } = req.body

        if(
            !name ||
            !email ||
            !password ||
            !contactNumber ||
            //!image ||
            !description ||
            !role
        )
        {
            return res.status(400).json({
                success:false,
                message:"All field are Required"
            });
        }
        //check if Recruiter is already exist by emailaddress
        const existRecruiter = await Recruiter.findOne({email});
        if(existRecruiter){
            return res.status(400).json({
                success:false,
                message:"Recruiter already Exist"
            })
        }

        const hashedPassword = await bcrypt.hash(password,10); // hassing password for recruiter
        const compId = await Company.findById(companyId);
        if (!compId) {
            return res.status(404).json({
                success: false,
                message: "Company not found"
            });
        }

        const recruiter = await Recruiter.create({
            name,
            email,
            password:hashedPassword,
            contactNumber,
            //image,
            companyId:compId._id,
            description,
            role:"recruiter"
        });

        compId.recruiter.push(recruiter.id)
        await compId.save();

        return res.status(200).json({
            success:true,
            message:"Recruiter Register Successfully",
            recruiter,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Recruiter can't register, Try again"
        });
    }
}

exports.updateRecruiterDetail = async (req,res) => {
    try {
        const {
            recruiterId,
            name,
            email,
            contactNumber,
            //image,
            description,
            
        } = req.body

        if(
            !recruiterId ||
            !name ||
            !email ||
            !contactNumber ||
            //!image ||
            !description
        )
        {
            return res.status(400).json({
                success:false,
                message:"All field are Required"
            });
        }

        const Id = req.user.id
        
        const compId = await Company.findById(Id);
        if (!compId) {
            return res.status(404).json({
                success: false,
                message: "Company not found",
            });
        }

        const updateRecruiterDetail = {
            name,
            email,
            contactNumber,
            //image,
            description,
        };
        
        const recruiterDetail = await Recruiter.findByIdAndUpdate(recruiterId,updateRecruiterDetail,{new:true})

        await recruiterDetail.save();

        return res.status(200).json({
            success:true,
            message:"Updated Recruiter Successfully !!",
            recruiterDetail
        })
        
    } catch (error) {
        console.log(error)
            return res.status(500).json({
                success:false,
                message:"Error while updating recruiterDetail"
            })
    }
}

exports.deleteRecruiter = async (req,res) => {
    try {
        const {recruiterId} = req.body;
        if(!recruiterId){
            return res.status(403).json({
                success:false,
                message:"recruiterId is required for delete"
            });
        }
        const compid = req.user.id

        const comp = await Company.findById(compid)

        if(!comp){
            return res.status(404).json({
                success:false,
                message:"Company Doesn't exist"
            });
        }
        if(!comp.recruiter){
            return res.status(401).json({
                success:false,
                message:"Company Recruiter can't be found"
            });
        }
        comp.recruiter = comp.recruiter.filter(
            (id) => id.toString() !== recruiterId
        )

        await comp.save();
        await Recruiter.findByIdAndDelete(recruiterId);

        return res.status(200).json({
            success:true,
            message:"Recruiter Deleted Successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error while Deleting Recruiter Account"
        })
    }
}

exports.getAlldetailRecruiter = async (req, res) => {
    try {
        const compId = req.user.id

        const recruiterDetail = await Company.findById(compId).populate("recruiter").exec();

        if(!recruiterDetail){
            return res.status(400).json({
                success:false,
                message:"NO Recruiter found, Try again later"
            })
        }

        return res.status(200).json({
            success:true,
            message:"All recruiter Detail",
            data: recruiterDetail.recruiter,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Error while getting Recruiter Details"
        })
    }
}

exports.logoutCompany = async (req, res) => {
    try {
        // Clear the authentication token by setting an expired cookie
        return res
            .cookie("token", "", {
                expires: new Date(0),  // Expire the cookie immediately
                httpOnly: true,
            })
            .status(200)
            .json({
                success: true,
                message: "Logout successful",
            });
    } catch (error) {
        console.error("Logout Error:", error);
        return res.status(500).json({
            success: false,
            message: "Logout failed, please try again",
        });
    }
};


exports.getAllJobsForCompany = async (req, res) => {
    try {
        const companyId = req.user.id; // Assuming company is logged in

        // Find the company and get its recruiter IDs
        const company = await Company.findById(companyId).populate("recruiter");
        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company not found",
            });
        }

        const recruiterIds = company.recruiter.map(recruiter => recruiter._id);

        // Find all jobs created by those recruiters
        const jobs = await Jobs.find({ recruiterId: { $in: recruiterIds } })
            .populate("recruiterId", "name email description") // Populate recruiter info
            .exec();

        if (jobs.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No jobs found for this company.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "All jobs fetched successfully",
            data: jobs
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error while fetching jobs for company"
        });
    }
};

exports.assignTokensToRecruiter = async (req, res) => {
    try {
        const { recruiterId, jobToken, userDetailAccessCount } = req.body;
        const companyId = req.user.id; // Assuming company is authenticated

        const recruiter = await Recruiter.findById(recruiterId);
        const company = await Company.findById(companyId);
     

        if (!recruiter || !company) {
            return res.status(404).json({ success: false, message: "Recruiter or Company not found" });
        }

        if (company.jobToken < jobToken || company.userDetailAccessCount < userDetailAccessCount) {
            return res.status(400).json({ success: false, message: "Insufficient company tokens" });
        }

        //decuted from the company jobtoken and userDetailAccesstoken
        company.jobToken -= jobToken;
        company.userDetailAccessCount -= userDetailAccessCount;

        // add into recruiter the value of token after dedcution from company
        recruiter.jobToken = jobToken;
        recruiter.userDetailAccessCount = userDetailAccessCount;

        await company.save();
        await recruiter.save();

        return res.status(200).json({
            success: true,
            message: "Tokens assigned to recruiter successfully",
            recruiter
        });
    } catch (error) {
        console.error("Error assigning tokens:", error);
        return res.status(500).json({ success: false, message: "Error assigning tokens to recruiter" });
    }
};
