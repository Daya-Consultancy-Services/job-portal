const mongoose = require("mongoose")

const educationSchema = new mongoose.Schema({
    // educationName:{
    //     type:String
    // },
    institutionName:{
        type:String
    },
    courseName:{
        type:String
    },
    courseType:{
        type:String
    },
    duration:{
        type:String
    },
    marks:{
        type:String
    },
    location:{
        type:String
    },
    education: {
        type:String,
        // enum:["10th","12th","Graduation","Post-graduation","PHD"], 
    },
})

module.exports = mongoose.model("educationSchema",educationSchema)