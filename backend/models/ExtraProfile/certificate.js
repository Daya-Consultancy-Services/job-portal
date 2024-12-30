const mongoose = require("mongoose")

const certificateSchema = new mongoose.Schema({
    certificateName:{
        type:String
    },
    certificateLink:{
        type:String
    },
    certificateDescription:{
        type:String
    }
})

module.exports = mongoose.model("certificateSchema",certificateSchema)