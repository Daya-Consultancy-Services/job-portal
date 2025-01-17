import { toast } from 'react-hot-toast'

import { setLoading, setToken } from '../slices/userProfileSlice'
import { setUser } from '../slices/userProfileSlice'
import { apiConnector } from '../services/apiConnector'
import { employmentprofile } from './apis'
import { logout } from './userAPI'

const {

    createEmploymentProfile,
    updateEmploymentProfile,
    deleteEmploymentProfile

} = employmentprofile

export function createEducationProfiles (
    token,
    isCurrentEmp,
    empType,
    totalExp,
    currentJobTitle,
    joinDate,
    leaveDate,
    currentSalary,
    skill,
    jobProfile,
    noticePeriod,
    jobDescription
){
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST",createEmploymentProfile,{
                isCurrentEmp,
                empType,
                totalExp,
                currentJobTitle,
                joinDate,
                leaveDate,
                currentSalary,
                skill,
                jobProfile,
                noticePeriod,
                jobDescription
            },{Authorization: `Bearer ${token}`});
            console.log("Created EmploymentProfile Successfully !!!", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            //EmploymentProfile
            toast.success("EmploymentProfile Created Successfully!!!!!!!!");

        } catch (error) {
            console.error("Error Creating EmploymentProfile:", error);
            toast.error("Failed to create EmploymentProfile, Please try again.");
        } finally {
            toast.dismiss(toastId);
            dispatch(setLoading(false));
        }
    }
}

export function updateEducationProfiles(token,empId,formdata){
    return async (dispatch) => {
        const toastId = toast.loading("Loading....")
        dispatch(setLoading(true));
        try {
            const updatedData = { ...formdata, empId };
            const response = await apiConnector("PUT",updateEmploymentProfile,updatedData,
            {
                  Authorization: `Bearer ${token}`,
            })
            console.log("Updated EmploymentProfile  API Response............", response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }
        
            dispatch(setUser({ ...response.data.employprofile }));
            toast.success("EmploymentProfile is updated Successfully")

        } catch (error) {
            console.log("UPDATE EmploymentProfile API ERROR............", error)
            toast.error("Could Not Update EmploymentProfile")
        } finally{
            toast.dismiss(toastId);
            dispatch(setLoading(false));
        }
    }
}

export function deleteEducationProfiles(token,empId,navigate){
    return async (dispatch) => {
        const toastId = toast.loading("Loading....")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("DELETE", deleteEmploymentProfile, {empId}, {
                Authorization: `Bearer ${token}`,
            });

            console.log("DELETE_EmploymentProfile_API API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            
            toast.success("EmploymentProfile deleted Successfully!");

        } catch (error) {
            console.error("EmploymentProfile_API error:", error);
            toast.error("Could not delete EmploymentProfile.");
        } finally{
            toast.dismiss(toastId);
            dispatch(setLoading(false));
        }
    }
}