// const User = require("../models/User")
// const mailSender = require("../routes/mailSender")
// const bcrypt = require("bcrypt")
// const crypto = require("crypto")


// exports.resetPasswordToken = async (req, res) => {
//   try {
//     const email = req.body.email
//     const user = await User.findOne({ email: email })
//     if (!user) {
//       return res.json({
//         success: false,
//         message: `This Email: ${email} is not Registered With Us Enter a Valid Email `,
//       })
//     }
//     const token = crypto.randomBytes(20).toString("hex")

//     const updatedDetails = await User.findOneAndUpdate(
//       { email: email },
//       {
//         token: token,
//         resetPasswordExpires: Date.now() + 3600000,
//       },
//       { new: true }
//     )
//     console.log("DETAILS", updatedDetails)

//     const url = `http://localhost:3000/update-password/${token}`
//     // const url = `https://studynotion-edtech-project.vercel.app/update-password/${token}`

//     await mailSender(
//       email,
//       "Password Reset",
//       `Your Link for email verification is ${url}. Please click this url to reset your password.`
//     )

//     res.json({
//       success: true,
//       message:
//         "Email Sent Successfully, Please Check Your Email to Continue Further",
//     })
//   } catch (error) {
//     return res.json({
//       error: error.message,
//       success: false,
//       message: `Some Error in Sending the Reset Message`,
//     })
//   }
// }


// exports.resetPassword = async (req, res) => {
//   try {
//     const { password, confirmPassword, token } = req.body

//     if (confirmPassword !== password) {
//       return res.json({
//         success: false,
//         message: "Password and Confirm Password Does not Match",
//       })
//     }
//     const userDetails = await User.findOne({ token: token })
//     if (!userDetails) {
//       return res.json({
//         success: false,
//         message: "Token is Invalid",
//       })
//     }
//     if (!(userDetails.resetPasswordExpires > Date.now())) {
//       return res.status(403).json({
//         success: false,
//         message: `Token is Expired, Please Regenerate Your Token`,
//       })
//     }
//     const encryptedPassword = await bcrypt.hash(password, 10)
//     await User.findOneAndUpdate(
//       { token: token },
//       { password: encryptedPassword },
//       { new: true }
//     )
//     res.json({
//       success: true,
//       message: `Password Reset Successful`,
//     })
//   } catch (error) {
//     return res.json({
//       error: error.message,
//       success: false,
//       message: `Some Error in Updating the Password`,
//     })
//   }
// }
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const mailSender = require("../routes/mailSender");
const Admin = require("../models/admin");
const Company = require("../models/company");
const User = require("../models/User");
const { passwordResetEmail } = require("../routes/passwordResetEmail")

exports.resetPasswordToken = async (req, res) => {
  try {
      const { email, role } = req.body;
      
      let userModel;
      if (role === "admin") {
          userModel = Admin;
      } else if (role === "company") {
          userModel = Company;
      } else if (role === "jobseeker") {
          userModel = User;
      } else {
          return res.json({ success: false, message: "Invalid role" });
      }

      const user = await userModel.findOne({ email });
      if (!user) {
          return res.json({ success: false, message: `This Email: ${email} is not registered with us. Enter a valid email.` });
      }

      const token = crypto.randomBytes(20).toString("hex");
      const updatedDetails = await userModel.findOneAndUpdate(
          { email },
          {
              token: token,
              resetPasswordExpires: Date.now() + 3600000,
          },
          { new: true }
      );
      console.log("DETAILS", updatedDetails);

      const url = `http://localhost:3000/update-password/${token}`;
      await mailSender(email, "Password Reset",  passwordResetEmail(email, url));

      res.json({ success: true, message: "Reset email sent successfully" });
  } catch (error) {
      res.json({ success: false, message: "Error sending reset email", error: error.message });
  }
};

exports.resetPassword = async (req, res) => {
    try {
        const { password, confirmPassword, token } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ success: false, message: "Passwords do not match" });
        }

        let user = await Admin.findOne({ token }) || await Company.findOne({ token }) || await User.findOne({ token });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid or expired token" });
        }

        if (user.resetPasswordExpires < Date.now()) {
            return res.status(403).json({ success: false, message: "Token expired, please request a new one" });
        }

        user.password = await bcrypt.hash(password, 10);
        user.token = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.json({ success: true, message: "Password reset successful" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error resetting password", error: error.message });
    }
};

