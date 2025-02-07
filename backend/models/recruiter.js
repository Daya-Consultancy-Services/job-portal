const mongoose = require("mongoose")

const recruiterSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
       
    },
    email:{
        type:String,
        trim:true,
        
    },
    password:{
        type:String
    },
    contactNumber:{
        type:Number,
        trim:true,
        
    },
    image:{
        type:String
    },
    companyId:{
        type:mongoose.Schema.ObjectId,
        ref:"Company"
    },
    role:{
        type:String,
        enum: ["jobseeker", "company", "admin", "recruiter"],
        require:true
    },
    job:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"Jobs"
        }
    ],
    description:{
        type:String
    },
    token:{
        type:String,
    },
    //  New Fields for Admin Control
    userDetailAccessCount: 
    { 
        type: Number, 
        default: 0 
    }, // Custom number of user details they can see
    permanentAccess: 
    { 
        type: Boolean, 
        default: false 
    },  // If true, recruiter has unlimited access
})

module.exports = mongoose.model("Recruiter",recruiterSchema);