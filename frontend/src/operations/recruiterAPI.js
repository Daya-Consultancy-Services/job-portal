import { toast } from 'react-hot-toast'
import { setLoading, setToken } from '../slices/recruiterSlice'
import { setRecruiter,setRecruiterData } from '../slices/recruiterSlice'
import { apiConnector } from '../services/apiConnector'
import { recruiterPoint } from './apis'

const {

    createRecruiter_api,
    updateRecruiter_api,
    deleteRecruiter_api,
    loginRecruiter_api,
    getRecruiter_api,
    createJob_api,
    updateJob_api,
    deleteJob_api,
    getJob_api

 } = recruiterPoint

export function createRecruiter(formdata,navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true)); // Use dispatch directly
        console.log("in api formdata", formdata);
        try {
            const response = await apiConnector("POST", createRecruiter_api,formdata);

            console.log("Signup API response........", response); 

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

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

export function loginRecruiter(email,password,navigate) 
{
    return async (dispatch) => {
        const toastId = toast.loading("Loading......")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST",loginRecruiter_api, {
                email,
                password
            })
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

export function updateRecruiter(token, updatedData) {
    return async (dispatch) => {
        console.log(updatedData);

        const toastId = toast.loading('Updating recruiter...');
        dispatch(setLoading(true))
        try {
           
            const response = await apiConnector('PUT',updateRecruiter_api, updatedData, {
                Authorization: `Bearer ${token}`,
            });
            console.log("Recruiter_UPDATE_API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            // Update the recruiter in the Redux state
            const updatedrecruiter = { ...response.data.recruiterDetail };
            dispatch(setRecruiter(updatedrecruiter));
            

            // Persist the updated recruiter to localStorage
            localStorage.setItem("recruiter", JSON.stringify(updatedrecruiter));


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

export function deleteRecruiter(token, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Processing...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("DELETE", deleteRecruiter_api, null, {
                Authorization: `Bearer ${token}`,
            });
            console.log("RECRUITER_DELETE_API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("recruiter deleted successfully!");
            dispatch(logout(navigate));

        } catch (error) {
            console.error("Delete_recruiter_API error:", error);
            toast.error("Could not delete recruiter.");
        } finally {
            toast.dismiss(toastId);
            dispatch(setLoading(false));
        }
    };
}

export function fetchRecruiter(token) {
    return async (dispatch) => {
        const toastId = toast.loading("Fetching Recruiter data...");
        try {
            const response = await apiConnector(
                "GET",
                getRecruiter_api,
                null,
                {
                    Authorization: `Bearer ${token}`
                }
            );
            
            if (!response.data.url) {
                throw new Error(response.data.message);
            }
            
            dispatch(setRecruiterData(response.data.data));
            toast.success("recruiterData fetched successfully");

        } catch (error) {
            console.log("RecruiterData ERROR............", error);
            toast.error("Could not fetch recruiterData");
        } finally {
            toast.dismiss(toastId);
        }
    };
}

export function createJob(formdata,navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true)); // Use dispatch directly
        try {
            const response = await apiConnector("POST", createJob_api,formdata);

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

            toast.success("Certificates fetched successfully");
        } catch (error) {
            console.error("Error fetching certificates:", error);
            toast.error("Failed to fetch certificates");
        } finally {
            dispatch(setLoading(false));
        }
    }
}
