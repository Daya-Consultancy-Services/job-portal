const mongoose = require("mongoose")

const empProfileSchema = new mongoose.Schema({
    isCurrentEmp:{
        type:Boolean
    },
    empType:{
        type:String,
        // enum:["Internship","Fulltime","Contract","Freelance"]  
    },
    totalExp:{
        type:String
    },
    currentJobTitle:{
        type:String
    },
    joinDate:{
        type:String
    },
    leaveDate:{
        type:String
    },
    currentSalary:{
        type:String
    },
    skill:{
        type:String
    },
    jobProfile:{
        type:String
    },
    noticePeriod:{
        type:String
    },
    jobDescription:{
        type:String
    }
})

module.exports = mongoose.model("empProfileSchema",empProfileSchema)