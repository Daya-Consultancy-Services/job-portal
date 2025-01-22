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
        // let newCertificateId = [null]
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

            // dispatch(setUser({...response.data.certificates}))
       
            //newCertificateId = response.data.data?._id;

            toast.success("Certificate Created Successfully!!!!!!!!");

            dispatch(fetchCertificates(token));
            // console.log(newCertificateId)

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
            // dispatch(setUser({ ...response.data.certificates }));
            dispatch(fetchCertificates(token));

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
            dispatch(fetchCertificates(token));

            
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


            // Update Redux state with certificates
            dispatch(setCertificate(response.data.data));

            toast.success("Certificates fetched successfully");
        } catch (error) {
            console.error("Error fetching certificates:", error);
            toast.error("Failed to fetch certificates");
        } finally {
            dispatch(setLoading(false));
        }
    };
}

// export function updateCertificates(token, certificateId, formdata) {
//     return async (dispatch, getState) => {
//         const toastId = toast.loading("Loading....");
//         dispatch(setLoading(true));

//         try {
//             // Fetch the current certificates from Redux state
//             const certificates = getState().profile.certificates;

//             // Find the certificate in the list by matching the certificateId
//             const certificateToUpdate = certificates.find(
//                 (certificate) => certificate._id === certificateId
//             );

//             // If certificate is not found, return an error
//             if (!certificateToUpdate) {
//                 throw new Error("Certificate not found");
//             }

//             // Proceed with the update API call
//             const updatedData = { ...formdata, certificateId };
//             const response = await apiConnector("PUT", updateCertificate, updatedData, {
//                 Authorization: `Bearer ${token}`,
//             });

//             console.log("Updated Certificate API Response:", response);

//             if (!response.data.success) {
//                 throw new Error(response.data.message);
//             }

//             // Dispatch action to update the certificate in Redux state
//             dispatch(setCertificate({ ...response.data.certificates }));
//             toast.success("Certificate updated successfully");

//         } catch (error) {
//             console.log("UPDATE Certificate API ERROR:", error);
//             toast.error("Could not update certificate");
//         } finally {
//             toast.dismiss(toastId);
//             dispatch(setLoading(false));
//         }
//     };
// }
