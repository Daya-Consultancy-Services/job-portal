const User = require("../models/User")
const Profile = require("../models/Profile")
const personalDetail = require("../models/ExtraProfile/personalDetail");
require("dotenv").config();

// create personal detail 
exports.createPersonalDetail = async (req,res) =>{
    try {
        const {

            gender,
            dateOfBirth,
            martialStatus,
            permanentAddress,
            pincode,
            language,
            address

        } = req.body
        
        if(
            !gender ||
            !dateOfBirth ||
            !martialStatus ||
            !permanentAddress ||
            !pincode ||
            !language ||
            !address
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
        
        const checkPersonalDetail = await personalDetail.findById(profile.personalDetails); 
        if (checkPersonalDetail) {
            return res.status(400).json({
                success: false,
                message: "User personal detail already exists",
            });
        }
        
        const personalDetails = await personalDetail.create({

            gender,
            dateOfBirth,
            martialStatus,
            permanentAddress,
            pincode,
            language,
            address

        })
        
        profile.personalDetails = personalDetails.id;
        await profile.save();

        return res.status(200).json({
            success:true,
            message:"Personal Details Created Successfully",
            data:personalDetails,
        })

       


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Personal Detail can't register, Try again"
        });
    }
}

// next update
exports.updatePersonalDetail = async (req,res) => {
    try {
        const {

            gender,
            dateOfBirth,
            martialStatus,
            permanentAddress,
            pincode,
            language,
            address

        } = req.body

        if( 
            !gender ||
            !dateOfBirth ||
            !martialStatus ||
            !permanentAddress ||
            !pincode ||
            !language ||
            !address
        )
            {
                return res.status(400).json({
                    success:false,
                    message:"All field are Required"
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

        const personalDetails = await personalDetail.findByIdAndUpdate(
            profileId.personalDetails._id,
            {

                gender : gender,
                dateOfBirth : dateOfBirth,
                martialStatus : martialStatus,
                permanentAddress : permanentAddress,
                pincode : pincode,
                language : language,
                address : address

            }
        )

        await personalDetails.save();

        return res.status(200).json({
            success:true,
            message:"Updated PersonalDetail Successfully !!",
            personalDetails,
        })

    } catch (error) {
        console.log(error)
            return res.status(500).json({
                success:false,
                message:"Error while updating PersonalDetails"
            })
    }
}

// removing the data but not deleting after creation in the first time
exports.deletePeronalDetail = async(req,res) => {
    try {
        const Id = req.user.id
        
        const userId = await User.findById(Id)
        const profileId = await Profile.findById(userId.profile)

       
        if(!profileId){
            return res.status(400).json({
                success:false,
                message:"Profile don't Exist"
            })
        }
        const personalDetails = await personalDetail.findByIdAndUpdate(
            profileId.personalDetails._id,
            {

                gender : null,
                dateOfBirth : null,
                martialStatus : null,
                permanentAddress : null,
                pincode : null,
                language : null,
                address : null

            }
        )
        await personalDetails.save();

        return res.status(200).json({
            success:true,
            message:"Delete Profile Successfully !!"
        })

    } catch (error) {
        console.log(error)
            return res.status(500).json({
                success:false,
                message:"Error while Deleting PersonalDetails"
            })
    }
}