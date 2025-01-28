const User = require("../models/User")
const Profile = require("../models/Profile")
const employmentprofile = require("../models/ExtraProfile/employmentProfile");
require("dotenv").config();

exports.createEmploymentProfile = async (req , res) => {
    try {
        const {

            isCurrentEmp,
            empType,
            totalExp,
            currentJobTitle,
            joinDate,
            leaveDate,
            currentSalary,
            skill,
            jobProfile,
            noticePeriod,
            jobDescription

        } = req.body
        if(
            isCurrentEmp === undefined ||
            !empType ||
            !totalExp ||
            !currentJobTitle ||
            !joinDate ||
            //!leaveDate ||
            !currentSalary ||
            !skill ||
            !jobProfile ||
            !noticePeriod ||
            !jobDescription
        )   
            {
                return res.status(403).json({
                    success:false,
                    message:"All field are required too be filled emp"
                });
            }
                // Validate leaveDate conditionally
        if (isCurrentEmp && leaveDate !== null) {
                return res.status(400).json({
                        success: false,
                        message: "leaveDate must be null for current employment"
                });
        }
        
        if (!isCurrentEmp && !leaveDate) {
                return res.status(400).json({
                        success: false,
                        message: "leaveDate is required for past employment"
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

        const employProfiles = await employmentprofile.create({
            isCurrentEmp,
            empType,
            totalExp,
            currentJobTitle,
            joinDate,
            leaveDate: isCurrentEmp ? null : leaveDate,   // Ensure leaveDate is set based on condition
            currentSalary,
            skill,
            jobProfile,
            noticePeriod,
            jobDescription
        })

        profile.employProfile.push(employProfiles.id);
        await profile.save();

        return res.status(200).json({
            success:true,
            message:"EmployProfiles Created Successfully",
            employProfiles,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"EmployProfiles can't register, Try again"
        });
    }
}

exports.updateEmploymentProfile = async (req , res) => {
    try {
        const {

            empId,
            isCurrentEmp,
            empType,
            totalExp,
            currentJobTitle,
            joinDate,
            leaveDate,
            currentSalary,
            skill,
            jobProfile,
            noticePeriod,
            jobDescription

        } = req.body
        if(
            !empId ||
            !isCurrentEmp ||
            !empType ||
            !totalExp ||
            !currentJobTitle ||
            !joinDate ||
            //!leaveDate ||
            !currentSalary ||
            !skill ||
            !jobProfile ||
            !noticePeriod ||
            !jobDescription 
        ){
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
        const employprofile = await employmentprofile.findByIdAndUpdate(
            empId,
            {
                isCurrentEmp      : isCurrentEmp,
                empType           : empType,
                totalExp          : totalExp,
                currentJobTitle   : currentJobTitle,
                joinDate          : joinDate,
                leaveDate         : leaveDate,
                currentSalary     : currentSalary,
                skill             : skill,
                jobProfile        : jobProfile,
                noticePeriod      : noticePeriod,
                jobDescription    : jobDescription
            },
            {new:true}
        )
        await employprofile.save();
        return res.status(200).json({
            success:true,
            message:"employprofile Updated Successfully !!",
            data:employprofile,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Error while updating employprofile"
        })
    }
}

exports.deleteEmploymentProfile = async (req , res) => {
    try {
        const {empId} = req.body;
        if(!empId){
        return res.status(403).json({
                success:false,
                message:"EmploymentProfile Id is required for delete"
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

        profileId.employProfile = profileId.employProfile.filter(
            (id) => id.toString() !== empId
        )

        await profileId.save();

        await employmentprofile.findByIdAndDelete(empId);

        return res.status(200).json({
            success:true,
            message:"Delete employmentprofile Successfully !!"
        })

    } catch (error) {
         console.log(error)
            return res.status(500).json({
                success:false,
                message:"Error while Deleting employmentprofile"
            })
    }
}

exports.getEmploymentProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).populate('profile');
        const profile = await Profile.findById(user.profile).populate('employProfile');

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: "Profile not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: profile.employProfile, // Return the array of employProfile
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch employProfile",
        });
    }
}