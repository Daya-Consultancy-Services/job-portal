import { toast } from 'react-hot-toast'

import { setLoading, setToken, setEmpProfile } from '../slices/userProfileSlice'
import { setUser } from '../slices/userProfileSlice'
import { apiConnector } from '../services/apiConnector'
import { employmentprofile } from './apis'
import { logout } from './userAPI'

const {

    createEmploymentProfile,
    updateEmploymentProfile,
    deleteEmploymentProfile,
    getEmploymentProfile

} = employmentprofile

export function createEmploymentProfiles (
    token,
    // isCurrentEmp,
    // empType,
    // totalExp,
    // currentJobTitle,
    // joinDate,
    // leaveDate,
    // currentSalary,
    // skill,
    // jobProfile,
    // noticePeriod,
    // jobDescription
    formdata
){
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST",createEmploymentProfile,formdata,
            {
                Authorization: `Bearer ${token}`
            });
            console.log("Created EmploymentProfile Successfully !!!", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            //EmploymentProfile
            toast.success("EmploymentProfile Created Successfully!!!!!!!!");
            dispatch(fetchEmploymentProfile(token))
        } catch (error) {
            console.error("Error Creating EmploymentProfile:", error);
            toast.error("Failed to create EmploymentProfile, Please try again.");
        } finally {
            toast.dismiss(toastId);
            dispatch(setLoading(false));
        }
    }
}

export function updateEmploymentProfiles(token,empId,formdata){
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
        
           
            toast.success("EmploymentProfile is updated Successfully")
            dispatch(fetchEmploymentProfile(token))
        } catch (error) {
            console.log("UPDATE EmploymentProfile API ERROR............", error)
            toast.error("Could Not Update EmploymentProfile")
        } finally{
            toast.dismiss(toastId);
            dispatch(setLoading(false));
        }
    }
}

export function deleteEmploymentProfiles(token,empId){
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
            
            dispatch(fetchEmploymentProfile(token))
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

export function fetchEmploymentProfile(token) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("GET", getEmploymentProfile, null, {
                Authorization: `Bearer ${token}`,
            });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            dispatch(setEmpProfile(response.data.data));

            // toast.success("EmploymentProfile fetched successfully");
        } catch (error) {
            console.error("Error fetching EmploymentProfile:", error);
            toast.error("Failed to fetch EmploymentProfile");
        } finally {
            dispatch(setLoading(false));
        }
    };
}