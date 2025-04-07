const jwt = require("jsonwebtoken")
require("dotenv").config();
const User = require("../models/User");
const Company = require("../models/company")
const Admin = require("../models/admin")
const Recruiter = require("../models/recruiter")

exports.auth = async(req,res,next) => {
    try {
        const token = req.cookies.token  
                    || req.body.token  
                    || req.header("Authorization").replace("Bearer ", "");
             
     
        
        if(!token){   
            return res.status(401).json({
                success:false,
                message:"Token Not Found",
            })
        }

        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);    
            
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

exports.checkBlocked = async (req, res, next) => {
    if (req.roleData.isBlocked) {
        return res.status(403).json({
            success: false,
            message: "Access denied. Your account has been blocked.",
        });
    }
    next();
};

exports.isJobseeker = async (req, res, next) => {
    try{
           if(req.user.role !== "jobseeker") {              
               return res.status(401).json({
                   success:false,
                   message:'This is a protected route for jobseeker only',
               });
           }
           next(); 
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
           if(req.user.role !== "company") {                   
               return res.status(401).json({
                   success:false,
                   message:'This is a protected route for company only',
               });
           }
           next();  
    }
    catch(error) {
       return res.status(500).json({
           success:false,
           message:'company role cannot be verified, please try again'
       })
    }
}

exports.isRecruiter = async (req, res, next) => {
    try{
           if(req.user.role !== "recruiter") {                   
               return res.status(401).json({
                   success:false,
                   message:'This is a protected route for recruiter only',
               });
           }
           next(); 
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
           if(req.user.role !== "admin") {                      
               return res.status(401).json({
                   success:false,
                   message:'This is a protected route for Admin only',
               });
           }
           next();  
    }
    catch(error) {
       return res.status(500).json({
           success:false,
           message:'User role cannot be verified, please try again'
       })
    }
}