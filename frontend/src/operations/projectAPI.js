import { toast } from 'react-hot-toast'

import { setLoading, setToken, setProject } from '../slices/userProfileSlice'
import { setUser } from '../slices/userProfileSlice'
import { apiConnector } from '../services/apiConnector'
import { projectProfile } from './apis'
import { logout } from './userAPI'

const {

    createProject,
    updateProject,
    deleteProject,
    getProject

} = projectProfile

export function createProjects(
    token,
    // projectTitle,
    // projectLink,
    // projectDescription,
    // projectSkills
    fordata
){
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST",createProject,fordata,
            {
                Authorization: `Bearer ${token}`
            })

            console.log("Created ProjectProfile Successfully !!!", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success("ProjectProfile Created Successfully!!!!!!!!");
            dispatch(fetchProject(token));
        } catch (error) {
            console.error("Error Creating ProjectProfile:", error);
            toast.error(error.response?.data?.message)
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
            dispatch(fetchProject(token));
            toast.success("ProjectProfile is updated Successfully")
        } catch (error) {
            console.log("UPDATE ProjectProfile API ERROR............", error)
            toast.error(error.response?.data?.message)
        } finally{
            toast.dismiss(toastId);
            dispatch(setLoading(false));
        }
    }
}

export function deleteProjects(token,projectId){
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
            dispatch(fetchProject(token));
            toast.success("Project deleted Successfully!");
        } catch (error) {
            console.error("ProjectProfile_delete_API error:", error);
            toast.error(error.response?.data?.message);
        } finally{
            toast.dismiss(toastId);
            dispatch(setLoading(false));
        }
    }
}

export function fetchProject(token) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("GET", getProject, null, {
                Authorization: `Bearer ${token}`,
            });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            dispatch(setProject(response.data.data))
            toast.success("Project fetched successfully");
        } catch (error) {
            console.error("Error fetching Project :", error);
            toast.error(error.response?.data?.message);
        } finally {
            dispatch(setLoading(false));
        }
    };
}