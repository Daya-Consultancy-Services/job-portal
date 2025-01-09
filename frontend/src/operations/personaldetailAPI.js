import { toast } from 'react-hot-toast'

import { setLoading, setToken } from '../slices/userProfileSlice'
import { setUser } from '../slices/userProfileSlice'
import { apiConnector } from '../services/apiConnector'
import { personalDetail } from './apis'
import { logout } from './userAPI'

const {

    createPersonaldetail,
    updatePersonaldetail,
    deletePersonaldetail

} = personalDetail


export function personalDetails(
    token,
    gender,
    dateOfBirth,
    martialStatus,
    permanentAddress,
    pincode,
    language,
    address
){
   
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", createPersonaldetail, {
                gender,
                dateOfBirth,
                martialStatus,
                permanentAddress,
                pincode,
                language,
                address
            }, {   Authorization: `Bearer ${token}` } );

            console.log("Created PersonalDetail Successfully !!!", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success("PersonalDetail Created Successfully!!!");
        } catch (error) {
            console.error("Error creating personal detail:", error);
            toast.error("Failed to create personal detail. Please try again.");
        } finally {
            toast.dismiss(toastId);
            dispatch(setLoading(false));
        }
    };
}

// update personal details 
export function updatePersonaldetails(token, personalDetailsData){
    return async(dispatch) => {
     
        const toastId = toast.loading("Loading....")
        dispatch(setLoading(true));
    try {

        const response = await apiConnector("PUT",updatePersonaldetail, 
          personalDetailsData,{
            Authorization: `Bearer ${token}`,
        })
        console.log("Updated Personal Details API Response............", response);

        if(!response.data.success){
            throw new Error(response.data.message);
        }
        dispatch(setUser({...response.data.personalDetails}))
        toast.success("PersonalDetail is updated Successfully")

    } catch (error) {
        console.log("UPDATE PERSONALUPDATE API ERROR............", error)
        toast.error("Could Not Update PersonalDetail")
    }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }

}

//delete personal details
export function deletePersonaldetails(token,navigate){
    return async(dispatch) => {
        const toastId = toast.loading("Loading....")
        dispatch(setLoading(true))
    try {
        const response = await apiConnector("PUT", deletePersonaldetail, null, {
            Authorization: `Bearer ${token}`,
        });
        console.log("DELETE_PersonalDetail_API API RESPONSE............", response);

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        toast.success("PersonalDetail deleted Successfully!");
        // dispatch(logout(navigate));

    } catch (error) {
        console.error("DeletePersonalDetail_API error:", error);
        toast.error("Could not delete PersonalDetail.");
    }
    finally{
        toast.dismiss(toastId);
        dispatch(setLoading(false));
    }
    
    }
}