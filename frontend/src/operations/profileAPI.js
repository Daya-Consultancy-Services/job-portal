import { toast } from "react-hot-toast"

import { setUser,setResume,clearResume,setImage } from "../slices/userProfileSlice"
import { apiConnector } from "../services/apiConnector"
import { profilePoint } from "../operations/apis"


const {

    updateProfile_api,
    uploadresume,
    deleteresume,
    getresume,
    uploadimage,
    getImage
    

} = profilePoint


export function updateProfile(token,formdata){
    console.log("token", token, "formdata", formdata);
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

        dispatch(setUser({...response.data.profileDetail}))
        toast.success("Profile update Successfully")

    } catch (error) {

        console.log("UPDATE_PROFILE_API API ERROR............", error)
        toast.error("Could Not Update Profile")
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

            // Optionally, you can update the state with the uploaded resume data
            dispatch(setResume(response.data.data));

            toast.success("Resume uploaded successfully!");
        } catch (error) {
            console.log("UPLOAD_RESUME_API ERROR", error);
            toast.error("Failed to upload resume.");
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
            dispatch(clearResume());

            toast.success("Resume deleted successfully!");
        } catch (error) {
            console.log("DELETE_RESUME_API ERROR", error);
            toast.error("Failed to delete resume.");
        }
        toast.dismiss(toastId);
    };
}

export function downloadResume(token) {
    return async (dispatch) => {
        const toastId = toast.loading("Downloading resume...");
        try {
            // Make API request to download the resume
            const response = await apiConnector("GET", getresume, null, {
                Authorization: `Bearer ${token}`,
            });

            if (response.status !== 200) {
                throw new Error("Failed to download resume.");
            }

            // Create a Blob from the file buffer received in the response
            const file = new Blob([response.data], { type: "application/pdf" });

            // Create a link to download the file
            const link = document.createElement("a");
            link.href = URL.createObjectURL(file);
            link.download = "resume.pdf"; // You can change this to the file name you want
            link.click();

            toast.success("Resume downloaded successfully!");
        } catch (error) {
            console.log("Download Resume API Error", error);
            toast.error("Failed to download resume.");
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
            dispatch(setImage(response.data.url));
            toast.success("Profile image updated successfully");
            
        } catch (error) {
            console.log("UPLOAD_PROFILE_IMAGE_API ERROR............", error);
            toast.error("Could not upload profile image");
            throw error; // Re-throw to handle in the component
        } finally {
            toast.dismiss(toastId);
        }
    };
}


// This is already implemented in your action creators
export function fetchProfileImage(token) {
    return async (dispatch) => {
        const toastId = toast.loading("Fetching profile image...");
        try {
            const response = await apiConnector(
                "GET",
                getImage,
                null,
                {
                    Authorization: `Bearer ${token}`
                }
            );
            
            if (!response.data.url) {
                throw new Error("No image URL received from server");
            }
            
            // This dispatches the URL to the Redux store
            dispatch(setImage(response.data.url));
            
            return response.data.url;
        } catch (error) {
            console.log("FETCH_PROFILE_IMAGE_API ERROR............", error);
            toast.error("Could not fetch profile image");
            throw error;
        } finally {
            toast.dismiss(toastId);
        }
    };
}