    const mongoose = require("mongoose")

    const personalDetailSchema = new mongoose.Schema({
        gender:{
            type:String
        },
        dateOfBirth:{
            type:String
        },
        martialStatus:{
            type:String
        },
        permanentAddress:{
            type:String
        },
        pincode:{
            type:Number
        },
        language:[
        {
                type:String
        }
        ],
        address:{
            type:String,
        }

    })

    module.exports = mongoose.model("personalDetailSchema",personalDetailSchema)