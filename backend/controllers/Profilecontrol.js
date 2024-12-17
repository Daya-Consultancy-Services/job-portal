const User = require("../models/User")
const Profile = require("../models/Profile")
require("dotenv").config();



exports.updateProfile = async (req,res) => {
        try {
            const {
                gender,
                dateOfBirth,
                about,
                address,
                contactNumber,
                education,
                workstatus,
                empType,
                skills,
                coverletter
                // image 
                // links
                // certificate left
            } = req.body

            if(!gender || 
                !dateOfBirth ||
                !about || 
                !address || 
                !contactNumber || 
                !education || 
                !workstatus || 
                !empType || 
                !skills || 
                !coverletter
            )
                {
                    return res.status(400).json({
                        success:false,
                        message:"All field are Required"
                    });
                }
            
            const Id = req.user.id

            const userDetail = await User.findById(Id);
            const profileDetail = await Profile.findByIdAndUpdate(userDetail.profile)
            

            profileDetail.gender = gender
            profileDetail.dateOfBirth = dateOfBirth
            profileDetail.about = about
            profileDetail.address = address
            profileDetail.contactNumber = contactNumber
            profileDetail.education = education
            profileDetail.workstatus = workstatus
            profileDetail.empType = empType
            profileDetail.skills = skills
            profileDetail.coverletter = coverletter

            await profileDetail.save();

            return res.status(200).json({
                success:true,
                message:"Updated Profile Successfully !!",
                profileDetail
            })

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success:false,
                message:"Error while updating ProfileDetails"
            })
            
        }
}

exports.getAllDetail = async (req,res) => {
    try {

        const id = req.user.id

        const userDetail = await User.findById(id).populate("profile").exec();

        return res.status(200).json({
            success:true,
            message:"User Detail Fetched Successfully",
            userDetail : userDetail.profile
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Error while Fetching User Details"
        });
    }
}