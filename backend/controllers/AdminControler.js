const Admin = require("../models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Company = require("../models/company");
const Job = require("../models/jobs");
const Recruiter = require("../models/recruiter");
const { passwordUpdated } = require("../routes/passwordUpdate");
const { uploadAdminImage } = require("../config/cloudinary");
require("dotenv").config();

exports.createAdmin = async (req, res) => {
  try {
    const { name, email, password, contactNumber, role } = req.body;

    // ✅ Check if all fields are provided
    if (!name || !email || !password || !contactNumber || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // ✅ Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin already exists with this email",
      });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create Admin
    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword,
      contactNumber,
      role,
    });

    return res.status(201).json({
      success: true,
      message: "Admin created successfully",
      admin,
    });
  } catch (error) {
    console.error("Error in createAdmin:", error);
    return res.status(500).json({
      success: false,
      message: "Error creating admin",
    });
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // ✅ Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // ✅ Compare passwords
    if (await bcrypt.compare(password, admin.password)) {
      // ✅ Generate JWT Token
      const token = jwt.sign(
        {
          email: admin.email,
          id: admin.id,
          role: admin.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      // ✅ Store token in admin model
      admin.token = token;
      admin.password = undefined; // Remove password from response

      // ✅ Set cookie options
      const options = {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // Expires in 1 days
        httpOnly: true, // Ensures the cookie is not accessible via JavaScript
      };

      return res
        .cookie("token", token, options)
        .status(200)
        .json({
          success: true,
          message: `Login successful. Welcome, ${admin.name}!`,
          token,
          admin,
        });
    } else {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    }
  } catch (error) {
    console.error("Error in loginAdmin:", error);
    return res.status(500).json({
      success: false,
      message: "Error logging in admin",
    });
  }
};

exports.updateAdmin = async (req, res) => {
  try {
    const adminId = req.user.id; // Admin's own ID from authentication
    const updateFields = req.body;

    // Prevent updating restricted fields
    if (updateFields.role) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to change your role",
      });
    }

    // If password is being updated, hash it before saving
    if (updateFields.password) {
      updateFields.password = await bcrypt.hash(updateFields.password, 10);
    }

    // Find and update the admin
    const updatedAdmin = await Admin.findByIdAndUpdate(
      adminId,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updatedAdmin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Admin updated successfully",
      updatedAdmin,
    });
  } catch (error) {
    console.error("Error updating admin:", error);
    return res.status(500).json({
      success: false,
      message: "Error while updating admin. Please try again.",
    });
  }
};

exports.changeAdminPassword = async (req, res) => {
  try {
    const adminDetails = await Admin.findById(req.user.id);
    const { oldPassword, newPassword } = req.body;

    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      adminDetails.password
    );
    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "The password is incorrect" });
    }

    const encryptedPassword = await bcrypt.hash(newPassword, 10);
    const updatedAdminDetails = await Admin.findByIdAndUpdate(
      req.user.id,
      { password: encryptedPassword },
      { new: true }
    );

    // Send confirmation email
    try {
      const emailResponse = await mailSender(
        updatedAdminDetails.email,
        "Password for your account has been updated",
        passwordUpdated(
          updatedUserDetails.email,
          `Password updated successfully for ${updatedAdminDetails.name}`
        )
      );
      console.log("Email sent successfully:", emailResponse.response);
    } catch (error) {
      console.error("Error occurred while sending email:", error);
      return res.status(500).json({
        success: false,
        message: "Error occurred while sending email",
        error: error.message,
      });
    }

    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    return res
      .status(500)
      .json({
        success: false,
        message: "Error updating password",
        error: error.message,
      });
  }
};

exports.deleteAdmin = async (req, res) => {
  try {
    const adminId = req.user.id; // Admin ID from authentication

    // Find and delete admin
    const deletedAdmin = await Admin.findByIdAndDelete(adminId);

    if (!deletedAdmin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    // Clear token from cookies after deletion
    res.clearCookie("token");

    return res.status(200).json({
      success: true,
      message: "Admin deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting admin:", error);
    return res.status(500).json({
      success: false,
      message: "Error while deleting admin. Please try again.",
    });
  }
};

exports.getAlldetailAdmin = async (req, res) => {
  try {
    const adminId = req.user.id;
    const adminDetails = await Admin.findById(adminId);

    if (!adminDetails) {
      return res.status(404).json({
        success: false,
        message: "Admin not found, try again later",
      });
    }

    return res.status(200).json({
      success: true,
      message: "All admin details fetched successfully",
      data: adminDetails.admin,
    });
  } catch (e) {
    console.log(e);
    return res.status(404).json({
      success: false,
      message: "Error fetching admin details, try again later",
    });
  }
};

exports.logoutAdmin = async (req, res) => {
  try {
    // Clear the authentication token by setting an expired cookie
    return res
      .cookie("token", "", {
        expires: new Date(0), // Expire the cookie immediately
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

exports.uploadAdminImage = async (req, res) => {
  console.log("file upload in controller");
  try {
    const adminId = req.user.id;
    const adminDetail = await Admin.findById(adminId);

    const file = req.files?.image || req.file;
    if (!file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const cloudinaryResponse = await uploadAdminImage(file);

    if (!cloudinaryResponse) {
      return res.status(500).json({
        success: false,
        message: "Error while uploading file to cloudinary",
      });
    }

    if (!adminDetail) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    adminDetail.image = cloudinaryResponse.url;
    await adminDetail.save();

    return res.status(200).json({
      success: true,
      message: "Admin Image Uploaded Successfully",
      url: cloudinaryResponse.url,
    });
  } catch (error) {
    console.error("Admin image upload error", error);
    return res.status(500).json({
      success: false,
      message: "Error while uploading admin image",
    });
  }
};

exports.getAllCompaniesForAdmin = async (req, res) => {
    try {
        // Ensure the user is an admin
        if (req.user.role !== "admin") {
            return res.status(403).json({ success: false, message: "Access denied" });
        }

        // Fetch all companies without recruiters
        const companies = await Company.find().select("name isBlocked jobToken logo userDetailAccessCount email website location companyfield recruiter description");

        return res.status(200).json({ success: true, data: companies });

    } catch (error) {
        console.error("Error fetching companies:", error);
        return res.status(500).json({ success: false, message: "Error fetching companies" });
    }
};

exports.assignTokensToCompany = async (req, res) => {
  try {
    const { companyId, jobToken, userDetailAccessCount, isBlocked } = req.body;

    const company = await Company.findById(companyId);
    if (!company) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found" });
    }

    company.jobToken = jobToken;
    company.userDetailAccessCount = userDetailAccessCount;

    if (typeof isBlocked !== "undefined") {
      company.isBlocked = isBlocked;
    }

    await company.save();

    return res.status(200).json({
      success: true,
      message: `Tokens assigned successfully and company ${
        isBlocked ? "blocked" : "unblocked"
      }`,
      company,
    });
  } catch (error) {
    console.error("Error assigning tokens:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error assigning tokens" });
  }
};

exports.toggleUserBlock = async (req, res) => {
  try {
      const { userId } = req.body; // Get user ID from body 

      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ success: false, message: "User not found" });
      }

      user.isBlocked = !user.isBlocked; // Toggle the block status
      await user.save();

      return res.status(200).json({
          success: true,
          message: `User ${user.isBlocked ? "blocked" : "unblocked"} successfully.`,
          user,
      });
  } catch (error) {
      console.error("Error toggling user block status:", error);
      return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Block/Unblock Job
exports.toggleJobBlock = async (req, res) => {
  try {
      const { jobId } = req.body; // Get job ID from request parameters

      const job = await Job.findById(jobId);
      if (!job) {
          return res.status(404).json({ success: false, message: "Job not found" });
      }

      job.isBlocked = !job.isBlocked; // Toggle the block status
      await job.save();

      return res.status(200).json({
          success: true,
          message: `Job ${job.isBlocked ? "blocked" : "unblocked"} successfully.`,
          job,
      });
  } catch (error) {
      console.error("Error toggling job block status:", error);
      return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Toggle Block/Unblock Recruiter
exports.toggleRecruiterBlock = async (req, res) => {
    try {
        const { recruiterId } = req.body;

        const recruiter = await Recruiter.findById(recruiterId);
        if (!recruiter) {
            return res.status(404).json({ success: false, message: "Recruiter not found" });
        }

        recruiter.isBlocked = !recruiter.isBlocked;
        await recruiter.save();

        return res.status(200).json({
            success: true,
            message: `Recruiter ${recruiter.isBlocked ? "blocked" : "unblocked"} successfully.`,
            recruiter,
        });
    } catch (error) {
        console.error("Error toggling recruiter block status:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};
