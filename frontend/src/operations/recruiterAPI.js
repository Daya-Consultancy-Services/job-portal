import { toast } from 'react-hot-toast'
import { setApplicantData, setLoading, setToken } from '../slices/recruiterSlice'
import { setRecruiter,setRecruiterData } from '../slices/recruiterSlice'
import { setAllJobs, setRecruiters } from '../slices/companySlice'
import { apiConnector } from '../services/apiConnector'
import { recruiterPoint } from './apis'
import { useNavigate } from 'react-router-dom'

const {

    createRecruiter_api,
    updateRecruiter_api,
    deleteRecruiter_api,
    loginRecruiter_api,
    getRecruiter_api,
    tokenRecruiter,
    createJob_api,
    updateJob_api,
    deleteJob_api,
    getJob_api,
    getuserDetails_api,
    downloadUserDetail,

 } = recruiterPoint

 

export function createRecruiter(formdata,token,navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true)); // Use dispatch directly
       
        try {
            const response = await apiConnector("POST", createRecruiter_api,formdata,{
                Authorization: `Bearer ${token}`,
            });

            console.log("Signup API response........", response); 

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            // dispatch(setRecruiters(response.data.recruiter));
            // localStorage.setItem("recruiter", JSON.stringify(response.data.recruiter));
            dispatch(fetchRecruiter(token));

            toast.success("Signup Successful!!!");
             //navigate("/components/auth/User/login"); // Navigate to login page
        } catch (error) {
             console.error("Signup Error for createRecuiter.....", error);
             toast.error("Signup Failed, Try again.");
        } finally {
             dispatch(setLoading(false)); 
             toast.dismiss(toastId);
        }
    };
}

// export function createRecruiter(formdata, token, navigate) {
//     return async (dispatch) => {
//         const toastId = toast.loading("Loading...");
//         dispatch(setLoading(true)); 
        
//         try {
//             const response = await apiConnector("POST", createRecruiter_api, formdata, {
//                 Authorization: `Bearer ${token}`,
//             });

//             console.log("Signup API response:", response); 

//             if (!response.data.success) {
//                 throw new Error(response.data.message);
//             }
//             dispatch(fetchRecruiter(token))
//             toast.success("Signup Successful!!!");

//             return recruiter; 
//         } catch (error) {
//             console.error("Signup Error for createRecruiter:", error);
//             toast.error("Signup Failed, Try again.");
//         } finally {
//             dispatch(setLoading(false)); 
//             toast.dismiss(toastId);
//         }
//     };
// }


export function loginRecruiter(formData, navigate) 
{

    console.log("Login Recruiter", formData)
    return async (dispatch) => {
        const toastId = toast.loading("Loading......")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST",loginRecruiter_api, formData, navigate)
            console.log("Login Api Response.......", response)

            dispatch(setToken(response.data.token));
            dispatch(setRecruiter(response.data.recruiter));

            localStorage.setItem("token", JSON.stringify(response.data.token));
            localStorage.setItem("recruiter", JSON.stringify(response.data.recruiter));

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

export function updateRecruiter(token,recruiterId, formdata) {
    return async (dispatch) => {
        console.log(formdata);

        const toastId = toast.loading('Updating recruiter...');
        dispatch(setLoading(true))
        try {
            const updatedData = { ...formdata, recruiterId };
            const response = await apiConnector('PUT',updateRecruiter_api, updatedData, {
                Authorization: `Bearer ${token}`,
            });
            console.log("Recruiter_UPDATE_API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            // Update the recruiter in the Redux state
            // const updatedrecruiter = { ...response.data.recruiterDetail };
            // dispatch(setRecruiters(updatedrecruiter));
            dispatch(fetchRecruiter(token));
            
            toast.success('recruiter updated successfully!');
        } catch (error) {
            console.error('Error updating recruiter:', error);
            toast.error('Failed to update recruiter.');
        } finally {
            toast.dismiss(toastId);
        }
        dispatch(setLoading(false))
    }

};

export function deleteRecruiter(token,recruiterId, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Processing...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("DELETE", deleteRecruiter_api, {recruiterId}, {
                Authorization: `Bearer ${token}`,
            });
            console.log("RECRUITER_DELETE_API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("recruiter deleted successfully!");
            dispatch(fetchRecruiter(token));

        } catch (error) {
            console.error("Delete_recruiter_API error:", error);
            toast.error("Could not delete recruiter.");
        } finally {
            toast.dismiss(toastId);
            dispatch(setLoading(false));
        }
    };
}

export function tokenRecruiters(token,recruiterId,jobToken,userDetailAccessCount){
    return async (dispatch) => {
        const toastId = toast.loading("Assigining token.... ")
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", tokenRecruiter,{
                recruiterId,
                jobToken,
                userDetailAccessCount,
            }, 
            {
                Authorization: `Bearer ${token}`,
            });
            console.log("Company_JobToken_API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success("company assigned token successfully!");
            dispatch(fetchRecruiter(token))

        } catch (error) {
            console.error("companyToken Assign_api error.....", error);
            toast.error("companyTokenAssigned Failed, Try again.");
        } finally{
            dispatch(setLoading(false)); 
            toast.dismiss(toastId);
        }
    }
}

export function fetchRecruiter(token) {
    return async (dispatch) => {
        const toastId = toast.loading("Fetching Recruiter data...");
        try {
            const response = await apiConnector("GET", getRecruiter_api, null, {
                Authorization: `Bearer ${token}`
            });

            if (!response.data || !response.data.data) {  
                throw new Error("Invalid API response structure");
            }
            
            dispatch(setRecruiters(response.data.data));
            toast.success("recruiterData fetched successfully");

        } catch (error) {
            console.log("RecruiterData ERROR:", error);
            toast.error("Could not fetch recruiter data");
        } finally {
            toast.dismiss(toastId);
        }
    };
}


export function createJob(token,formdata,navigate) {
    console.log("in api formdata", formdata);
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true)); // Use dispatch directly
        try {
            
            const response = await apiConnector("POST", createJob_api,formdata,
            {
                Authorization: `Bearer ${token}`,
            });

            console.log("createJob API response........", response); 

            if (!response.data.success) {
                throw new Error(response.data.message);
            }
           
            toast.success("Job Created Successful!!!");
            dispatch(fetchJob(token));
        } catch (error) {
             console.error("Error for createJob.....", error);
             toast.error("createJob Failed, Try again.");
        } finally {
             dispatch(setLoading(false)); 
             toast.dismiss(toastId);
        }
    };
}

export function updateJob(token, jobId, formdata) {
    return async (dispatch) => {
        console.log(formdata)
        const toastId = toast.loading('Updating Job...');
        dispatch(setLoading(true))
        try {
            const updatedData = {...formdata, jobId }
            const response = await apiConnector('PUT', updateJob_api, updatedData,
            {
                Authorization: `Bearer ${token}`,
            });
            console.log("UPDATE_Job_API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            dispatch(fetchJob(token));
            toast.success('JOb updated successfully!');
        } catch (error) {
            console.error('Error updating Job:', error);
            toast.error('Failed to update Job.');
        } finally {
            dispatch(setLoading(false))
            toast.dismiss(toastId)
        }
    }
}

export function deleteJob(token,jobId,navigate){
    return async (dispatch) => {
        const toastId = toast.loading("Loading....")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("DELETE", deleteJob_api, {jobId},
            {
                Authorization: `Bearer ${token}`,
            });

            console.log("DELETE_Job_API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            dispatch(fetchJob(token));
            toast.success("Job deleted Successfully!");

        } catch (error) {
            console.error("Job_API error:", error);
            toast.error("Could not delete Job.");
        } finally{
            toast.dismiss(toastId);
            dispatch(setLoading(false));
        }
    }
}

export function fetchJob(token) {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("GET",getJob_api, null, 
            {
                Authorization: `Bearer ${token}`,
            });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }


            // Update Redux state with certificates
            dispatch(setRecruiterData(response.data.data));

            toast.success("jobs fetched successfully");
        } catch (error) {
            console.error("Error fetching jobs:", error);
            toast.error("Failed to fetch jobs");
        } finally {
            dispatch(setLoading(false));
        }
    }
}

export function userDetailAccess(token,userId) {
   
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true)); 
        try {
            
            // const response = await apiConnector("GET",getuserDetails_api, userId,
            // {
            //     Authorization: `Bearer ${token}`,
            // });
            const response = await apiConnector(
                "GET",
                `${getuserDetails_api}?userId=${userId}`,
                null, // No body needed for GET request
                {
                    Authorization: `Bearer ${token}`,
                }
            );

            console.log("userDetailsAccess API response........", response); 

            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success("userDetailsAccess Successful!!!");
            dispatch(setRecruiter(token));
            dispatch(setApplicantData(response.data.user));
        } catch (error) {
             console.error("Error for userDetailsAccess.....", error);
             toast.error("userDetailsAccess Failed, Try again.");
        } finally {
             dispatch(setLoading(false)); 
             toast.dismiss(toastId);
        }
    };
}

export function downloadUserDetailForRecruiter(token, userId) {
    return async (dispatch) => {
        const toastId = toast.loading("Downloading...");
        try {
            const response = await apiConnector(
                "GET",
                `${downloadUserDetail}/${userId}`, // Pass userId as a query parameter
                null,
                {
                    Authorization:` Bearer ${token}`,
                    responseType: "blob", // Expect binary file data
                }
            );

            if (response.status !== 200) {
                throw new Error("Failed to download user details");
            }

            // Create a blob URL for downloading the file
            const blob = new Blob([response.data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `User_Details_${userId}.xlsx`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            toast.success("Download Successful!");
            dispatch(setRecruiter(token)) 
            // dispatch(fetchRecruiter(token)) 
        } catch (error) {
            console.error("Error downloading user details:", error);
            toast.error("Failed to download user details, Try again.");
        } finally {
            toast.dismiss(toastId);
        }
    };
}