const Recruiter = require("../models/recruiter");
const User = require("../models/User")
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Job = require("../models/jobs");
const ExcelJS = require("exceljs");


exports.loginRecruiter = async(req,res) => {
    try {
        const{email,password} = req.body

        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"All field is required for login" 
            });
       }

       const recruiter = await Recruiter.findOne({email})

       if(!recruiter){
            return res.status(401).json({
                success:false,
                message:"Company is not register, try register"
            });
        }

        if(await bcrypt.compare(password,recruiter.password))
        {
            const token = jwt.sign(
                {
                    email:recruiter.email,
                    id:recruiter.id,
                    role:recruiter.role
                },
                process.env.JWT_SECRET,
                {
                    expiresIn:"24h",
                }
            )
            recruiter.token = token

            recruiter.password = undefined

            const options = {
                expires: new Date(Date.now() + 24 * 60 * 60 * 1000),  // Expires in 1 days
                httpOnly: true,                                           // Ensures the cookie is not accessible via JavaScript
            };
            return res.cookie("token",token,options).status(200).json({
                success:true,
                message:`Login successful. Welcome, ${recruiter.name} !`,
                token,
                recruiter
            })

        }
        else{
            return res.status(401).json({
                success:false,
                message:"Password is Incorrect",
            });
        }   
        
    
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Login Failed , Try again"
        })
    }
}

exports.createJob = async (req, res) => {
    try {
        const recruiterId = req.user.id;
        const recruiter = await Recruiter.findById(recruiterId).populate("companyId");

        if (!recruiter) {
            return res.status(404).json({ success: false, message: "Recruiter not found" });
        }

        // Check if company is blocked
        if (recruiter.companyId.isBlocked) {
            return res.status(403).json({ success: false, message: "Your company is blocked. You cannot create jobs." });
        }

        // Check if recruiter has job tokens
        if (recruiter.jobToken <= 0) {
            return res.status(400).json({ success: false, message: "Insufficient job tokens. Please request more from your company." });
        }

        const { jobTitle, description, skillRequired, jobType, salaryRange, jobLocation } = req.body;

        if (!jobTitle || !description || !skillRequired || !jobType || !salaryRange || !jobLocation) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Create the job
        const job = await Job.create({
            companyId: recruiter.companyId._id,
            recruiterId,
            jobTitle,
            description,
            skillRequired,
            jobType,
            salaryRange,
            jobLocation,
            isClose: false
        });

        // Deduct a job token
        recruiter.jobToken -= 1;
        recruiter.job.push(job._id);
        await recruiter.save();

        return res.status(200).json({ success: true, message: "Job created successfully", data: job });

    } catch (error) {
        console.error("Error creating job:", error);
        return res.status(500).json({ success: false, message: "Error while creating job. Try again." });
    }
};

exports.updateJob = async (req, res) => {
    try {
        const recruiterId = req.user.id;
        const { jobId, ...updateFields } = req.body;

        if (!jobId) {
            return res.status(400).json({ success: false, message: "Job ID is required" });
        }

        // Fetch recruiter and verify existence
        const recruiter = await Recruiter.findById(recruiterId).populate("companyId");
        if (!recruiter) {
            return res.status(404).json({ success: false, message: "Recruiter not found" });
        }

        // Check if company is blocked
        if (recruiter.companyId.isBlocked) {
            return res.status(403).json({ success: false, message: "Your company is blocked. You cannot update jobs." });
        }

        // Check if recruiter has enough job tokens
        if (recruiter.jobToken <= 0) {
            return res.status(403).json({
                success: false,
                message: "Insufficient job tokens. Please request more from your company.",
            });
        }

        // Check if recruiter owns the job
        const jobExists = recruiter.job.some((job) => job._id.toString() === jobId);
        if (!jobExists) {
            return res.status(403).json({ success: false, message: "Unauthorized: You can only update jobs that you created" });
        }

        // Deduct 1 job token for updating the job
        recruiter.jobToken -= 1;
        await recruiter.save();

        // Update the job
        const updatedJob = await Job.findByIdAndUpdate(jobId, { $set: updateFields }, { new: true, runValidators: true });

        return res.status(200).json({ success: true, message: "Job updated successfully", data: updatedJob });

    } catch (error) {
        console.error("Error updating job:", error);
        return res.status(500).json({ success: false, message: "Error while updating job. Try again." });
    }
};

exports.deleteJob = async (req, res) => {
    try {
        const recruiterId = req.user.id;
        const { jobId } = req.body; // Fetch jobId from request body

        // Validate jobId
        if (!jobId) {
            return res.status(400).json({
                success: false,
                message: "Job ID is required in the request body",
            });
        }

        // Fetch the recruiter and check if the job exists in their posted jobs
        const recruiter = await Recruiter.findById(recruiterId).populate("job");
        if (!recruiter) {
            return res.status(404).json({
                success: false,
                message: "Recruiter not found",
            });
        }

        // Check if jobId exists in the recruiter's job array
        const jobIndex = recruiter.job.findIndex((job) => job._id.toString() === jobId);
        if (jobIndex === -1) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized: You can only delete jobs that you created",
            });
        }

        // Delete the job
        await Job.findByIdAndDelete(jobId);

        // Remove the job from the recruiter's job array
        recruiter.job.splice(jobIndex, 1);
        await recruiter.save(); // Save recruiter after job removal

        return res.status(200).json({
            success: true,
            message: "Job deleted successfully",
        });

    } catch (error) {
        console.error("Error deleting job:", error);
        return res.status(500).json({
            success: false,
            message: "Error while deleting job. Please try again.",
        });
    }
};

exports.getJobRecruiter = async (req, res) => {
    try {
        const recruiterId = req.user.id; // Get recruiter ID from auth middleware

        // Find all jobs created by this recruiter and populate appliedUsers
        const jobs = await Job.find({ recruiterId })
            .select("jobTitle description skillRequired jobType salaryRange jobLocation isClose") 
            .populate({
                path:"appliedUsers",
                select:"firstName lastName email",
            }) 
            .exec();

        if (jobs.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No jobs found for this recruiter.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Jobs fetched successfully",
            data: jobs
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error while fetching recruiter jobs"
        });
    }
};

exports.logoutRecruiter = async (req, res) => {
    try {
        // Clear the authentication token by setting an expired cookie
        return res
            .cookie("token", "", {
                expires: new Date(0),  // Expire the cookie immediately
                httpOnly: true,
            })
            .status(200)
            .json({
                success: true,
                message: "Logout successful",
            });
    } catch (error) {
        console.error("Logout Error:", error);
        return res.status(500).json({
            success: false,
            message: "Logout failed, please try again",
        });
    }
};

exports.getUserDetailsForRecruiter = async (req, res) => {
    try {
        const recruiterId = req.user.id;
        const userId = req.query.userId;
        console.log(userId);


        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        const recruiter = await Recruiter.findById(recruiterId).populate("job");
        if (!recruiter) {
            return res.status(404).json({ success: false, message: "Recruiter not found" });
        }

        if (!recruiter.permanentAccess && recruiter.userDetailAccessCount <= 0) {
            return res.status(403).json({ success: false, message: "Insufficient tokens to view user details" });
        }

        const user = await User.findById(userId)
            .select("firstName lastName email workstatus profile appliedJobs")
            .populate({
                path: "profile",
                select: "contactNumber resume resumeHeadline profileSummary location image personalDetails onlineProfiles certificates skillsProfile project careerProfile educationProfile employProfile",
                populate: {
                    path: "personalDetails onlineProfiles certificates skillsProfile project careerProfile educationProfile employProfile",
                },
            });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const hasAppliedToRecruiterJob = user.appliedJobs.some(jobId =>
            recruiter.job.some(recruiterJob => recruiterJob._id.toString() === jobId.toString())
        );

        if (!hasAppliedToRecruiterJob) {
            return res.status(403).json({ success: false, message: "User has not applied to your jobs" });
        }

        // Deduct 1 token for viewing
        if (!recruiter.permanentAccess) {
            recruiter.userDetailAccessCount -= 1;
            if (!recruiter.viewedUsers) recruiter.viewedUsers = [];  // Initialize array if not present
            recruiter.viewedUsers.push(userId);  // Mark user as viewed
            await recruiter.save();
        }

        return res.status(200).json({ success: true, message: "User details fetched", user });

    } catch (error) {
        console.error("Error fetching user details:", error);
        return res.status(500).json({ success: false, message: "Error while fetching user details" });
    }
};

exports.downloadUserDetailsForRecruiter = async (req, res) => {
    try {
        const recruiterId = req.user.id;
        const { userId } = req.body; 

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        const recruiter = await Recruiter.findById(recruiterId).populate("job");
        if (!recruiter) {
            return res.status(404).json({ success: false, message: "Recruiter not found" });
        }
        // Ensure recruiter has seen the user before downloading
        if (!recruiter.viewedUsers || !recruiter.viewedUsers.includes(userId)) {
            return res.status(403).json({
                success: false,
                message: "You must first view the user's details before downloading.",
            });
        }

        if (!recruiter.permanentAccess && recruiter.userDetailAccessCount <= 0) {
            return res.status(403).json({ success: false, message: "Insufficient tokens to download user details" });
        }

        const user = await User.findById(userId)
            .select("firstName lastName email workstatus profile appliedJobs")
            .populate({
                path: "profile",
                select: "contactNumber resume resumeHeadline profileSummary location image personalDetails onlineProfiles certificates skillsProfile project careerProfile educationProfile employProfile",
                populate: {
                    path: "personalDetails onlineProfiles certificates skillsProfile project careerProfile educationProfile employProfile",
                },
            });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const hasAppliedToRecruiterJob = user.appliedJobs.some(jobId =>
            recruiter.job.some(recruiterJob => recruiterJob._id.toString() === jobId.toString())
        );

        if (!hasAppliedToRecruiterJob) {
            return res.status(403).json({ success: false, message: "User has not applied to your jobs" });
        }

        if (!recruiter.permanentAccess) {
            if (recruiter.userDetailAccessCount >= 2) {
                recruiter.userDetailAccessCount -= 2;
                await recruiter.save();
            } else {
                return res.status(403).json({ 
                    success: false, 
                    message: "Insufficient tokens to download user details" 
                });
            }
        }

        // Generate Excel file
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("User Details");

      // Define Excel columns, including nested fields from the profile
    worksheet.columns = [
        { header: "First Name", key: "firstName", width: 15 },
        { header: "Last Name", key: "lastName", width: 15 },
        { header: "Email", key: "email", width: 25 },
        { header: "Work Status", key: "workstatus", width: 15 },
        { header: "Location", key: "location", width: 20 },
        { header: "Resume Headline", key: "resumeHeadline", width: 25 },
        { header: "Profile Summary", key: "profileSummary", width: 30 },
        { header: "Contact Number", key: "contactNumber", width: 15 },
        { header: "PersonalDetail", key: "PersonalDetail", width: 30 },
        { header: "OnlineProfiles", key: "OnlineProfiles", width: 30 },
        { header: "Certificates", key: "certificates", width: 30 },
        { header: "Skills", key: "skills", width: 30 },
        { header: "Projects", key: "projects", width: 30 },
        { header: "Education", key: "education", width: 30 },
        { header: "Employment History", key: "employment", width: 30 }
    ];

    // Add the user's data, making sure to handle nested objects and arrays
    worksheet.addRow({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        workstatus: user.workstatus,
        location: user.profile?.location || "N/A",
        resumeHeadline: user.profile?.resumeHeadline || "N/A",
        profileSummary: user.profile?.profileSummary || "N/A",
        contactNumber: user.profile?.contactNumber || "N/A",
        PersonalDetail : user.profile?.personalDetails?.map(per => `${per.gender} ${per.dateOfBirth} ${per.martialStatus} ${per.permanentAddress} ${per.pincode} ${per.language} ${per.address}`).join("\n") || "N\A",
        OnlineProfiles : user.profile?.onlineProfiles?.map(onf => `${onf.instagramLink} ${per.facebookLink} ${per.githubLink} ${per.linkedinLink}`).join("\n") || "N/A",
        certificates: user.profile?.certificates?.map(cert => `${cert.certificateName} (${cert.certificateLink}) - ${cert.certificateDescription}`).join("\n") || "N/A",
        skills: user.profile?.skillsProfile?.map(skill => `${skill.skillName} (${skill.experience})` ).join("\n") || "N/A",
        projects: user.profile?.project?.map(proj =>`${proj.projectTitle} (${proj.projectLink}) - ${proj.projectDescription} ${proj.projectSkills}`).join("\n") || "N/A",
        education: user.profile?.educationProfile?.map(edu => `${edu.institutionName} - ${edu.courseName} ${edu.courseType} ${edu.courseName} ${edu.marks} ${edu.location} ${edu.education}`).join("\n") || "N/A",
        employment: user.profile?.employProfile?.map(emp => `${emp.empType} (${emp.totalExp}) ${emp.currentJobTitle} ${emp.joinDate} ${emp.leaveDate} ${emp.empType} ${emp.currentSalary} ${emp.skill} ${emp.jobProfile} ${emp.noticePeriod} ${emp.jobDescription}`).join("\n") || "N/A"
    });


        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        const fileName = `User_Details_${userId}.xlsx`;
        res.setHeader(
            "Content-Disposition",
            `attachment; filename="${fileName}"`
        );

        await workbook.xlsx.write(res);
        res.end();

    } catch (error) {
        console.error("Error downloading user details:", error);
        return res.status(500).json({ success: false, message: "Error while downloading user details" });
    }
};
