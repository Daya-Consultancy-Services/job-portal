const Recruiter = require("../models/recruiter");
const Admin = require("../models/admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
                    role: admin.role 
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

            return res.cookie("token", token, options).status(200).json({
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

exports.grantUserDetailAccess = async (req, res) => {
    try {
        const adminId = req.user.id; // Assume admin is authenticated
        const { recruiterId, accessCount, permanentAccess } = req.body;

        // Validate input
        if (!recruiterId) {
            return res.status(400).json({
                success: false,
                message: "Recruiter ID is required",
            });
        }

        // Verify admin role
        const admin = await Admin.findById(adminId);
        if (!admin || admin.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Unauthorized: Only admins can grant access",
            });
        }

        // Find recruiter
        const recruiter = await Recruiter.findById(recruiterId);
        if (!recruiter) {
            return res.status(404).json({
                success: false,
                message: "Recruiter not found",
            });
        }

        // Grant access based on provided parameters
        recruiter.userDetailAccessCount = accessCount || 0; // Custom number of users to view
        recruiter.permanentAccess = permanentAccess || false; // Full access toggle

        await recruiter.save();

        return res.status(200).json({
            success: true,
            message: `Access updated: ${permanentAccess ? "Full access granted" : `${accessCount} user details allowed`}`,
            recruiter,
        });

    } catch (error) {
        console.error("Error granting user detail access:", error);
        return res.status(500).json({
            success: false,
            message: "Error while granting access. Please try again.",
        });
    }
};

exports.logoutAdmin = async (req, res) => {
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