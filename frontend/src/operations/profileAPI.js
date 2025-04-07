import { toast } from "react-hot-toast"

import { setUser,setResume,clearResume,setImage, setLoading, setExtraProfile } from "../slices/userProfileSlice"
import { apiConnector } from "../services/apiConnector"
import { profilePoint } from "../operations/apis"


const {

    updateProfile_api,
    uploadresume,
    deleteresume,
    getresume,
    uploadimage,
    getExtraprofile
    
    
    
    

} = profilePoint

// export function getAllDetail(token){
//     return async (dispatch)=>{
//         dispatch(setLoading(true));
//         try {
//             const response = await apiConnector("GET", getAllDetails, null, {
//                 Authorization: `Bearer ${token}`,
//             })
//             console.log("getting all the profile data...........", response)
//             if (!response.data.success) {
//                 throw new Error(response.data.message);
//             }
//             dispatch(setUser({...response.data.data}))
            
//         } catch (error) {
//             console.log("profile error", error);

//         }finally{
//             dispatch(setLoading(false));
//         }
//     }
// }
export function fetchExtraProfile(token){
    return async (dispatch)=>{
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("GET", getExtraprofile, null, {
                Authorization: `Bearer ${token}`,
            })
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            // dispatch(setUser({...response.data.data}))
            dispatch(setExtraProfile(response.data.data));
            
        } catch (error) {
            console.log("profile error", error);

        }finally{
            dispatch(setLoading(false));
        }
    }
}



export function updateProfile(token,formdata){
    return async(dispatch) => {
        const toastId = toast.loading("Loading...")
        // console.log("profile data : " + {formdata});
    try {
        const response = await apiConnector("PUT",updateProfile_api,formdata,{
            Authorization: `Bearer ${token}`,
        })
        console.log("UPDATE_PROFILE_API API RESPONSE............", response)

        if(!response.data.success){
            throw new Error(response.data.message)
        }

        //dispatch(setUser({...response.data.profileDetail}))
        dispatch(fetchExtraProfile(token))
        toast.success("Profile update Successfully")

    } catch (error) {

        console.log("UPDATE_PROFILE_API API ERROR............", error)
        toast.error(error.response?.data?.message)
    }
        toast.dismiss(toastId)
    }
}


export function uploadResume(token, formData) {
    return async (dispatch) => {
        const toastId = toast.loading("Uploading Resume...");
        try {
            // Make API request to upload the resume
            const response = await apiConnector("POST", uploadresume, formData, {
                Authorization: `Bearer ${token}`,
            });

            console.log("UPLOAD_RESUME_API RESPONSE", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            // dispatch(setResume(response.data.data));
            dispatch(fetchExtraProfile(token));

            toast.success("Resume uploaded successfully!");
        } catch (error) {
            console.log("UPLOAD_RESUME_API ERROR", error);
            toast.error(error.response?.data?.message);
        }
        toast.dismiss(toastId);
    };
}
  
export function deleteResume(token) {
    return async (dispatch) => {
        const toastId = toast.loading("Deleting resume...");
        try {
            // Make the API call to delete the resume
            const response = await apiConnector("DELETE", deleteresume, null, {
                Authorization: `Bearer ${token}`,
            });

            console.log("DELETE_RESUME_API RESPONSE", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            // If successful, clear the resume in the Redux state
            // dispatch(clearResume());
            dispatch(fetchExtraProfile(token));

            toast.success("Resume deleted successfully!");
        } catch (error) {
            console.log("DELETE_RESUME_API ERROR", error);
            toast.error(error.response?.data?.message);
        }
        toast.dismiss(toastId);
    };
}




export function downloadResume(token) {
    return async (dispatch) => {
        const toastId = toast.loading("Downloading resume...");
        try {
            const response = await apiConnector(
                "GET", 
                getresume, 
                null,
                {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/pdf'
                }
            );

            // Check if we got the download URL
            if (!response?.data?.downloadUrl) {
                throw new Error("Download URL not found");
            }

            // Create a temporary link to download from the URL
            const link = document.createElement("a");
            link.href = response.data.downloadUrl;
            link.target = "_blank";
            link.download = "resume.pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            toast.success("Resume downloaded successfully!");
        } catch (error) {
            console.log("Download Resume API Error", error);
            toast.error(error.response?.data?.message);
        }
        toast.dismiss(toastId);
    };
}


export function uploadProfileImage(token, imageFile) {
    return async (dispatch) => {
        const toastId = toast.loading("Uploading image...");
     
        try {
            const formData = new FormData();
            formData.append('image', imageFile);
            const response = await apiConnector(
                "POST",
                uploadimage,
                formData,
                {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            );
            console.log("UPLOAD_PROFILE_IMAGE API RESPONSE............", response);
            
            // Check if we have a successful response with URL
            if (!response.data.url) {
                throw new Error("No image URL received from server");
            }
            
            // Update Redux store with new image URL
            // dispatch(fetchProfileImage(token));
            dispatch(fetchExtraProfile(token))
            toast.success("Profile image updated successfully");
            
        } catch (error) {
            console.log("UPLOAD_PROFILE_IMAGE_API ERROR............", error);
            toast.error(error.response?.data?.message);
        } finally {
            toast.dismiss(toastId);
        }
    };
}


// This is already implemented in your action creators
// export function fetchProfileImage(token) {
//     return async (dispatch) => {
//         const toastId = toast.loading("Fetching profile image...");
//         try {
//             const response = await apiConnector(
//                 "GET",
//                 getimage,
//                 null,
//                 {
//                     Authorization: `Bearer ${token}`
//                 }
//             );
            
//             if (!response.data.url) {
//                 throw new Error("No image URL received from server");
//             }
            
//             // This dispatches the URL to the Redux store
//             // dispatch(setImage(response.data.url));
            

//         } catch (error) {
//             console.log("FETCH_PROFILE_IMAGE_API ERROR............", error);
//             toast.error("Could not fetch profile image");
//         } finally {
//             toast.dismiss(toastId);
//         }
//     };
// }