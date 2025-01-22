import { toast } from 'react-hot-toast'

import { setLoading, setOnlineprofile, setToken } from '../slices/userProfileSlice'
import { setUser } from '../slices/userProfileSlice'
import { apiConnector } from '../services/apiConnector'
import { onlineProfile } from './apis'
import { logout } from './userAPI'
// import { getOnlineProfile } from '../../../backend/controllers/OnlineProfileControl'


const {

    createOnlineProfile,
    updateOnlineProfile,
    deleteOnlineProfile,
    getOnlineProfile

} = onlineProfile


export function onlineProfiles(
    token,
   formdata
){
    return async (dispatch) =>{
        
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST",createOnlineProfile, formdata,{ 
                Authorization: `Bearer ${token}` 
            });

                console.log("Created OnlineProfile Successfully !!!", response, formdata);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            

            //dispatch(setUser({...response.data.onlineProfiles}))
            toast.success("OnlineProfile Created Successfully!!!");
            dispatch(getOnlineProfiles(token))
        } catch (error) {
            console.error("Error create OnlineProfile detail:", error);
            toast.error("Failed to create OnlineProfile. Please try again.");
        } finally {
            toast.dismiss(toastId);
            dispatch(setLoading(false));
        }
    }
}

export function updateonlineProfiles(token,formdata){
    return async(dispatch) => {
        const toastId = toast.loading("Loading....")
        dispatch(setLoading(true));
        console.log("formdata coming", formdata)
    try {
        const response = await apiConnector("PUT",updateOnlineProfile,formdata,{
            Authorization: `Bearer ${token}`,
        })
        console.log("Update onlineProfiles API Response............", response);

        if(!response.data.success){
            throw new Error(response.data.message);
        }
        dispatch(setUser({...response.data.data}))
        toast.success("onlineProfiles is updated Successfully")

    } catch (error) {
        console.log("UPDATE onlineProfiles API ERROR............", error)
        toast.error("Could Not Update onlineProfiles")
    } finally{
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
    
    }

}


export function deleteOnlineProfiles(token, formdata) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("PUT",deleteOnlineProfile , formdata, {
                Authorization: `Bearer ${token}`,
            });

            console.log("DELETE_OnlineProfile_API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Selected online profile links deleted successfully!");
        } catch (error) {
            console.error("DELETE_OnlineProfile_API error:", error);
            toast.error("Could not delete selected online profile links.");
        } finally {
            toast.dismiss(toastId);
            dispatch(setLoading(false));
        }
    };
}
// dispatch(deleteOnlineProfile(userToken, {
//     instagramLink: true,
//     facebookLink: true,
// }));

export function getOnlineProfiles(token,navigate){
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("GET", getOnlineProfile, null, {
                Authorization: `Bearer ${token}`,
            })    
            console.log("GET_USER_ONLINEPROFILE API RESPONSE............",response)
            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            dispatch(setOnlineprofile(response.data.data));

            //dispatch(setUser({ ...response.data.onlineprofile }));
            toast.success("OnlineProfle_GET_API successfully!");
        } catch (error) {
            console.error("OnlineProfle_GET_API error:", error);
            toast.error("Could not get the OnlineProfle_GET_API.");
        } finally {
            toast.dismiss(toastId);
            dispatch(setLoading(false));
        }
    }
}
