const User = require("../models/User")
const Profile = require("../models/Profile")
const employmentProfile = require("../models/ExtraProfile/employmentProfile");
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
                empType,
                skills,
                resume,
                resumeHeadline,
                profileSummary,
                location,
                image 
                // links
                // certificate left
            } = req.body

            if(!gender || 
                !dateOfBirth ||
                !about || 
                !address || 
                !contactNumber || 
                !education || 
                !empType || 
                !skills || 
                !resume ||
                !resumeHeadline ||
                !profileSummary ||
                !location || 
                !image
            )
                {
                    return res.status(400).json({
                        success:false,
                        message:"All field are Required"
                    });
                }
            
            const Id = req.user.id
            
            const empProfile = await employmentProfile.create({
                isCurrentEmp : null,
                totalExp : null,
                currentJobTitle : null,
                noticePeriod : null,
            })

            const userDetail = await User.findById(Id);
            const profileDetail = await Profile.findByIdAndUpdate(userDetail.profile)
            

            profileDetail.gender = gender
            profileDetail.dateOfBirth = dateOfBirth
            profileDetail.about = about
            profileDetail.address = address
            profileDetail.contactNumber = contactNumber
            profileDetail.education = education
            profileDetail.empType = empType
            profileDetail.skills = skills
            profileDetail.resume = resume
            profileDetail.resumeHeadline = resumeHeadline
            profileDetail.profileSummary = profileSummary
            profileDetail.location = location
            profileDetail.image = image

            await profileDetail.save();

            return res.status(200).json({
                success:true,
                message:"Updated Profile Successfully !!",
                profileDetail,
                profileDetail:empProfile
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