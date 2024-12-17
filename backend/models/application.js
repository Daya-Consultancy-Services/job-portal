const mongoose = require("mongoose")

const applicationSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
    companyId:{
        type:mongoose.Schema.ObjectId,
        ref:"Company"
    },
    status:{
        type:String,
        enum:["pending","selected","rejected"]
    },
    appliedDate: {
        type:String,
    },
    createdAt:{
        type:Date,
    },
})

module.exports = mongoose.Model("Application",applicationSchema);