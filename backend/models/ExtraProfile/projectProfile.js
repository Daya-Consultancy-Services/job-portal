const mongoose = require("mongoose")

const projectSchema = new mongoose.Schema({
    projectTitle:{
        type:String
    },
    projectLink:{
        type:String
    },
    projectDescription:{
        type:String
    },
    projectSkills:{
        type:String
    }
    

})

module.exports = mongoose.model("projectSchema",projectSchema)