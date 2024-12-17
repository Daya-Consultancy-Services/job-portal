const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    contactNumber:{
        type:Number,
    },
    role: {  // Add this to the schema
        type: String,
        enum: ["jobseeker", "company", "admin"],  // Enums will limit the possible roles
        required: true,
    },
    token:{
        type:String
    },
    detail:{
        type:String
    },
    image:{
        type:String
    }
})

module.exports = mongoose.model("Admin",adminSchema)