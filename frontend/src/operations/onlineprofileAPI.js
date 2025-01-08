import { toast } from 'react-hot-toast'

import { setLoading, setToken } from '../slices/userProfileSlice'
import { setUser } from '../slices/userProfileSlice'
import { apiConnector } from '../services/apiConnector'
import { onlineProfile } from './apis'
import { logout } from './userAPI'


const {

    createOnlineProfile,
    updateOnlineProfile,
    deleteOnlineProfile

} = onlineProfile


export function onlineProfiles(
    token,
    instagramLink,
    facebookLink,
    githubLink,
    linkedinLink
){
    return async (dispatch) =>{
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST",createOnlineProfile,{
                instagramLink,
                facebookLink,
                githubLink,
                linkedinLink
            },{ Authorization: `Bearer ${token}` });

                console.log("Created OnlineProfile Successfully !!!", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("OnlineProfile Created Successfully!!!");
        
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
    try {
        const response = await apiConnector("PUT",updateOnlineProfile,formdata,{
            Authorization: `Bearer ${token}`,
        })
        console.log("Update onlineProfiles API Response............", response);

        if(!response.data.success){
            throw new Error(response.data.message);
        }
        dispatch(setUser({...response.data.onlineProfiles}))
        toast.success("onlineProfiles is updated Successfully")

    } catch (error) {
        console.log("UPDATE onlineProfiles API ERROR............", error)
        toast.error("Could Not Update onlineProfiles")
    }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }

}


export function deleteOnlineProfile(token, formdata) {
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

