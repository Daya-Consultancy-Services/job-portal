const mongoose = require("mongoose")

const empProfileSchema = new mongoose.Schema({
    isCurrentEmp:{
        type:Boolean
    },
    empType:{
        type:String,
        enum:["Fulltime","Internship"]
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
    currentSalary:{
        type:String
    },
    skill:[
        {
            type:String
        }
    ],
    jobProfile:{
        type:String
    },
    noticePeriod:{
        type:String
    }
})

module.exports = mongoose.model("empProfileSchema",empProfileSchema)