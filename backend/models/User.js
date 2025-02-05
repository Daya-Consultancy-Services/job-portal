const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName : {
        type:String,
        required:true,
        trim:true
    },
    lastName : {
        type:String,
        required:true,
        trim:true
    },
    email : {
        type:String,
        required:true,
    },
    password : {
        type:String,
        required:true,
    },
    active : {
			type: Boolean,
			default: true,
	},
    role: {  // Add this to the schema
        type: String,
        enum: ["jobseeker", "company", "admin","recruiter"],  // Enums will limit the possible roles
        required: true,
    },
    workstatus: {
        type:String,
        enum:["Fresher","Experience"], // essential when going inside to registration 
        // required:true
    },
    profile : {
        type:mongoose.Schema.ObjectId,
        required:true,
        ref: "Profile"
    },
    token:{
        type:String,
    },
    appliedJobs: [  // Stores an array of Job IDs the user has applied to
        {
            type: mongoose.Schema.ObjectId,
            ref: "Jobs"
        }
    ]

})

module.exports = mongoose.model("User",userSchema);