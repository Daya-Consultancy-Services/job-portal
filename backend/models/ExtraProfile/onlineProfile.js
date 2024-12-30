const mongoose = require("mongoose")

const onlineProfileSchema = new mongoose.Schema({
    instagramLink:{
        type:String
    },
    facebookLink:{
        type:String
    },
    githubLink:{
        type:String
    },
    linkedinLink:{
        type:String
    },
})

module.exports = mongoose.model("onlineProfileSchema",onlineProfileSchema)