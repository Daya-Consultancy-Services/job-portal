const User = require("../models/User")
const Profile = require("../models/Profile")
const certificate = require("../models/ExtraProfile/certificate");
require("dotenv").config();


exports.createCertificate = async (req , res) =>{
    try {
        const {

            certificateName,
            certificateLink,
            certificateDescription

        } = req.body
        if(
            !certificateName ||
            !certificateLink ||
            !certificateDescription
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
        
        // const checkcertificate = await certificate.findById(profile.certificates)
        // if(checkcertificate){
        //     return res.status(400).json({
        //         success: false,
        //         message: "User Certificate already exists",
        //     });
        // }

        const certificates = await certificate.create({
            certificateName,
            certificateLink,
            certificateDescription
        })

        profile.certificates.push(certificates.id);
        await profile.save();

        return res.status(200).json({
            success:true,
            message:"Certificate Created Successfully",
            data:certificates,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Personal Detail can't register, Try again"
        });
    }
}

exports.updateCertificate = async (req ,res) => {
    try {
        const {
            certificateId,
            certificateName,
            certificateLink,
            certificateDescription

        } = req.body

        if(
            !certificateId,
            !certificateName ||
            !certificateLink ||
            !certificateDescription
        )
            {
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

        const certificates = await certificate.findByIdAndUpdate(
            certificateId,
            {
                certificateName : certificateName,
                certificateLink : certificateLink,
                certificateDescription : certificateDescription
            },
            {new:true}
        )
        
        await certificates.save();

        return res.status(200).json({
            success:true,
            message:"Certificate Updated Successfully !!",
            certificates,
        })
            

    } catch (error) {
        console.log(error)
            return res.status(500).json({
                success:false,
                message:"Error while updating Certificate"
            })
    }
}

exports.deleteCertificate = async(req,res) => {
    try {
        const { certificateId } = req.body;
        const Id = req.user.id
        
        const userId = await User.findById(Id)
        const profileId = await Profile.findById(userId.profile)

       
        if(!profileId){
            return res.status(400).json({
                success:false,
                message:"Profile don't Exist"
            })
        }
        profileId.certificates = profileId.certificates.filter(
            (id) => id.toString() !== certificateId
        );
        await profileId.save();
        
        await certificate.findByIdAndDelete(certificateId);

        return res.status(200).json({
            success:true,
            message:"Delete Certificate Successfully !!"
        })

    } catch (error) {
        console.log(error)
            return res.status(500).json({
                success:false,
                message:"Error while Deleting certificates"
            })
    }
}