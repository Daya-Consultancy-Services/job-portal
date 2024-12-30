const mongoose = require("mongoose")

const skillSchema = new mongoose.Schema({
    skillName:{
        type:String
    },
    experience:{
        type:String
    }
})

module.exports = mongoose.model("skillSchema", skillSchema)