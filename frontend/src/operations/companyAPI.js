import { toast } from 'react-hot-toast'

import { setLoading, setToken } from '../slices/companySlice'
import { setCompany } from '../slices/companySlice'
import { apiConnector } from '../services/apiConnector'
import { companyPoint } from './apis'
import { logout } from './userAPI'

const {

    signupCompany_api,
    loginCompany_api,
    updateCompany_api,
    deleteCompany_api,
    getalldetailsCompany_api

} = companyPoint


export function signupCompany(
    name,
    description,
    email,
    password,
    role,
    website,
    location,
    logo,
    companyfield,
){
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST",signupCompany_api,{
                name,
                description,
                email,
                password,
                role,
                website,
                location,
                logo,
                companyfield,
            });
            console.log("Signup Company_API response........", response); // Log API response
            if (!response.data.success) {

                throw new Error(response.data.message);

            }
            toast.success("Signup Successful!!!");
            //navigate("/components/auth/User/login"); // Navigate to login page
        } catch (error) {
            console.error("Signup Error for company.....", error);
            toast.error("Signup for company Failed, Try again.");
        } finally {
            dispatch(setLoading(false)); 
            toast.dismiss(toastId);
        }
    }
}

export function loginCompany(
    email,
    password,
    navigate
){
    return async (dispatch) => {
        const toastId = toast.loading("Loading......")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST",loginCompany_api,{
                email,
                password,
            })
            console.log("Login Company_Api Response.......", response)

            dispatch(setToken(response.data.token))
            dispatch(setCompany(response.data.company));

            localStorage.setItem("token", JSON.stringify(response.data.token));
            localStorage.setItem("company", JSON.stringify(response.data.company));

            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success("Login Successful")
            navigate("/home")


        } catch (error) {
            console.log("Login Company_Api error...............", error)
            toast.error("Login failed")
        } finally {
            dispatch(setLoading(false))
            toast.dismiss(toastId)
        }
    }
}

export function updateCompanyDetail(token,updatedData){
    return async (dispatch) => {
        console.log(updatedData)
        const toastId = toast.loading('Updating profile...');
        dispatch(setLoading(true))
        try {
            const response = await apiConnector('PUT', updateCompany_api, updatedData, {
                Authorization: `Bearer ${token}`,
            });
            console.log("UPDATE_Company_API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            const updatedUser = { ...response.data.comp };
            dispatch(setUser(updatedUser));

            localStorage.setItem("company", JSON.stringify(updatedUser));
            toast.success('Company_Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Failed to update profile.');
        } finally {
            dispatch(setLoading(false))
            toast.dismiss(toastId)
        }
    }
}

export function deleteCompanys(token,navigate){
    return async (dispatch) => {
        const toastId = toast.loading("Processing...");
        dispatch(setLoading(true));
        try {
             const response = await apiConnector("DELETE", deleteCompany_api, null, {
                Authorization: `Bearer ${token}`,
            });
            console.log("DELETE_Company_API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Company deleted successfully!");
            dispatch(logout(navigate));
        } catch (error) {
            console.error("Delete_Company_API error:", error);
            toast.error("Could not delete Company.");
        } finally {
            toast.dismiss(toastId);
            dispatch(setLoading(false));
        }
    }
}

export function logout(navigate) {

    return (dispatch) => {
        dispatch(setToken(null))
        dispatch(setCompany(null))
        localStorage.removeItem("token")
        localStorage.removeItem("company")
        toast.success("Logged Out")
        navigate("/")

    }
}