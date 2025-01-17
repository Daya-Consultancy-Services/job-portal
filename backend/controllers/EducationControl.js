const User = require("../models/User")
const Profile = require("../models/Profile")
const educationProfile = require("../models/ExtraProfile/educationProfile");
require("dotenv").config();

exports.createEducationProfile = async (req , res) => {
    try {
        const {

            educationName,
            institutionName,
            courseName,
            courseType,
            duration,
            marks,
            location,
            education

        } = req.body
        if(
            !educationName ||
            !institutionName ||
            !courseName ||
            !courseType ||
            !duration   ||
            !marks      ||
            !location   ||
            !education
        )
            {
                return res.status(403).json({
                    success:false,
                    message:"All field are required too be filled"
                });
            }
        const Id = req.user.id

        const user = await User.findById(Id)

        const profile = await Profile.findById(user.profile)
        
        if(!profile){
            return res.status(400).json({
                success:false,
                message:"Profile don't Exist"
            })
        }
        const educationProfiles = await educationProfile.create({
            educationName,
            institutionName,
            courseName,
            courseType,
            duration,
            marks,
            location,
            education
        })

        profile.educationProfile.push(educationProfiles.id)
        await profile.save();

        return res.status(200).json({
            success:true,
            message:"EducationProfiles Created Successfully",
            educationProfiles,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"EducationProfiles can't register, Try again"
        });
    }
}

exports.updateEducationProfile =  async (req , res) => {
    try {
        const {
            educationProfileId,
            educationName,
            institutionName,
            courseName,
            courseType,
            duration,
            marks,
            location,
            education

        } = req.body
        if(
            !educationProfileId ||
            !educationName ||
            !institutionName ||
            !courseName ||
            !courseType ||
            !duration   ||
            !marks      ||
            !location   ||
            !education
        )
            {
                return res.status(403).json({
                    success:false,
                    message:"All field are required too be filled"
                });
            }
        const Id = req.user.id

        const user = await User.findById(Id)

        const profile = await Profile.findById(user.profile)
        
        if(!profile){
            return res.status(400).json({
                success:false,
                message:"Profile don't Exist"
            })
        }
        const educationProfiles = await educationProfile.findByIdAndUpdate(
            educationProfileId,
            {
                educationName    : educationName,
                institutionName  : institutionName,
                courseName       : courseName,
                courseType       : courseType,
                duration         : duration,
                marks            : marks,
                location         : location,
                education        : education,
            },
            {new:true}
        )

        await educationProfiles.save();
        return res.status(200).json({
            success:true,
            message:"EducationProfiles Updated Successfully !!",
            educationProfiles,
        })

    } catch (error) {
        console.log(error)
            return res.status(500).json({
                success:false,
                message:"Error while updating EducationProfiles"
        })
    }
}

exports.deleteEducationProfile =  async (req , res) => {
    try {
        const {educationProfileId} = req.body
        if(!educationProfileId){
            return res.status(403).json({
                success:false,
                message:"EducationProfile Id is required for delete"
            });
        }
        const Id = req.user.id
        
        const userId = await User.findById(Id)
        const profileId = await Profile.findById(userId.profile)

       
        if(!profileId){
            return res.status(400).json({
                success:false,
                message:"Profile don't Exist"
            })
        }

        profileId.educationProfile = profileId.educationProfile.filter(
            (id) => id.toString() !== educationProfileId
        )
        await profileId.save();

        await educationProfile.findByIdAndDelete(educationProfileId);

        return res.status(200).json({
            success:true,
            message:"Delete EducationProfile Successfully !!"
        })

    } catch (error) {
        console.log(error)
            return res.status(500).json({
                success:false,
                message:"Error while Deleting EducationProfile"
        })
    }
}