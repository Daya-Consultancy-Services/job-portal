const User = require("../models/User")
const Profile = require("../models/Profile")
const career = require("../models/ExtraProfile/careerprofile");
require("dotenv").config();


exports.createCareer = async (req , res) => {
    try {
        const {

            industryType,
            department,
            empType,
            skills,
            jobLocation,
            salary

        } = req.body
        if(
            !industryType ||
            !department ||
            !empType ||
            !skills ||
            !jobLocation ||
            !salary
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
        const careers = await career.create({
            industryType,
            department,
            empType,
            skills,
            jobLocation,
            salary
        })
        profile.careerProfile.push(careers.id)
        await profile.save();

        return res.status(200).json({
            success:true,
            message:"CareerProfile Created Successfully",
            careers,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"CareerProfile can't register, Try again"
        });
    }
}

exports.updateCareer = async (req,res) => {
    try {
        const {

            careerId,
            industryType,
            department,
            empType,
            skills,
            jobLocation,
            salary

        } = req.body
        if(
            !careerId ||
            !industryType ||
            !department ||
            !empType ||
            !skills ||
            !jobLocation ||
            !salary
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
        const careers = await career.findByIdAndUpdate(
            careerId,
            {
                industryType : industryType,
                department   : department,
                empType      : empType,
                skills       : skills,
                jobLocation  : jobLocation,
                salary       : salary
            },
            {new:true}
        )

        await careers.save();
        return res.status(200).json({
            success:true,
            message:"CareerProfile Updated Successfully !!",
            careers,
        })

    } catch (error) {
        console.log(error)
            return res.status(500).json({
                success:false,
                message:"Error while updating CareerProfile"
            })
    }
}

exports.deleteCareer = async (req,res) => {
    try {
        const { careerId } = req.body
        if(!careerId){
            return res.status(403).json({
                success:false,
                message:"Career Id is required for delete"
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

        profileId.careerProfile = profileId.careerProfile.filter(
            (id) => id.toString() !== careerId
        )
        await profileId.save();

        await career.findByIdAndDelete(careerId);

        return res.status(200).json({
            success:true,
            message:"Delete CareerProfile Successfully !!"
        })
        
    } catch (error) {
        console.log(error)
            return res.status(500).json({
                success:false,
                message:"Error while Deleting certificates"
            })
    }
}


exports.getCareer = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).populate('profile');
        const profile = await Profile.findById(user.profile).populate('careerProfile');

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "Profile not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: profile.careerProfile, // Return the array of careerProfile
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch careerProfile",
        });
    }
}