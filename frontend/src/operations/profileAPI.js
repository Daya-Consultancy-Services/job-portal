import { toast } from "react-hot-toast"

import { setUser } from "../slices/userSlice"
import { apiConnector } from "../services/apiConnector"
import { profilePoint } from "../operations/apis"

const {

    updateProfile_api

} = profilePoint


export function updateProfile(token,formdata){
    return async(dispatch) => {
        const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("PUT",updateProfile_api,formdata,{
            Authorization: `Bearer ${token}`,
        })
        console.log("UPDATE_PROFILE_API API RESPONSE............", response)

        if(!response.data.success){
            throw new Error(response.data.message)
        }

        dispatch(setUser({...response.data.profileDetail}))
        toast.success("Profile update Successfully")

    } catch (error) {

        console.log("UPDATE_PROFILE_API API ERROR............", error)
        toast.error("Could Not Update Profile")
    }
        toast.dismiss(toastId)
    }
}