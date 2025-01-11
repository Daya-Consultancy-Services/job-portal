const User = require("../models/User")
const Profile = require("../models/Profile")
const project = require("../models/ExtraProfile/projectProfile");
require("dotenv").config();


exports.createProject = async (req , res) => {
    try {
        const {

            projectTitle,
            projectLink,
            projectDescription,
            projectSkills

        } = req.body
        if(
            !projectTitle ||
            !projectLink || 
            !projectDescription ||
            !projectSkills
        ){
            return res.status(403).json({
                success:false,
                message:"All field are required too be filled"
            });
        }
        const Id = req.user.id

        const user = await User.findById(Id)

        const profile = await Profile.findById(user.profile)
        
        if(!profile){
            return res.status(400).json({
                success:false,
                message:"Profile don't Exist"
            })
        }
        
        const projects = await project.create({
            projectTitle,
            projectLink,
            projectDescription,
            projectSkills
        })

        profile.project.push(projects.id);
        await profile.save();

        return res.status(200).json({
            success:true,
            message:"ProjectProfile Created Successfully",
            data:projects,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"ProjectProfile can't register, Try again"
        });
    }
}

exports.updateProject = async (req , res) => {
    try {
        const {

            projectId,
            projectTitle,
            projectLink,
            projectDescription,
            projectSkills

        } = req.body
        if(
            !projectId    ||
            !projectTitle ||
            !projectLink  ||
            !projectDescription  ||
            !projectSkills
        ){
            return res.status(403).json({
                success:false,
                message:"All field are required too be filled"
            });
        }
        const Id = req.user.id
        const userId = await User.findById(Id);

        const profileId = await Profile.findById(userId.profile)
        if(!profileId){
            return res.status(400).json({
                success:false,
                message:"Profile don't Exist"
            })
        }
        const projects = await project.findByIdAndUpdate(
            projectId,
            {
                projectTitle : projectTitle,
                projectLink  : projectLink,
                projectDescription : projectDescription,
                projectSkills : projectSkills
            },
            {new:true}
        )
        await projects.save();

        return res.status(200).json({
            success:true,
            message:"Projects Updated Successfully !!",
            projects,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Error while updating PRojects"
        })
    }
}

exports.deleteProject = async (req , res) => {
    try {
        const { projectId } = req.body;
        const Id = req.user.id
        
        const userId = await User.findById(Id)
        const profileId = await Profile.findById(userId.profile)

       
        if(!profileId){
            return res.status(400).json({
                success:false,
                message:"Profile don't Exist"
            })
        }

        profileId.project = profileId.project.filter(
            (id) => id.toString() !== projectId
        );

        await profileId.save();

        await project.findByIdAndDelete(projectId);

        return res.status(200).json({
            success:true,
            message:"Delete Project Successfully !!"
        })

    } catch (error) {
        console.log(error)
            return res.status(500).json({
                success:false,
                message:"Error while Deleting Projects"
            })
    }
}