import { toast } from 'react-hot-toast'

import { setLoading, setToken } from '../slices/userProfileSlice'
import { setUser,setCertificate } from '../slices/userProfileSlice'
import { apiConnector } from '../services/apiConnector'
import { certificateProfile } from './apis'
import { logout } from './userAPI'

const {

    createCertificate,
    updateCertificate,
    deleteCertificate,
    getCertificate

} = certificateProfile

export function createCertificates(
    token,
    // certificateName,
    // certificateLink,
    // certificateDescription
    formdata
){
    return async (dispatch) => {

        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        console.log(formdata);
        try {
            const response = await apiConnector("POST",createCertificate,formdata,
            {
                Authorization: `Bearer ${token}`
            });

            console.log("Created Certificate Successfully !!!", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            // const createdCertificate = response.data;
            // return createdCertificate;

            dispatch(setUser({...response.data.certificates}))
            //const newCertificateId = response.data.data?._id;

            toast.success("Certificate Created Successfully!!!!!!!!");

        } catch (error) {
            console.error("Error Creating Certificate:", error);
            toast.error("Failed to create Certificate, Please try again.");
        } finally {
            toast.dismiss(toastId);
            dispatch(setLoading(false));
        }
    }
}

export function updateCertificates(token,certificateId,formdata){
    return async (dispatch) => {
        const toastId = toast.loading("Loading....")
        dispatch(setLoading(true));
        try {
            const updatedData = { ...formdata, certificateId };
            const response = await apiConnector("PUT",updateCertificate,updatedData,
            {
                  Authorization: `Bearer ${token}`,
            })
            console.log("Updated Certificate  API Response............", response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }
            //const updatedCertificate = response.data.certificates;
            //dispatch(setUser({...response.data.certificates}))
            dispatch(setUser({ ...response.data.certificates }));
            toast.success("Certificate is updated Successfully")

        } catch (error) {
            console.log("UPDATE Certificate API ERROR............", error)
            toast.error("Could Not Update Certificate")
        } finally{
            toast.dismiss(toastId);
            dispatch(setLoading(false));
        }
    }
}

export function deleteCertificates(token,certificateId,navigate){
    return async (dispatch) => {
        const toastId = toast.loading("Loading....")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("DELETE", deleteCertificate, {certificateId}, {
                Authorization: `Bearer ${token}`,
            });

            console.log("DELETE_Certificate_API API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            
            toast.success("Certificate deleted Successfully!");

        } catch (error) {
            console.error("Certificate_API error:", error);
            toast.error("Could not delete Certificate.");
        } finally{
            toast.dismiss(toastId);
            dispatch(setLoading(false));
        }
    }
}

export function fetchCertificates(token) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("GET", getCertificate, null, {
                Authorization: `Bearer ${token}`,
            });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            const certificates = response.data.data;

            // Update Redux state with certificates
            dispatch(setCertificate({ certificates }));

            toast.success("Certificates fetched successfully");
        } catch (error) {
            console.error("Error fetching certificates:", error);
            toast.error("Failed to fetch certificates");
        } finally {
            dispatch(setLoading(false));
        }
    };
}