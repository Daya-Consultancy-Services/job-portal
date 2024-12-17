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
    profile : {
        type:mongoose.Schema.ObjectId,
        required:true,
        ref: "Profile"
    },
    image: {
        type:String,
        // required:true
    },
    token:{
        type:String,
    }

})

module.exports = mongoose.model("User",userSchema);