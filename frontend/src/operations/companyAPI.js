import { toast } from 'react-hot-toast'
import { setallJobs, setLoading, setToken, setCompany } from '../slices/companySlice'
import { apiConnector } from '../services/apiConnector'
import { companyPoint } from './apis'

const {
    
    signupCompany_api,
    loginCompany_api,
    updateCompany_api,
    deleteCompany_api,
    resetPasswordToken,
    resetPassword,
    changePassword,
    getalldetailsCompany_api,
    getallJobs_api,
    uploadCompanyLogo

} = companyPoint

export function signupCompany(companyData, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try {
            // Send the data directly without nesting
            const response = await apiConnector("POST", signupCompany_api, {
                name: companyData.name,
                description: companyData.description,
                email: companyData.email,
                password: companyData.password,
                role: companyData.role,
                website: companyData.website,
                location: companyData.location,
                // recruiter: companyData.recruiter,
                companyfield: companyData.companyfield
            });

            console.log("Signup Company_API response........", response);
            
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            
            toast.success("Signup Successful!!!");
            navigate('/components/auth/Company/login');
            // navigate('/login');
        } catch (error) {
            console.error("Signup Error for company.....", error);
            // Show the specific error message from the server if available
            const errorMessage = error.response?.data?.message || "Signup failed. Please try again.";
            toast.error(errorMessage);
            throw error; // Re-throw the error so the component can handle it
        } finally {
            dispatch(setLoading(false));
            toast.dismiss(toastId);
        }
    }
}

export function loginCompany(email, password, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading......")
        dispatch(setLoading(true))

        
        try {
            const response = await apiConnector("POST", loginCompany_api, {
                email,
                password,
            })
            console.log("Login Company_Api Response.......", response)

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            dispatch(setToken(response.data.token))
            dispatch(setCompany(response.data.company));

            localStorage.setItem("token", JSON.stringify(response.data.token));
            localStorage.setItem("company", JSON.stringify(response.data.company));

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

export function updateCompanyDetail(token, updatedData) {
    return async (dispatch) => {
        console.log(updatedData)
        const toastId = toast.loading('Updating profile...');
        dispatch(setLoading(true))
        try {
            const response = await apiConnector('PUT', updateCompany_api, updatedData, {
                Authorization: `Bearer ${token}`,
            });
            console.log("UPDATE_Company_API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            const updatedUser = { ...response.data.comp };
            dispatch(setCompany(updatedUser));
            dispatch(fetchCompany(token));

            localStorage.setItem("company", JSON.stringify(updatedUser));
            toast.success('Company_Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Failed to update profile.');
        } finally {
            dispatch(setLoading(false))
            toast.dismiss(toastId)
        }
    }
}

export function deleteCompanys(token, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Processing...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("DELETE", deleteCompany_api, null, {
                Authorization: `Bearer ${token}`,
            });
            console.log("DELETE_Company_API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            dispatch(fetchCompany(token));
            toast.success("Company deleted successfully!");
            dispatch(logout(navigate));
        } catch (error) {
            console.error("Delete_Company_API error:", error);
            toast.error("Could not delete Company.");
        } finally {
            toast.dismiss(toastId);
            dispatch(setLoading(false));
        }
    }
}

export function getPasswordResetToken(email,role,setEmailSent) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try {
        const response = await apiConnector("POST", resetPasswordToken, {
          email,
          role
        })
  
        console.log("RESETPASSTOKEN RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
  
        toast.success("Reset Email Sent")
        setEmailSent(true)
      } catch (error) {
        console.log("RESETPASSTOKEN ERROR............", error)
        toast.error("Failed To Send Reset Email")
      }
      toast.dismiss(toastId)
      dispatch(setLoading(false))
    }
}

export function resetPasswords(password, confirmPassword, token, navigate) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try {
        const response = await apiConnector("POST",resetPassword,{
          password,
          confirmPassword,
          token,
        })
  
        console.log("RESETPASSWORD RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
  
        toast.success("Password Reset Successfully")
        navigate("/login")
      } catch (error) {
        console.log("RESETPASSWORD ERROR............", error)
        toast.error("Failed To Reset Password")
      }
      toast.dismiss(toastId)
      dispatch(setLoading(false))
    }
}

export async function changePasswords(token, formData) {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", changePassword, formData, {
        Authorization: `Bearer ${token}`,
      })
      console.log("CHANGE_PASSWORD_API API RESPONSE............", response)
  
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Password Changed Successfully")
    } catch (error) {
      console.log("CHANGE_PASSWORD_API API ERROR............", error)
      toast.error(error.response.data.message)
    }
    toast.dismiss(toastId)
}

export function uploadCompanyLogos(token, file) {
    return async (dispatch) => {
        const toastId = toast.loading("Uploading Logo...");
        dispatch(setLoading(true));
        try {
            const formData = new FormData();
            formData.append('logo', file);
            console.log(formData);
            const response = await apiConnector(
                "POST",
                 uploadCompanyLogo,
                  formData,
                   {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
                    }
        );

            console.log("UPLOAD_COMPANY_LOGO_API RESPONSE............", response);

            if (!response.data.url) {
                throw new Error(response.data.message);
            }
            dispatch(setCompanyLogo(response.data.url));
            toast.success("Logo uploaded successfully!");
        } catch (error) {
            console.error("UPLOAD_COMPANY_LOGO_API error:", error);
            toast.error("Could not upload Logo.");
        } finally {
            toast.dismiss(toastId);
            dispatch(setLoading(false));
        }
    }
}

export function fetchCompany(token) {
   
    return async (dispatch) => {
        const toastId = toast.loading("Fetching Company data...");
        try {
            const response = await apiConnector(
                "GET",
                getalldetailsCompany_api,
                null,
                {
                    Authorization: `Bearer ${token}`
                }
            );
            
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            
            dispatch(setCompany(response.data.data));
            toast.success("Company fetched successfully");

        } catch (error) {
            console.log("FETCH_PROFILE_IMAGE_API ERROR............", error);
            toast.error("Could not fetch profile image");
        } finally {
            toast.dismiss(toastId);
        }
    };
}

export function logout() {
    return (dispatch) => {
        dispatch(setToken(null))
        // dispatch(setCompany(null))
        localStorage.removeItem("token")
        localStorage.removeItem("company")
        toast.success("Logged Out")
        
    }
}

export function fetchCompanyJobs(token) {
    
    return async (dispatch) => {
        const toastId = toast.loading("Fetching Company jobs...");
        try {
            const response = await apiConnector(
                "GET",
                getallJobs_api,
                null,
                {
                    Authorization: `Bearer ${token}`
                }
            );
            
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            
            dispatch(setallJobs(response.data.data));
            toast.success("fetched all Company Jobs successfully");

        } catch (error) {
            console.log("FETCH_companyjobs_API ERROR............", error);
            toast.error("Could not fetch alljobs company");
        } finally {
            toast.dismiss(toastId);
        }
    };
}