import { toast } from 'react-hot-toast'
import { setApplicantData, setLoading, setSearchResults, setToken } from '../slices/recruiterSlice'
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
    downloadUserDetail

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
             toast.error(error.response?.data?.message);
        } finally {
             dispatch(setLoading(false)); 
             toast.dismiss(toastId);
        }
    };
}


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
            navigate("/components/profiles/RecruiterDashboard/Dashboard")

        } catch (error) {
            console.log("Login Api error...............", error)
            toast.error(error.response?.data?.message)

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
            const updatedrecruiter = { ...response.data.recruiterDetail };
            dispatch(setRecruiter(updatedrecruiter));
            dispatch(fetchRecruiter(token));
            
            toast.success('recruiter updated successfully!');
        } catch (error) {
            console.error('Error updating recruiter:', error);
            toast.error(error.response?.data?.message);
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
            dispatch(setRecruiter(null));
            dispatch(fetchRecruiter(token));

        } catch (error) {
            console.error("Delete_recruiter_API error:", error);
            toast.error(error.response?.data?.message);
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
            dispatch(setRecruiter(token))
            dispatch(fetchRecruiter(token))

        } catch (error) {
            console.error("companyToken Assign_api error.....", error);
            toast.error(error.response?.data?.message);
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
            // toast.success("recruiterData fetched successfully");

        } catch (error) {
            console.log("RecruiterData ERROR:", error);
            toast.error(error.response?.data?.message);
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
            const response = await apiConnector(
                "POST",
                getuserDetails_api,
                { userId }, 
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
             toast.error(error.response?.data?.message);
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
                "POST", 
                downloadUserDetail, 
                { userId }, 
                {
                    Authorization: `Bearer ${token}`,
                },
                null,
                "blob"
            );

            if (response.status !== 200) {
                throw new Error("Failed to download user details");
            }

            // Convert Blob to a downloadable file
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
            dispatch(setRecruiter(token));
        } catch (error) {
            console.error("Error downloading user details:", error);
            toast.error(error.response?.data?.message);
        } finally {
            toast.dismiss(toastId);
        }
    };
}



// Add this to your frontend API call function
export function advancedSearchCandidates(token, searchParams) {
    return async (dispatch) => {
        console.group("🔍 Advanced Search Diagnostics");
        console.log("Search Parameters:", JSON.stringify(searchParams, null, 2));
        
        // Validate search parameters
        const validationErrors = [];
        
        if (searchParams.keywords && !Array.isArray(searchParams.keywords)) {
            validationErrors.push("Keywords must be an array");
        }

        // Check numeric fields
        const numericFields = [
            'experienceFrom', 
            'experienceTo', 
            'salaryFrom', 
            'salaryTo', 
            'ageFrom', 
            'ageTo'
        ];

        numericFields.forEach(field => {
            if (searchParams[field] !== '' && isNaN(parseFloat(searchParams[field]))) {
                validationErrors.push(`${field} must be a number`);
            }
        });

        if (validationErrors.length > 0) {
            console.error("❌ Search Parameter Validation Errors:", validationErrors);
            toast.error(validationErrors.response?.data?.message);
            return;
        }

        // Sanitize empty string values
        const sanitizedParams = Object.fromEntries(
            Object.entries(searchParams).filter(([_, v]) => 
                v !== '' && v !== null && v !== undefined
            )
        );

        console.log("Sanitized Parameters:", JSON.stringify(sanitizedParams, null, 2));

        try {
            const response = await apiConnector(
                "POST",
                recruiterPoint.advanceSearchCandidate,
                sanitizedParams,
                {
                    Authorization: `Bearer ${token}`,
                },
                null,
                null,
                {
                    params: {
                        page: sanitizedParams.page || 1,
                        limit: sanitizedParams.limit || 10
                    }
                }
            );
            
            console.log("API Response Status:", response.status);
            console.log("Response Data:", JSON.stringify(response.data, null, 2));

            if (!response.data.success) {
                console.error("❌ Search Failed:", response.data.message);
                throw new Error(response.data.message);
            }

            // Log detailed candidate information if available
            if (response.data.data && response.data.data.length > 0) {
                console.log("🟢 Candidates Found:", response.data.data.length);
                response.data.data.forEach((candidate, index) => {
                    console.log(`Candidate ${index + 1}:`, {
                        id: candidate.candidateId,
                        name: candidate.fullName,
                        skills: candidate.skills,
                        experience: candidate.experience
                    });
                });
            } else {
                console.warn("⚠️ No candidates found matching the search criteria");
            }

            dispatch(setSearchResults({
                candidates: response.data.data,
                total: response.data.total,
                page: response.data.page,
                limit: response.data.limit
            }));

            console.groupEnd();
            return response.data;

        } catch (error) {
            console.error("❌ Advanced Search Error:", error);
            console.groupEnd();
            throw error;
        }
    };
}

export function logout(navigate) {
    return (dispatch) => {
        dispatch(setToken(null))
        // dispatch(setCompany(null))
        localStorage.removeItem("token")
        localStorage.removeItem("recruiter")
        toast.success("Logged Out")
        navigate("/");
        
    }
}

