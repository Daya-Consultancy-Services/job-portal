const User = require("../models/User")
const Profile = require("../models/Profile")
const {uploadToCloudinary, uploadResumeToCloudinary} = require("../config/cloudinary");
require("dotenv").config();
const cloudinary = require('cloudinary').v2;

exports.updateProfile = async (req,res) => {
        try {
            const {
                about,
                contactNumber,
                resumeHeadline,
                profileSummary,
                location,
                //image 
            } = req.body

            // if( 
            //     !about || 
            //     !contactNumber || 
            //     !resumeHeadline ||
            //     !profileSummary ||
            //     !location 
            //     //!image
            // )
            //     {
            //         return res.status(400).json({
            //             success:false,
            //             message:"All field are Required"
            //         });
            //     }
            
            const Id = req.user.id
            const userDetail = await User.findById(Id);
            if (!userDetail) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }

            const profileId = userDetail.profile._id;
            if (!profileId) {
                return res.status(404).json({
                    success: false,
                    message: "Profile not found",
                });
            }
            const oldProfile = await Profile.findById(profileId);

            const updatedProfile = {
                about,
                contactNumber,
                resumeHeadline,
                profileSummary,
                location,
                //image,
            };
            if (req.file) {
                updatedProfile.resume = req.file.buffer;  // Assuming file is uploaded as buffer
            }

            const profileDetail = await Profile.findByIdAndUpdate(profileId,updatedProfile,{new:true})
                

            if (!profileDetail) {
                return res.status(404).json({
                    success: false,
                    message: "Profile not found or could not be updated",
                });
            }         
        
            const updatedFields = {};
            for (const key in updatedProfile) {
                if (updatedProfile[key] !== oldProfile[key]) {
                    updatedFields[key] = updatedProfile[key];
                }
            }
           

            return res.status(200).json({
                success:true,
                message:"Profile Updated Successfully !!",
                data:updatedFields,
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
            data : userDetail.profile
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Error while Fetching User Details"
        });
    }
}

// Upload Resume Function
exports.uploadResume = async (req, res) => {
    try {
        const userId = req.user.id;
        
        const userDetail = await User.findById(userId);
        const profileDetail = await Profile.findById(userDetail.profile._id);

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No resume file provided"
            });
        }

        // Upload to Cloudinary
        const cloudinaryResponse = await uploadResumeToCloudinary(req.file);

        if (!cloudinaryResponse.success) {
            return res.status(500).json({
                success: false,
                message: cloudinaryResponse.error
            });
        }


        if (!profileDetail) {
            return res.status(404).json({
                success: false,
                message: "Profile not found"
            });
        }

        // Update profile with new URL
        profileDetail.resume = cloudinaryResponse.url,
        profileDetail.resumePublicId = cloudinaryResponse.public_id;
        await profileDetail.save();

        return res.status(200).json({
            success: true,
            message: "Resume uploaded successfully",
            data: {
                resumeUrl: cloudinaryResponse.url,
                uploadedAt: cloudinaryResponse.created_at
            }
        });

    } catch (error) {
        console.error('Resume upload handler error:', error);
        return res.status(500).json({
            success: false,
            message: "Error uploading resume",
            error: error.message
        });
    }
};

exports.deleteResume = async (req, res) => {
    try {
        const id = req.user.id;
        const userDetail = await User.findById(id);
        if (!userDetail) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        const profileDetail = await Profile.findById(userDetail.profile._id);
        if (!profileDetail) {
            return res.status(404).json({
                success: false,
                message: "Profile not found",
            });
        }

        if (!profileDetail.resumePublicId) {
            return res.status(404).json({
                success: false,
                message: "No resume found to delete",
            });
        }

        // Try deleting with explicit resource type
        try {
            console.log('Attempting to delete:', profileDetail.resumePublicId);
            const result = await cloudinary.uploader.destroy(profileDetail.resumePublicId, {
                resource_type: "raw"  // Specify raw for documents/PDFs
            });
            console.log('Deletion result:', result);
        } catch (cloudinaryError) {
            console.error('Cloudinary deletion error:', cloudinaryError);
            
            // Try alternative deletion method if first one fails
            try {
                const altResult = await cloudinary.api.delete_resources([profileDetail.resumePublicId], {
                    resource_type: "raw"
                });
                console.log('Alternative deletion result:', altResult);
            } catch (altError) {
                console.error('Alternative deletion failed:', altError);
                throw altError;
            }
        }

        // Update database regardless of Cloudinary result
        profileDetail.resume = undefined;
        profileDetail.resumePublicId = undefined;
        await profileDetail.save();

        return res.status(200).json({
            success: true,
            message: "Resume deleted successfully",
        });
    } catch (error) {
        console.error('Resume deletion error:', error);
        return res.status(500).json({
            success: false,
            message: "Error while deleting resume",
            error: error.message
        });
    }
};


exports.downloadResume = async (req, res) => {
    try {
        const id = req.user.id;
        const userDetail = await User.findById(id);
        if (!userDetail) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const profileDetail = await Profile.findById(userDetail.profile._id);
        if (!profileDetail || !profileDetail.resumePublicId) {
            return res.status(404).json({
                success: false,
                message: "Resume not found",
            });
        }

        // Get the resource details from Cloudinary
        const resource = await cloudinary.api.resource(profileDetail.resumePublicId, {
            resource_type: 'image',
            type: 'upload'
        });

        // Return the secure URL
        return res.json({
            success: true,
            downloadUrl: resource.secure_url
        });

    } catch (error) {
        console.error('Resume download error:', error);
        return res.status(500).json({
            success: false,
            message: "Error while downloading resume",
            error: error.message
        });
    }
};


// exports.getResume = async (req, res) => {
//     try {
//         const userId = req.user.id;
        
//         // Find user and check if exists
//         const userDetail = await User.findById(userId);
//         if (!userDetail) {
//             return res.status(404).json({
//                 success: false,
//                 message: "User not found"
//             });
//         }

//         // Find profile and check if exists
//         const profileDetail = await Profile.findById(userDetail.profile._id);
//         if (!profileDetail) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Profile not found"
//             });
//         }

//         // Check if resume exists
//         if (!profileDetail.resume) {
//             return res.status(404).json({
//                 success: false,
//                 message: "No resume found for this user"
//             });
//         }

//         // Extract the original filename from the Cloudinary URL or use a default
//         let resumeName = 'resume.pdf';
//         if (profileDetail.resumePublicId) {
//             // Extract filename from public ID
//             const nameParts = profileDetail.resumePublicId.split('/');
//             resumeName = nameParts[nameParts.length - 1];
//             // Add file extension if missing
//             if (!resumeName.includes('.')) {
//                 resumeName += '.pdf';
//             }
//         }

//         // Return the resume URL, public ID, and filename
//         return res.status(200).json({
//             success: true,
//             message: "Resume fetched successfully",
//             data: {
//                 resumeUrl: profileDetail.resume,
//                 resumePublicId: profileDetail.resumePublicId,
//                 resumeName: resumeName
//             }
//         });
//     } catch (error) {
//         console.error('Error fetching resume:', error);
//         return res.status(500).json({
//             success: false,
//             message: "Error while fetching resume",
//             error: error.message
//         });
//     }
// };

exports.getExtraProfile = async (req, res) => {
    try {
        const id = req.user.id;

        // Populate only 'image' and 'resume' fields from the profile
        const userDetail = await User.findById(id)
            .populate({
                path: "profile",
                select: "image resume about contactNumber resumeHeadline profileSummary location" // Select only the required fields
            })
            .exec();

        return res.status(200).json({
            success: true,
            message: "User Detail Fetched Successfully",
            data: userDetail.profile
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error while Fetching User Details"
        });
    }
};

exports.uploadProfileImage = async (req, res) => {
    try {
        const userId = req.user.id;
        
        // Debug logging
        console.log('Request files:', req.files);
        console.log('Request file:', req.file);
        
        // Check both req.files.image and req.file
        const file = req.files?.image || req.file;
        
        if (!file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded'
            });
        }

        // Upload to Cloudinary
        const cloudinaryUrl = await uploadToCloudinary(file);
        
        if (!cloudinaryUrl) {
            return res.status(400).json({
                success: false,
                message: 'Upload to Cloudinary failed'
            });
        }

        // Find user and their profile
        const userDetail = await User.findById(userId);
        
        if (!userDetail) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const profileDetail = await Profile.findById(userDetail.profile._id);

        if (!profileDetail) {
            return res.status(404).json({
                success: false,
                message: "Profile not found"
            });
        }

        // Update profile with new image URL
        profileDetail.image = cloudinaryUrl;
        await profileDetail.save();

        return res.status(200).json({
            success: true,
            message: "Profile image uploaded successfully",
            url: cloudinaryUrl 
        });

    } catch (error) {
        console.error('Profile upload error:', error);
        return res.status(500).json({ 
            success: false,
            message: "Error uploading profile image",
            error: error.message 
        });
    }
};

exports.getProfileImage = async (req, res) => {
    try {
        const userId = req.user.id;

        // Find user and populate profile
        const userDetail = await User.findById(userId);
        if (!userDetail) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const profileDetail = await Profile.findById(userDetail.profile).populate("image").exec();
       
        if (!profileDetail) {
            return res.status(404).json({
                success: false,
                message: "Profile not found"
            });
        }

        // Check if image exists
        if (!profileDetail.image) {
            return res.status(404).json({
                success: false,
                message: "No profile image found"
            });
        }

        // Return the image URL
        return res.status(200).json({
            success: true,
            message: "Profile image URL fetched successfully",
            url: profileDetail.image
        });
    } catch (error) {
        console.error('Error fetching profile image:', error);
        return res.status(500).json({
            success: false,
            message: "Error fetching profile image",
            error: error.message
        });
    }
};

// ladukishorsubudhi44@gmail.com
// ladu12345