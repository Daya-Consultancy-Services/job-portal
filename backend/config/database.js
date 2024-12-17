const mongoose = require("mongoose")
require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL,{
        // useNewUrlParser:true,
        // useUnifiedTopology:true
    }).then(()=>console.log("Connection Establish Successfully"))
    .catch((error)=>{
        console.log("Error while Establish Connecting With DB");
        console.log(error);
        process.exit(1);
    })
};