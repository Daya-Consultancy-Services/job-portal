import { toast } from 'react-hot-toast'

import { setLoading, setToken } from '../slices/userProfileSlice'
import { setUser ,setCareers} from '../slices/userProfileSlice'
import { apiConnector } from '../services/apiConnector'
import { careerProfile } from './apis'
import { logout } from './userAPI'

const {

    createCareer,
    updateCareer,
    deleteCareer,
    getCareer

} = careerProfile

export function createCareers(
    token,
    // industryType,
    // department,
    // empType,
    // skills,
    // jobLocation,
    // salary
    formdata
){
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        console.log("in career api", formdata, token);
        try {
            const response = await apiConnector("POST",createCareer,formdata,{Authorization: `Bearer ${token}`});

            console.log("Created Career Successfully !!!", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success("Career Created Successfully!!!!!!!!");
            dispatch(fetchCareers(token));
        } catch (error) {
            console.error("Error Creating Certificate:", error);
            toast.error("Failed to create Certificate, Please try again.");
        } finally{
            toast.dismiss(toastId);
            dispatch(setLoading(false));
        }
    }
}

export function updateCareers(token,careerId,formdata){
    return async (dispatch) => {
        const toastId = toast.loading("Loading....")
        dispatch(setLoading(true));
        try {
            const updatedData = { ...formdata, careerId };
            const response = await apiConnector("PUT",updateCareer,updatedData,
            {
                Authorization: `Bearer ${token}`,
            })
            console.log("Updated CareerProfile API Response............", response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }
            
            toast.success("Careers is updated Successfully")
            dispatch(fetchCareers(token));
        } catch (error) {
            console.log("UPDATE Careers API ERROR............", error)
            toast.error("Could Not Update Careers")
        } finally {
            toast.dismiss(toastId);
            dispatch(setLoading(false));
        }
    }
}

export function deleteCareers(token,careerId){
    return async (dispatch) =>{
        const toastId = toast.loading("Loading....")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("DELETE", deleteCareer, {careerId}, {
                Authorization: `Bearer ${token}`,
            });
            console.log("DELETE_CareerProfile_API API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            
            toast.success("CareerProfile deleted Successfully!");
            dispatch(fetchCareers(token));
        } catch (error) {
            console.error("CareerProfile_API error:", error);
            toast.error("Could not delete CareerProfile.");
        } finally {
            toast.dismiss(toastId);
            dispatch(setLoading(false));
        }
    }
}

export function fetchCareers(token) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("GET",getCareer , null, {
                Authorization: `Bearer ${token}`,
            });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }


            // Update Redux state with certificates
            dispatch(setCareers(response.data.data));

            toast.success("Careers fetched successfully");
        } catch (error) {
            console.error("Error fetching Careers:", error);
            toast.error("Failed to fetch Careers");
        } finally {
            dispatch(setLoading(false));
        }
    };
}
