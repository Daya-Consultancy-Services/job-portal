const express = require("express");
const app = express();


// all routes from router
const userRoute = require("./routes/UserRoutes")
const profileRoute = require("./routes/ProfileRoutes")
const companyRoute = require("./routes/CompanyRoutes")
const recruiterRoute = require("./routes/RecruiterRoutes");
const fileUpload = require("express-fileupload")

// database fetch
const database = require("./config/database")
database.connect(); // database connect

const cookieParser = require("cookie-parser") // cookie parse

const cors =  require('cors')  // cors middleware interaction

const dotenv = require("dotenv")
dotenv.config();

const PORT = process.env.PORT || 5000 ;
app.use(express.json())
app.use(cookieParser())

app.use("/api/v1/profile/upload-image",fileUpload({
    useTempFiles: true,
}))
app.use("/api/v1/upload-logo",fileUpload({
    useTempFile: true,
}))
app.use(
    cors({
        origin:"http://localhost:3000",
        credentials:true,
    })
)

// routes define
app.use("/api/v1/user", userRoute);
app.use("/api/v1/profile", profileRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/recruiter", recruiterRoute);




app.use("/", (req,res) =>{
    return res.json({
        success:true,
        message:'Your server is up and Running'
    });
});

app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`)
});