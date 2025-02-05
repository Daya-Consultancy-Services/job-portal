const mongoose = require("mongoose")


const jobSchema = new mongoose.Schema({
    companyId: {
        type:mongoose.Schema.ObjectId,
        ref:"Company"
    },
    recruiterId:{
        type:mongoose.Schema.ObjectId,
        ref:"Recruiter"
    },
    jobTitle: {
        type:String // for example web devloper 
    },
    description:{
        type:String  // about job
    },
    skillRequired: [
        {
            type:String, // for exapmle frontend-{html, react, css }
        }
    ],
    jobType: {
        type:String,
        enum:["WFH","WFO","Hybrid"] // full form WFH(work from home) WFO(Work from office) Hybrid(3 or 4 day office then leave)
    },
    salaryRange: {
        type: String  // 2 lakhs - 4 lakhs
    },
    jobLocation:{
        type:String,  // like pune or banglore
    },
    isClose:{
        type:Boolean,
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    appliedUsers: [  // Stores an array of User IDs who applied for the job
        {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        }
    ]

})

module.exports = mongoose.model("Jobs",jobSchema);