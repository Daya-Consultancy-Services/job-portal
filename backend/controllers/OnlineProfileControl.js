const User = require("../models/User")
const Profile = require("../models/Profile")
const onlineprofile = require("../models/ExtraProfile/onlineProfile");
require("dotenv").config();


// exports.createOnlineProfile = async (req , res) => {
//     try {
//         const {

//             instagramLink,
//             facebookLink,
//             githubLink,
//             linkedinLink

//         } = req.body

//         const Id = req.user.id

//         const user = await User.findById(Id)

//         const profile = await Profile.findById(user.profile)
        
//         if(!profile){
//             return res.status(400).json({
//                 success:false,
//                 message:"Profile don't Exist"
//             })
//         }

//         let onlineProfile = await onlineprofile.findById(profile.onlineProfiles);

//         if (onlineProfile) {
//             // Update existing fields if they are empty
//             if (!onlineProfile.instagramLink && instagramLink) {
//                 onlineProfile.instagramLink = instagramLink;
//             }
//             if (!onlineProfile.facebookLink && facebookLink) {
//                 onlineProfile.facebookLink = facebookLink;
//             }
//             if (!onlineProfile.githubLink && githubLink) {
//                 onlineProfile.githubLink = githubLink;
//             }
//             if (!onlineProfile.linkedinLink && linkedinLink) {
//                 onlineProfile.linkedinLink = linkedinLink;
//             }

//             await onlineProfile.save();

//             return res.status(200).json({
//                 success: true,
//                 message: "Online profile updated successfully",
//                 data: onlineProfile,
//             });
//         } else {
//             // Create a new onlineProfile if it does not exist
//             onlineProfile = await onlineprofile.create({
//                 instagramLink,
//                 facebookLink,
//                 githubLink,
//                 linkedinLink,
//             });
//         }
//         profile.onlineProfiles = onlineProfiles.id;
//         await profile.save();

//         return res.status(200).json({
//             success:true,
//             message:"OnlineProfile Created Successfully",
//             data:onlineProfiles,
//         })

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             success:false,
//             message:"Personal Detail can't register, Try again"
//         });
//     }
// }
exports.createOnlineProfile = async (req, res) => {
    try {
        const inputFields = req.body; // Input data dynamically from the request body
        const userId = req.user.id;

        // Find the user and their profile
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const profile = await Profile.findById(user.profile);
        if (!profile) {
            return res.status(400).json({
                success: false,
                message: "Profile does not exist",
            });
        }

        // Check if onlineProfile exists
        let onlineProfile = await onlineprofile.findById(profile.onlineProfiles);

        if (onlineProfile) {
            // Update only empty fields dynamically
            Object.keys(inputFields).forEach((key) => {
                if (!onlineProfile[key] && inputFields[key]) {
                    onlineProfile[key] = inputFields[key];
                }
            });

            await onlineProfile.save();

            return res.status(200).json({
                success: true,
                message: "Online profile updated successfully",
                data: onlineProfile,
            });
        } else {
            // Create a new onlineProfile if none exists
            onlineProfile = await onlineprofile.create(inputFields);
            profile.onlineProfiles = onlineProfile.id;
            await profile.save();

            return res.status(200).json({
                success: true,
                message: "Online profile created successfully",
                data: onlineProfile,
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error while processing online profile",
        });
    }
};


exports.updateOnlineProfile = async (req ,res) => {
    try {
        const {

            instagramLink,
            facebookLink,
            githubLink,
            linkedinLink

        } = req.body

        const Id = req.user.id
        const userId = await User.findById(Id);

        const profileId = await Profile.findById(userId.profile)
        if(!profileId){
            return res.status(400).json({
                success:false,
                message:"Profile don't Exist"
            })
        }

        const onlineProfiles = await onlineprofile.findByIdAndUpdate(
            profileId.onlineProfiles._id,
            {
                instagramLink : instagramLink,
                facebookLink  : facebookLink,
                githubLink    : githubLink,
                linkedinLink  : linkedinLink
            },
            {new:true}
        )
        
        await onlineProfiles.save();

        return res.status(200).json({
            success:true,
            message:"Updated PersonalDetail Successfully !!",
            onlineProfiles,
        })
            

    } catch (error) {
        console.log(error)
            return res.status(500).json({
                success:false,
                message:"Error while updating PersonalDetails"
            })
    }
}

exports.deleteOnlineProfile = async (req ,res) => {
    try {
        const Id = req.user.id
        
        const userId = await User.findById(Id);
        if (!userId) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const profileId = await Profile.findById(userId.profile)
        if(!profileId){
            return res.status(400).json({
                success:false,
                message:"Profile don't Exist"
            })
        }

        const onlineProfile = await onlineprofile.findById(profileId.onlineProfiles);
        if (!onlineProfile) {
            return res.status(404).json({
                success: false,
                message: "Online profile not found",
            });
        }
        // Extract the fields to delete from the request body
        const { instagramLink, facebookLink, githubLink, linkedinLink } = req.body;
        

        const deletedFields = [];
        // Remove specified links
        if (instagramLink) {
            onlineProfile.instagramLink = null;
            deletedFields.push("instagramLink");
        }
        if (facebookLink) {
            onlineProfile.facebookLink = null;
            deletedFields.push("facebookLink");
        }
        if (githubLink) {
            onlineProfile.githubLink = null;
            deletedFields.push("githubLink");
        }
        if (linkedinLink) {
            onlineProfile.linkedinLink = null;
            deletedFields.push("linkedinLink");
        }

        
       

        // Save the updated online profile
        await onlineProfile.save();

        const deletedMessage =
            deletedFields.length > 0
                ? `Selected ${deletedFields.join(", ")} ${
                      deletedFields.length === 1 ? "is" : "are"
                  } deleted successfully!`
                : "No fields were selected for deletion.";


        return res.status(200).json({
            success:true,
            message:deletedMessage
        })
        
    } catch (error) {
        console.log(error)
            return res.status(500).json({
                success:false,
                message:"Error while Deleting PersonalDetails"
            })
    }
}

exports.getOnlineProfile = async(req , res) => {
    try {
        const id = req.user.id;
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        const profile  = await Profile.findById(user.profile).populate("onlineProfiles").exec();
        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "Profile not found",
            });
        }
     
        return res.status(200).json({
            success:true,
            message:"User OnlineProfile Fetched Successfully",
            data : profile.onlineProfiles
        });
    
    } catch (error) {
        console.log(error);
        return res.status(500).json({
           success:false,
           message:error.message,
       });
    }
  
}