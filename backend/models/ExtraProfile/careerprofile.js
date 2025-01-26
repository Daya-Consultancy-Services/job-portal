const mongoose = require("mongoose")

const careerProfileSchema = new mongoose.Schema({
    industryType:{
        type:String
    },
    department:{
        type:String
    },
    empType:{
        type:String,
        // enum:["Fulltime","Internship","Contract","Freelance"]
    },
    skills:{
        type:String
    },
    jobLocation:{
        type:String
    },
    salary:{
        type:String
    }
})

module.exports = mongoose.model("careerProfileSchema",careerProfileSchema)