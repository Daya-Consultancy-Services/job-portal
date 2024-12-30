import { toast } from 'react-hot-toast'

import { setLoading, setToken } from '../slices/userSlice'
import { setUser } from '../slices/userSlice'
import { apiConnector } from '../services/apiConnector'
import { userPoint } from './apis'



const {

    signup_api,
    login_api,
    updateUser_api,
    deleteUser_api

} = userPoint



export function signupUser(firstName, lastName, email, password, role, workstatus, navigate) {

    return async (dispatch) => {

        const toastId = toast.loading("Loading...");


        dispatch(setLoading(true)); // Use dispatch directly

        try {

           

            const response = await apiConnector("POST", signup_api, {

                firstName,

                lastName,

                email,

                password,

                role,

                workstatus // Pass workstatus here

            });


            console.log("Signup API response........", response); // Log API response


            if (!response.data.success) {

                throw new Error(response.data.message);

            }


            toast.success("Signup Successful!!!");

            navigate("/components/auth/User/login"); // Navigate to login page

        } catch (error) {

            console.error("Signup Error for user.....", error);

            toast.error("Signup Failed, Try again.");

        } finally {

            dispatch(setLoading(false)); // Stop loading

            toast.dismiss(toastId);

        }

    };

}


export function login(
    email,
    password,
    navigate
) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading......")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST", login_api, {
                email,
                password
            })
            console.log("Login Api Response.......", response)
            dispatch(setToken(response.data.token))
            dispatch(setUser(response.data.user));
            localStorage.setItem("token", JSON.stringify(response.data.token));


            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success("Login Successful")
            navigate("/home")

        } catch (error) {
            console.log("Login Api error...............", error)
            toast.error("Login failed")

        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

// update user detail API 

export function updateDetail(token, updatedData) {
    return async (dispatch) => {
        console.log("updated data", updatedData)
        console.log("token", token);

        const toastId = toast.loading('Updating profile...');
        dispatch(setLoading(true))
        try {
            const response = await apiConnector('PUT', updateUser_api, updatedData, {
                Authorization: `Bearer ${token}`,
            });
            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            // Update the user in the Redux state
            const updatedUser = { ...response.data.userDetail };
            dispatch(setUser(updatedUser));

            // Persist the updated user to localStorage
            localStorage.setItem("user", JSON.stringify(updatedUser));


            toast.success('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Failed to update profile.');
        } finally {
            toast.dismiss(toastId);
        }
        dispatch(setLoading(false))
    }

};

export function deleteUser(token, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Processing...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("DELETE", deleteUser_api, null, {
                Authorization: `Bearer ${token}`,
            });
            console.log("DELETE_API API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("User deleted successfully!");
            dispatch(logout(navigate));

        } catch (error) {
            console.error("Delete_User_API error:", error);
            toast.error("Could not delete user.");
        } finally {
            toast.dismiss(toastId);
            dispatch(setLoading(false));
        }
    };
}

export function logout(navigate) {

    return (dispatch) => {
        dispatch(setToken(null))
        dispatch(setUser(null))
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.success("Logged Out")
        navigate("/")

    }
}