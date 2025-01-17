import { toast } from 'react-hot-toast'

import { setLoading, setToken } from '../slices/companySlice'
import { setCompany } from '../slices/companySlice'
import { apiConnector } from '../services/apiConnector'
import { companyPoint } from './apis'
import { setLoading, setToken, setUser } from '../slices/userSlice'

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