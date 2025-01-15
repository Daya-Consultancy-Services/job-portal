const mongoose = require("mongoose")


const profileSchema = new mongoose.Schema({
    about:{
        type:String,
    },
    contactNumber:{
        type:Number,
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
    location:{
        type:String
    },
    image:{
        type:String // cloudinary image upload
    },
    personalDetails:{
        type:mongoose.Schema.ObjectId,
        ref:"personalDetailSchema"
    },
    onlineProfiles:{
        type:mongoose.Schema.ObjectId,
        ref:"onlineProfileSchema"
    },
    certificates:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"certificateSchemas"
        }
    ],
    skillsProfile:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"skillSchema"
        }
    ],
    project:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"projectSchema"
        }
    ],
    careerProfile:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"careerProfileSchema"
        }
    ],
    educationProfile:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"educationSchema"
        }
    ],
    employProfile:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"empProfileSchema"
        }
    ]
 
})

module.exports = mongoose.model("Profile", profileSchema)