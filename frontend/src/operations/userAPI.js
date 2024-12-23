import { toast } from 'react-hot-toast'

import { setLoading,setToken } from '../slices/userSlice'
import { setUser } from '../slices/userProfileSlice'
import { apiConnector } from '../services/apiConnector'
import { userPoint } from './apis'


const {

    signup_api,
    login_api,
    updateUser_api,
    deleteUser_api

} = userPoint

export function signupUser(

    firstName,
    lastName,
    email,
    password,
    role,
    navigate

){
    return async (dispatch) => {    
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {

            const response = await apiConnector("POST",signup_api,{


                firstName,
                lastName,
                email,
                password,
                role

            })
            console.log("Signup Api response........",response); // the response after signup user 

            // check whats the error is if the response give error
            if(!response.data.success){
                throw new Error(response.data.message);
            }
            toast.success("Signup Successful*****!!!")
            // user navigate to login page for better transition
            navigate("/components/auth/User/login")

        } catch (error) {
            console.log("Signup Error for user.....",error)
            toast.error("Signup Fail, Try again");
            //navigate to signup page again
        }
        dispatch(setLoading(false))
       toast.dismiss(toastId)
    }

}

export function login(
    email,
    password,
    navigate
){
    return async (dispatch) => {
        const toastId = toast.loading("Loading......")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST",login_api,{
                email,
                password
            })
            console.log("Login Api Response.......", response)

            if(!response.data.success){
                throw new Error(response.data.message);
            }
            toast.success("Login Successful")
            dispatch(setToken(response.data.token))

            dispatch(setUser({ ...response.data.user }))
            localStorage.setItem("token",JSON.stringify(response.data.token))
            navigate("/home")

        } catch (error) {
            console.log("Login Api error...............",error)
            toast.error("Login failed")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

// update user detail API 

export const updateProfile = (token, userData) => async (dispatch) => {

    const toastId = toast.loading('Updating profile...');

    try {
        const response = await apiConnector('PUT',updateUser_api, userData, {
            Authorization: `Bearer ${token}`,
        });
        if (!response.data.success) {
            throw new Error(response.data.message);
        }
        dispatch(setUser({ ...response.data.updatedProfile }));
        toast.success('Profile updated successfully!');
    } catch (error) {
        console.error('Error updating profile:', error);
        toast.error('Failed to update profile.');
    } finally {
        toast.dismiss(toastId);
    }
};

