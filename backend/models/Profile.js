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
    workstatus: {
        type:String,
        enum:["Fresher","Experience"], // essential when going inside to registration 
        // required:true
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

        // project link is also remaining
    },
    // Resume section left file upload will be here
    certificate:{
        type:String // how to get the certificate in pdf or file format
    },
    coverletter:{
        type:String
    }

})

module.exports = mongoose.model("Profile", profileSchema)