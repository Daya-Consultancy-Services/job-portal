const User = require("../models/User")
const Profile = require("../models/Profile")
const personalDetail = require("../models/ExtraProfile/personalDetail");
require("dotenv").config();


exports.createPersonalDetail = async (req,res)