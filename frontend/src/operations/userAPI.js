import { toast } from 'react-hot-toast'

import { setLoading, setToken } from '../slices/userSlice'
import { setUser,setalljob ,setappliedjobs } from '../slices/userSlice'
import { apiConnector } from '../services/apiConnector'
import { userPoint } from './apis'
import { fetchJob } from './recruiterAPI'
// import {setCertificate, , setOnlineprofile} from '../slices/userProfileSlice'
import {setCertificate,setImageResume, setOnlineprofile,setskillprofiles,setCareers,setEducation,setProject,setEmpProfile,setResume,setImage} from '../slices/userProfileSlice'


const {

    signup_api,
    login_api,
    updateUser_api,
    deleteUser_api,
    getalljob,
    applyjob,
    appliedJob

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
            localStorage.setItem("user", JSON.stringify(response.data.user));

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
        console.log(updatedData);

        const toastId = toast.loading('Updating profile...');
        dispatch(setLoading(true))
        try {
           
            const response = await apiConnector('PUT', updateUser_api, updatedData, {
                Authorization: `Bearer ${token}`,
            });
            console.log("UPDATE_API API RESPONSE............", response);

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
        // dispatch(setToken(null))
        // dispatch(setUser(null))
        // dispatch(setOnlineprofile(null));
        // dispatch(setCertificate(null));
        // dispatch(setImageResume(null));
        // dispatch(setCertificate(null))
        // dispatch(setskillprofiles(null))
        // dispatch(setCareers(null))
        // dispatch(setEducation(null))
        // dispatch(setProject(null))
        // dispatch(setEmpProfile(null))
        // dispatch(setResume(null))
        // dispatch(setImage(null))
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.success("Logged Out")
        navigate("/")

    }
}

export function fetchallJob(token) {
    return async (dispatch) => {
        const toastId = toast.loading("Fetching all job data...");
        try {
            const response = await apiConnector(
                "GET",
                getalljob,
                null,
                {
                    Authorization: `Bearer ${token}`
                }
            );
            
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            
            dispatch(setalljob(response.data.data));
            toast.success("User job fetched successfully");

        } catch (error) {
            console.log("FETCH_user_alljob_API ERROR............", error);
            toast.error("Could not fetch useralljob");
        } finally {
            toast.dismiss(toastId);
        }
    };
}

export function applyJob(token,jobId) {
    return async (dispatch) => {
        const toastId = toast.loading("User apply job data...");
        try {
            const response = await apiConnector("POST",applyjob,{jobId},
            {
                Authorization: `Bearer ${token}`
            
            });

            console.log(" APPLY JOB API RESPONSE............", response);
            
            if (!response.data.success) {

                throw new Error(response.data.message);
            }
            
            toast.success("User apply job successfully");
            dispatch(fetchallJob(token)) //updating the job it already appllied
            // dispatch(fetchJob(token)) //updating in recruiter jobs that this user apply
        } catch (error) {
            console.log("user_applyjob_API ERROR............", error);
            toast.error("Could not apply user job");
        } finally {
            toast.dismiss(toastId);
        }
    };
}

export function fetchallappliedJob(token) {
    return async (dispatch) => {
        const toastId = toast.loading("Fetching allapplied job data...");
        try {
            const response = await apiConnector(
                "GET",
                appliedJob,
                null,
                {
                    Authorization: `Bearer ${token}`
                }
            );
            
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            
            dispatch(setappliedjobs(response.data.data));
            toast.success("User Appliedjob fetched successfully");

        } catch (error) {
            console.log("FETCH_user_appliedjob_API ERROR............", error);
            toast.error("Could not fetch userappliedjob");
        } finally {
            toast.dismiss(toastId);
        }
    };
}