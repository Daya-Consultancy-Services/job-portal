const mongoose = require("mongoose")


const profileSchema = new mongoose.Schema({
    gender:{
        type:String
    },
    dateOfBirth:{
        type:String
    },
    about:{
        type:String,
       
    },
    location:{
        type:String
    },
    address:{
        type:String,
    },
    contactNumber:{
        type:Number,
       
    },
    education: {
        type:String,
        enum:["10th","12th","Graduation","Post-graduation","PHD"], // this also have to create a new things
        // required : true
    },
    empType:{
        type:String,
        enum:["Intership","Fulltime","Contract","Freelance"]  
    },
    skills:[
        {
            type:String
        }
    ], // think about the skill required for all the department of work
    image:{
        type:String // cloudinary image upload
    },
    links:{
        type:String // github link , portfolio link , linkedin profile link
    },
    // Resume section left file upload will be here
    certificate:{
        type:String // how to get the certificate in pdf or file format
    },
    resume:{
        type:String
    },
    resumeHeadline:{
        type:String
    },
    profileSummary:{
        type:String
    },
    empProfileSchema:{
        type:mongoose.Schema.ObjectId,
        ref:"empProfileSchema"
    }

})

module.exports = mongoose.model("Profile", profileSchema)