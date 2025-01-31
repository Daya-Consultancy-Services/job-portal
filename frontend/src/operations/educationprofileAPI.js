import { toast } from 'react-hot-toast'

import { setEducation, setLoading, setToken } from '../slices/userProfileSlice'
import { setUser } from '../slices/userProfileSlice'
import { apiConnector } from '../services/apiConnector'
import { educationProfile } from './apis'
import { logout } from './userAPI'

const {

    createEducationProfile,
    updateEducationProfile,
    deleteEducationProfile,
    getEducationProfile

} = educationProfile

export function createEducationProfiles(
    token,
    // educationName,
    // institutionName,
    // courseName,
    // courseType,
    // duration,
    // marks,
    // location,
    // education
    formdata
){
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST",createEducationProfile,formdata,
            {
                Authorization: `Bearer ${token}`
            });

            console.log("Created EducationProfile Successfully !!!", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success("EducationProfile Created Successfully!!!!!!!!");
            dispatch(setEducation(token));
        } catch (error) {
            console.error("Error Creating EducationProfile:", error);
            toast.error("Failed to create EducationProfile, Please try again.");
        } finally {
            toast.dismiss(toastId);
            dispatch(setLoading(false));
        }
    }
}


export function updateEducationProfiles(token,educationProfileId,formdata)
{
    return async (dispatch) => {
        const toastId = toast.loading("Loading....")
        dispatch(setLoading(true));
        try {
            const updatedData = { ...formdata, educationProfileId };
            const response = await apiConnector("PUT",updateEducationProfile,updatedData,
            {
                  Authorization: `Bearer ${token}`,
            });

            console.log("Updated educationProfile API Response............", response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("educationProfile is updated Successfully")
            dispatch(fetchEducationProfile(token));
        } catch (error) {
            console.log("UPDATE Certificate API ERROR............", error)
            toast.error("Could Not Update Certificate")
        } finally{
            toast.dismiss(toastId);
            dispatch(setLoading(false));
        }
    }
}


export function deleteEducationProfiles(token,educationProfileId,navigate)
{
    return async(dispatch) => {
        const toastId = toast.loading("Loading....")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("DELETE", deleteEducationProfile, {educationProfileId}, {
                Authorization: `Bearer ${token}`,
            });

            console.log("DELETE_EducationProfile_API API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            
            toast.success("EducationProfile deleted Successfully!");
            dispatch(setEducation(token));
        } catch (error) {
            console.error("Certificate_API error:", error);
            toast.error("Could not delete Certificate.");
        } finally{
            toast.dismiss(toastId);
            dispatch(setLoading(false));
        }
    }
}

export function fetchEducationProfile(token) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("GET", getEducationProfile, null, {
                Authorization: `Bearer ${token}`,
            });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }


            // Update Redux state with certificates
            
            dispatch(setEducation(response.data.data));

            toast.success("EducationProfiles fetched successfully");
        } catch (error) {
            console.error("Error fetching EducationProfiles:", error);
            toast.error("Failed to fetch EducationProfiles");
        } finally {
            dispatch(setLoading(false));
        }
    };
}
