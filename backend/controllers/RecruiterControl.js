const Company = require("../models/company");
const Recruiter = require("../models/recruiter");
require("dotenv").config();
const bcrypt = require("bcrypt");

exports.updateRecruiterDetail = async (req,res) => {
    try {
        const {
            name,
            email,
            password,
            contactNumber,
            image,
            description,
            
        } = req.body

        if(
            !name ||
            !email ||
            !password ||
            !contactNumber ||
            !image ||
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

        const recruiterId  = compId.recruiter._id
        if (!recruiterId) {
            return res.status(404).json({
                success: false,
                message: "recruiter not found",
            });
        }

       
       
        const hashedPassword = await bcrypt.hash(password,10);
        const updateRecruiterDetail = {
            name,
            email,
            password:hashedPassword,
            contactNumber,
            image,
            description,
            companyId:compId._id
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

exports.getAlldetail = async (req, res) => {
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
