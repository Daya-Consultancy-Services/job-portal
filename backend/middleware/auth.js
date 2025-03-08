const jwt = require("jsonwebtoken")
require("dotenv").config();
const User = require("../models/User");
const Company = require("../models/company")
const Admin = require("../models/admin")
const Recruiter = require("../models/recruiter")

exports.auth = async(req,res,next) => {
    try {
        //extraction of token 
        const token = req.cookies.token  // inside cookie
                    || req.body.token    // inside body
                    || req.header("Authorization").replace("Bearer ", "");
             
     
        
        if(!token){   // if there is no token
            return res.status(401).json({
                success:false,
                message:"Token Not Found",
            })
        }

        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);    // token verification
            
            let roleData;

            switch (decode.role) {
                case "jobseeker":
                    roleData = await User.findById(decode.id);
                    break;
                case "company":
                    roleData = await Company.findById(decode.id);
                    break;
                case "admin":
                    roleData = await Admin.findById(decode.id);
                    break;
                case "recruiter":
                    roleData = await Recruiter.findById(decode.id);
                    break;
                default:
                    return res.status(401).json({
                        success: false,
                        message: "Invalid role in token.",
                    });
            }
            if (!roleData) {
                return res.status(404).json({
                    success: false,
                    message: "User does not exist.",
                });
            }
            req.user = decode;
            req.roleData = roleData;

            console.log(decode)

        }
        catch(err) {
            //verification - issue
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }
        next();
                    
    } catch (error) {
        return res.status(401).json({
            success:false,
            message:'Something went wrong while validating the token',
        });
    }
}

// Middleware to Check if User is Blocked
exports.checkBlocked = async (req, res, next) => {
    if (req.roleData.isBlocked) {
        return res.status(403).json({
            success: false,
            message: "Access denied. Your account has been blocked.",
        });
    }
    next();
};

//isjobseeker
exports.isJobseeker = async (req, res, next) => {
    try{
           if(req.user.role !== "jobseeker") {               // to check if the user is jobseeker Role or not in User Schema
               return res.status(401).json({
                   success:false,
                   message:'This is a protected route for jobseeker only',
               });
           }
           next(); // go to next one to check
    }
    catch(error) {
        console.log(error)
       return res.status(500).json({
           success:false,
           message:'jobseeker role cannot be verified, please try again'
       })
    }
}


exports.isCompany = async (req, res, next) => {
    try{
           if(req.user.role !== "company") {                   // to check if the user is company Role or not in User Schema
               return res.status(401).json({
                   success:false,
                   message:'This is a protected route for company only',
               });
           }
           next();  // go to next one to check
    }
    catch(error) {
       return res.status(500).json({
           success:false,
           message:'company role cannot be verified, please try again'
       })
    }
}

//isRecruiter
exports.isRecruiter = async (req, res, next) => {
    try{
           if(req.user.role !== "recruiter") {                   // to check if the user is recruiter Role or not in User Schema
               return res.status(401).json({
                   success:false,
                   message:'This is a protected route for recruiter only',
               });
           }
           next();  // go to next one to check
    }
    catch(error) {
       return res.status(500).json({
           success:false,
           message:'recruiter role cannot be verified, please try again'
       })
    }
}

//isAdmin
exports.isAdmin = async (req, res, next) => {
    try{    
           if(req.user.role !== "admin") {                      // to check if the Admin is jobseeker Role or not in User Schema
               return res.status(401).json({
                   success:false,
                   message:'This is a protected route for Admin only',
               });
           }
           next();  // go to next one to check
    }
    catch(error) {
       return res.status(500).json({
           success:false,
           message:'User role cannot be verified, please try again'
       })
    }
}