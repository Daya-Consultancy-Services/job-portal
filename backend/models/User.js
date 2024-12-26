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
        enum: ["jobseeker", "company", "admin"],  // Enums will limit the possible roles
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
    }

})

module.exports = mongoose.model("User",userSchema);