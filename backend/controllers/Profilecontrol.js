const User = require("../models/User")
const Profile = require("../models/Profile")
const {uploadToCloudinary} = require("../config/cloudinary");
require("dotenv").config();


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

            if( 
                !about || 
                !contactNumber || 
                !resumeHeadline ||
                !profileSummary ||
                !location 
                //!image
            )
                {
                    return res.status(400).json({
                        success:false,
                        message:"All field are Required"
                    });
                }
            
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
        
            await profileDetail.save();

            return res.status(200).json({
                success:true,
                message:"Profile Updated Successfully !!",
                profileDetail,
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
        const id = req.user.id; // Extract user ID from authenticated request

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
        }

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

        // Update resume field
        profileDetail.resume = req.file.buffer; // Store file as Buffer
        await profileDetail.save();

        return res.status(200).json({
            success: true,
            message: "Resume uploaded successfully!",
            data: profileDetail.resume,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while uploading resume",
        });
    }
};

exports.deleteResume = async (req, res) => {
    try {
        const id = req.user.id; // Extract user ID from authenticated request

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

        // Delete the resume field
        profileDetail.resume = undefined; // Remove the file
        await profileDetail.save();

        return res.status(200).json({
            success: true,
            message: "Resume deleted successfully!",
            data:profileDetail.resume,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while deleting resume",
        });
    }
};

exports.downloadResume = async (req, res) => {
    try {
        const id = req.user.id; // Extract user ID from authenticated request

        const userDetail = await User.findById(id);

        if (!userDetail) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const profileDetail = await Profile.findById(userDetail.profile._id);

        if (!profileDetail || !profileDetail.resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found",
            });
        }

        // Set the file name and type for the response
        const fileName = 'resume.pdf'; // Change as necessary based on the file type
        const fileBuffer = profileDetail.resume;

        // Send the file to the client
        res.set({
            'Content-Type': 'application/pdf', // Adjust based on the actual file type
            'Content-Disposition': `attachment; filename=${fileName}`,
        });

        // Send the file buffer as a response
        res.send(fileBuffer);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while downloading resume",
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