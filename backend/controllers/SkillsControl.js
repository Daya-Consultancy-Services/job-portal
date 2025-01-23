const User = require("../models/User")
const Profile = require("../models/Profile")
const skillProfile = require("../models/ExtraProfile/skillProfile");
require("dotenv").config();

exports.createSkillProfile = async (req , res) => {
    try {
        const {

            skillName,
            experience

        } = req.body

        if(
            !skillName ||
            !experience 
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

        const skillProfiles = await skillProfile.create({

            skillName,
            experience
        })

        profile.skillsProfile.push(skillProfiles.id)
        await profile.save();

        return res.status(200).json({
            success:true,
            message:"SkillProfile Created Successfully",
            data:skillProfiles,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"SkillProfile can't register, Try again"
        });
    }
}

exports.updateSkillProfile = async (req , res) => {
    try {
        const {

            skillProfileId,
            skillName,
            experience

        } = req.body
        if(
            !skillProfileId ||
            !skillName ||
            !experience
        ){
            return res.status(403).json({
                success:false,
                message:"All field are required too be filled"
            });
        }
        const Id = req.user.id
        const userId = await User.findById(Id);

        const profileId = await Profile.findById(userId.profile)
        if(!profileId){
            return res.status(400).json({
                success:false,
                message:"Profile don't Exist"
            })
        }

        const skillProfiles = await skillProfile.findByIdAndUpdate(
            skillProfileId,
            {
                skillName  : skillName,
                experience : experience
            },
            {new:true}
        )
        await skillProfiles.save();

        return res.status(200).json({
            success:true,
            message:"Skillprofile Updated Successfully !!",
            skillProfiles,
        })

    } catch (error) {
        console.log(error)
            return res.status(500).json({
                success:false,
                message:"Error while updating Certificate"
            })
    }
}

exports.deleteSkillProfile = async (req, res) => {
    try {
        const { skillProfileId } = req.body;
        if(!skillProfileId){
            return res.status(403).json({
                success:false,
                message:"skillProfile Id is required for delete"
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
        profileId.skillsProfile = profileId.skillsProfile.filter(
            (id) => id.toString() !== skillProfileId
        )

        await profileId.save();

        await skillProfile.findByIdAndDelete(skillProfileId);

        return res.status(200).json({
            success:true,
            message:"Delete SkillProfile Successfully !!"
        })
        
    } catch (error) {
        console.log(error)
            return res.status(500).json({
                success:false,
                message:"Error while Deleting skillProfile"
            })
    }
}

exports.getSkillProfile = async (req , res) =>{
    try {

        const userId = req.user.id;
        const user = await User.findById(userId).populate('profile');
        const profile = await Profile.findById(user.profile).populate('skillsProfile');

        
        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "Profile not found",
            });
        }
        return res.status(200).json({
            success: true,
            data: profile.skillsProfile // Return the array of certificates
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch certificates",
        });
    }
}