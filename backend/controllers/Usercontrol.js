const User = require("../models/User")
const Profile = require("../models/Profile")
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.signup = async (req,res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            role
        } = req.body

    // validate if those field is filled or not
    if(
        !firstName ||
        !lastName ||
        !email ||
        !password ||
        !role
    )
        {
            return res.status(403).json({
                success:false,
                message:"All field are required too be filled"
            });
        }
    

    // check if user is exist with the help of email form body and calling the database to verify
    const existUser = await User.findOne({email});
    if(existUser){
        return res.status(400).json({
            success:false,
            message:"User already Exist"
        })
    }

    const hashedPassword = await bcrypt.hash(password,10);  //hashing the password 

    // some profile Detail are save and can be edited in profile controler
    const profileDetail = await Profile.create({
        gender:null,
        dateOfBirth:null,
        contactNumber:null,
        workstatus:null,
    });

    //Create a database entry for the user 
    const user = await User.create({
        firstName,
        lastName,
        email,
        role,
        password:hashedPassword,
        profile:profileDetail._id
    });
    
    return res.status(200).json({
        success:true,
        message:"User Register Successfully",
        user,
    })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User can't register, Try again"
        });
    }
}

exports.login = async (req,res) => {
    try {
        const {email,password} = req.body  // email and password from the request body

        // check weather email and password is entered or not
        if(!email || !password){
           return res.status(400).json({
                success:false,
                message:"All field are required for login"
            })
        }

        // check weather user exist of not 
        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not register, try register"
            })
        }

        //matching password
        if(await bcrypt.compare(password,user.password)){
            //creating JWT Token
            const token = jwt.sign(
                {
                    email:user.email,
                    id:user.id,
                    role:user.role
                },
                process.env.JWT_SECRET,
                {
                    expiresIn:"24h",
                }
            );
            user.token = token
            // removing password from the user object before response
            user.password = undefined;

            //create cookie
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),  // Expires in 3 days
                httpOnly: true,                                           // Ensures the cookie is not accessible via JavaScript
            };

            // sending the response with token and user data
            return res.cookie("token",token,options).status(200).json({
                success:true,
                message:`Login successful. Welcome, ${user.firstName} ${user.lastName} !`,
                token,
                user
            })

        }
        else{
            return res.status(401).json({
                success:false,
                message:"Password is Incorrect",
            });
        }      
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Login Failed , Try again"
        })
        
    }
} 


exports.updateDetail = async(req,res) => {
    
    try {
        const {
            firstName,
            lastName,
            email,
            // password  // have to remove this 
        } = req.body

        // get the user Id from the request body
        const userID = req.user.id
        
        if (!userID) {
            return res.status(400).json({
                success: false,
                message: "User is required",
            });
        }
        

        if(!firstName || !lastName || !email  )   // || !password
        {
            return res.status(400).json({
                success:false,
                message:"All field are Required"
            });
        }

        // find the user 
        // const user = await User.findById(req.user.id);
        const userDetail = await User.findByIdAndUpdate(
            req.user.id,
            { 
                firstName: firstName,
                lastName : lastName,
                email:email
            },
            { new: true }
        )
        // console.log(userDetail)

        // by the refrence id we can make changes to the firstname , lastname , email to the user table
        // user.firstName = firstName;
        // user.lastName = lastName;
        // user.email = email;
        
        // Hash the new password before saving
        // const hashedPassword = await bcrypt.hash(password, 10);  // not good for the security reason
        // user.password = hashedPassword;
 
        // Save the updated user to the database
        

 
        // Respond with a success message and the new token
        return res.status(200).json({
             success: true,
             message: "User details updated successfully!",
             userDetail
        });   
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Error while updating User data !!",
        })
        
    }
}

exports.deleteUser = async(req,res) => {
    try {
        // find the Id the user
        const userid = req.user.id

        //valid if the user exist or not
        const user = await User.findById(userid)
        
        if(!user){   // check is user is there to delete
            return res.status(404).json({
                success:false,
                message:"User Doesn't exit"
            });
        }

        // check if the user profile is there or not and if its null it will show it
        if (!user.profile) {
            return res.status(401).json({
                success:false,
                message:"User Profile can't be found"
            });
        }
        
        // from the refrence of user schema the profile will be also deleted from the data base
        await Profile.findByIdAndDelete(user.profile);
       

        // now delete the user
        await User.findByIdAndDelete(userid);


        return res.status(200).json({
            success:true,
            message:"User Deleted Successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error while Deleting User Account"
        })
    }
}

exports.getalldetail = async(req,res) => {
    try {
        const id = req.user.id

        const userDetail = await User.findById(id).populate();
        if(!userDetail){
            return res.status(400).json({
                success:false,
                message:"User Details cannot be found"
            });
        }

        return res.status(200).json({
            success:true,
            message:"All the user details",
            userDetail
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error while getting User detail"
        })
    }
}