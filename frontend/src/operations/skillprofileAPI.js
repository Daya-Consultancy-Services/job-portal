import { toast } from 'react-hot-toast'

import { setLoading, setToken } from '../slices/userProfileSlice'
import { setUser } from '../slices/userProfileSlice'
import { apiConnector } from '../services/apiConnector'
import { skillprofile } from './apis'
import { logout } from './userAPI'

const {

    createSkillProfile,
    updateSkillProfile,
    deleteSkillProfile

} = skillprofile

export function createSkillProfiles(
    token,
    skillName,
    experience
){
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST",createSkillProfile,{
                skillName,
                experience
            },{Authorization: `Bearer ${token}`})

            console.log("Created SkillProfile Successfully !!!", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("SkillProfile Created Successfully!!!!!!!!");
        } catch (error) {
            console.error("Error Creating SkillProfile:", error);
            toast.error("Failed to create SkillProfile, Please try again.");
        } finally{
            toast.dismiss(toastId);
            dispatch(setLoading(false));
        }
    }
}

export function updateSkillProfiles(token,skillProfileId,formdata){
    return async (dispatch) => {
        const toastId = toast.loading("Loading....")
        dispatch(setLoading(true));
        try {

            const updatedData = { ...formdata, skillProfileId };
            const response = await apiConnector("PUT",updateSkillProfile,updatedData,
            {
                Authorization: `Bearer ${token}`,
            });
            console.log("Updated SkillProfile API Response............", response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            dispatch(setUser({ ...response.data.skillProfiles }));
            toast.success("SkillProfile is Updated Successfully")

        } catch (error) {
            console.log("UPDATE Certificate API ERROR............", error)
            toast.error("Could Not Update Certificate")
        } finally{
            toast.dismiss(toastId);
            dispatch(setLoading(false));
        }
    }
}

export function deleteSkillProfiles(token,skillProfileId,navigate){
    return async (dispatch) => {
        const toastId = toast.loading("Loading....")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("DELETE",deleteSkillProfile,{skillProfileId},{
                Authorization: `Bearer ${token}`,
            })

            console.log("DELETE_SkillProfile_API API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            
            toast.success("SkillsProfile deleted Successfully!");



        } catch (error) {
            console.error("Certificate_API error:", error);
            toast.error("Could not delete Certificate.");
        } finally{
            toast.dismiss(toastId);
            dispatch(setLoading(false));
        }
    }
}