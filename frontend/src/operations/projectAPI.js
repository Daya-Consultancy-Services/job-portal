import { toast } from 'react-hot-toast'

import { setLoading, setToken } from '../slices/userProfileSlice'
import { setUser } from '../slices/userProfileSlice'
import { apiConnector } from '../services/apiConnector'
import { projectProfile } from './apis'
import { logout } from './userAPI'

const {

    createProject,
    updateProject,
    deleteProject

} = projectProfile

export function createProjects(
    token,
    projectTitle,
    projectLink,
    projectDescription,
    projectSkills
){
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST",createProject,{
                projectTitle,
                projectLink,
                projectDescription,
                projectSkills
            },{Authorization: `Bearer ${token}`})

            console.log("Created ProjectProfile Successfully !!!", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success("ProjectProfile Created Successfully!!!!!!!!");
        } catch (error) {
            console.error("Error Creating ProjectProfile:", error);
            toast.error("Failed to create ProjectProfile, Please try again.")
        } finally{
            toast.dismiss(toastId);
            dispatch(setLoading(false));
        }
    }
}

export function updateProjects(token,projectId,formdata){
    return async (dispatch) => {
        const toastId = toast.loading("Loading....")
        dispatch(setLoading(true));
        try {
            const updatedData = { ...formdata, projectId };
            const response = await apiConnector("PUT",updateProject,updatedData,
            {
                Authorization: `Bearer ${token}`,
            })
            console.log("Updated UpdateProject  API Response............", response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }
            dispatch(setUser({ ...response.data.projects }));
            toast.success("ProjectProfile is updated Successfully")
        } catch (error) {
            console.log("UPDATE ProjectProfile API ERROR............", error)
            toast.error("Could Not Update ProjectProfile")
        } finally{
            toast.dismiss(toastId);
            dispatch(setLoading(false));
        }
    }
}

export function deleteProject(token,projectId,navigate){
    return async (dispatch) => {
        const toastId = toast.loading("Loading....")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("DELETE", deleteProject, {projectId}, {
                Authorization: `Bearer ${token}`,
            });
            console.log("DELETE_ProjectProfile_API API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            
            toast.success("Project deleted Successfully!");
        } catch (error) {
            console.error("ProjectProfile_delete_API error:", error);
            toast.error("Could not delete Project.");
        } finally{
            toast.dismiss(toastId);
            dispatch(setLoading(false));
        }
    }
}