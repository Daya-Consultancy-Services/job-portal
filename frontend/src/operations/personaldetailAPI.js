import { toast } from 'react-hot-toast'

import { setLoading, setPersonalDetails, setToken } from '../slices/userProfileSlice'
import { setUser } from '../slices/userProfileSlice'
import { apiConnector } from '../services/apiConnector'
import { personalDetail } from './apis'
import { logout } from './userAPI'

const {

    createPersonaldetail,
    updatePersonaldetail,
    deletePersonaldetail,
    getPersonalDetail

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
            dispatch(fetchPersonalDetails(token))
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
        // dispatch(setUser({...response.data.personalDetails}))
        dispatch(fetchPersonalDetails(token));
        toast.success("PersonalDetail is updated Successfully")

    } catch (error) {
        console.log("UPDATE PERSONALUPDATE API ERROR............", error) 
        toast.error("Could Not Update PersonalDetail")
    } finally{
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
  
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
        dispatch(fetchPersonalDetails(token))

    } catch (error) {
        console.error("DeletePersonalDetail_API error:", error);
        toast.error("Could not delete PersonalDetail.");
    } finally{
        toast.dismiss(toastId);
        dispatch(setLoading(false));
    }
    
    }
}

export function fetchPersonalDetails(token) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        
        try {
            const response = await apiConnector(
                "GET",
                getPersonalDetail,
                null,
                {
                    Authorization: `Bearer ${token}`
                }
            )
            
            console.log("FETCH_PERSONAL_DETAILS API RESPONSE............", response)
            
            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            
            // Update the user state with fetched personal details
            dispatch(setPersonalDetails({ ...response.data.data }))
            toast.success("Personal details fetched successfully!")
            
            return response.data.data
            
        } catch (error) {
            console.error("FETCH_PERSONAL_DETAILS API ERROR............", error)
            toast.error("Could not fetch personal details")
            return null
        } finally {
            dispatch(setLoading(false))
            toast.dismiss(toastId)
        }
    }
}

