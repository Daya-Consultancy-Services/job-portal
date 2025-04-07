import { toast } from 'react-hot-toast'
import { adminPoint } from '../operations/apis'
import { setAdmin, setToken , setLoading, setAllCompany, setAllAdminData, setAdminExists } from '../slices/adminSlice'
import { apiConnector } from '../services/apiConnector';


const {

    createAdmin_api,
    loginAdmin_api,
    updateAdmin_api,
    deleteAdmin_api,
    tokenCompany_api,
    getallCompany_api,
    uploadAdminImage,
    checkAdminExists_api,
    getAdmin_api


} = adminPoint



export function createAdmin(formData) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true)); 
        try {
            const response = await apiConnector("POST", createAdmin_api, formData);
            // console.log("CreateAdmin API response........", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("CreateAdmin Successful!!!");
        } catch (error) {
            console.error("CreateAdmin_api error.....", error);
            toast.error("CreateAdmin Failed, Try again.");
        } finally {
            dispatch(setLoading(false)); 
            toast.dismiss(toastId);
        }

    };

}

export function loginAdmin(formData, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading......")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST",loginAdmin_api, formData)
            // console.log("Login Admin_Api Response.......", response)

            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            dispatch(setToken(response.data.token))
            localStorage.setItem("token", JSON.stringify(response.data.token));
            localStorage.setItem("admin", JSON.stringify(response.data.admin));

            toast.success("Login Successful")
            navigate("/admin")

        } catch (error) {
            console.log("Login admin_Api error...............", error)
            toast.error("Login failed")
        } finally {
            dispatch(setLoading(false))
            toast.dismiss(toastId)
        }
    }
}

export function updateAdmin(token, updatedData) {
    return async (dispatch) => {
        const toastId = toast.loading('Updating profile...');
        dispatch(setLoading(true))
        try {
            const response = await apiConnector('PUT', updateAdmin_api, updatedData, {
                Authorization: `Bearer ${token}`,
            });
            // console.log("UPDATE_Admin_API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            const updatedUser = { ...response.data.updatedAdmin };
            dispatch(setAdmin(updatedUser));
            //dispatch(fetchCompany(token));

            localStorage.setItem("admin", JSON.stringify(updatedUser));
            toast.success('Admin_Profile updated successfully!');
        } catch (error) {
            console.error('Error updating admin:', error);
            toast.error('Failed to update admin.');
        } finally {
            dispatch(setLoading(false))
            toast.dismiss(toastId)
        }
    }
}

export function deleteAdmin(token, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Processing...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("DELETE", deleteAdmin_api, null, {
                Authorization: `Bearer ${token}`,
            });
            // console.log("DELETE_Admin_API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            //dispatch(fetchCompany(token));
            toast.success("Admin deleted successfully!");
            dispatch(logout(navigate));
        } catch (error) {
            console.error("Delete_Admin_API error:", error);
            toast.error("Could not delete Admin.");
        } finally {
            toast.dismiss(toastId);
            dispatch(setLoading(false));
        }
    }
}

export function getAllAdminDetail(token) {
    return async (dispatch) => {
        const toastId = toast.loading("Fetching admin details...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector(
                "GET",
                getAdmin_api,
                null,
                {
                    Authorization: `Bearer ${token}`
                }
            );
            
            // console.log("GET_ADMIN_DETAILS_API RESPONSE............", response);
            
            if (!response.data.success) {
                throw new Error(response.data.message);
               
            }
            
            
            dispatch(setAllAdminData(response.data.data));
            

        } catch (error) {
            console.error("GET_ADMIN_DETAILS_API error............", error);
            toast.error("Could not fetch admin details");
        } finally {
            dispatch(setLoading(false)); 
            toast.dismiss(toastId);
        }
    };
}

export function checkAdminExists() {
    return async (dispatch) => {
      dispatch(setLoading(true));
      try {
        const response = await apiConnector("GET", checkAdminExists_api);
        
        if (!response.data.success) {
          throw new Error(response.data.message);
        }
        
        dispatch(setAdminExists(response.data.exists));
      } catch (error) {
        console.error("Check admin exists API error:", error);
        // Default to false if there's an error
        dispatch(setAdminExists(false));
      } finally {
        dispatch(setLoading(false));
      }
    };
  }


export function uploadImage(token, file) {
    return async (dispatch) => {
        const toastId = toast.loading("Uploading image...");
        dispatch(setLoading(true));
        try {
            console.log("in api token", token, "file", file);
            const formData = new FormData();
            formData.append("image", file);

            const response = await apiConnector("POST", uploadAdminImage, formData, {
                Authorization: `Bearer ${token}`,
            });
            // console.log("UPLOAD_ADMIN_IMAGE_API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            
            // Update the admin data with the new image URL
            const updatedAdmin = {
                ...JSON.parse(localStorage.getItem("admin")),
                image: response.data.url
            };
            
            dispatch(setAdmin(updatedAdmin));
            localStorage.setItem("admin", JSON.stringify(updatedAdmin));
            
            toast.success("Image uploaded successfully!");
        } catch (error) {
            console.error("UPLOAD_ADMIN_IMAGE_API error:", error);
            toast.error("Could not upload image.");
        } finally {
            dispatch(setLoading(false));
            toast.dismiss(toastId);
        }
    };
}

export function tokenCompanys(token,companyId,jobToken,userDetailAccessCount,isBlocked){
    return async (dispatch) => {
        const toastId = toast.loading("Assigining token.... ")
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", tokenCompany_api,{
                companyId,
                jobToken,
                userDetailAccessCount,
                isBlocked
            }, 
            {
                Authorization: `Bearer ${token}`,
            });
            // console.log("Admin_JobToken_API RESPONSE............", response);

            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.success("Admin assigned token successfully!");
            dispatch(adminfetchAllCompany(token))

        } catch (error) {
            console.error("AdminToken Assign_api error.....", error);
            toast.error("AdminTokenAssigned Failed, Try again.");
        } finally{
            dispatch(setLoading(false)); 
            toast.dismiss(toastId);
        }
    }
}

export function adminfetchAllCompany(token) {
   
    return async (dispatch) => {
        const toastId = toast.loading("Fetching Company data...");
        dispatch(setLoading(true));
        try {
            const response = await apiConnector(
                "GET",
                getallCompany_api,
                null,
                {
                    Authorization: `Bearer ${token}`
                },
               
            );
            
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            
            dispatch(setAllCompany(response.data.data));
          

        } catch (error) {
            console.log("Admin fetched Allcompany ERROR............", error);
            toast.error("Could not fetch Admin Allcompany");
        } finally {
            dispatch(setLoading(false)); 
            toast.dismiss(toastId);
        }
    };
}



export function logout(navigate) {
    return (dispatch) => {
        dispatch(setToken(null))
        // dispatch(setCompany(null))
        localStorage.removeItem("token")
        localStorage.removeItem("admin")
        toast.success("Logged Out")
        navigate("/") ;
    }
}
