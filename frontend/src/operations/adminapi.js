import { toast } from 'react-hot-toast'
import { adminPoint } from './apis'
import { setAdmin, setToken , setLoading } from '../slices/adminSlice'


const {

    createAdmin_api,
    loginAdmin_api,
    updateAdmin_api,
    deleteAdmin_api

} = adminPoint

export function createAdmin(name, email, password, contactNumber, role) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true)); 
        try {
            const response = await apiConnector("POST", createAdmin_api, {
                name,
                email,
                password,
                contactNumber,
                role,
               
            });
            console.log("CreateAdmin API response........", response);

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

export function loginAdmin(email, password, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading......")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST",loginAdmin_api, {
                email,
                password,
            })
            console.log("Login Admin_Api Response.......", response)

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            dispatch(setToken(response.data.token))
            dispatch(setAdmin(response.data.admin));

            localStorage.setItem("token", JSON.stringify(response.data.token));
            localStorage.setItem("admin", JSON.stringify(response.data.admin));

            toast.success("Login Successful")
            navigate("/home")

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
            console.log("UPDATE_Admin_API RESPONSE............", response);

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
            console.log("DELETE_Admin_API RESPONSE............", response);

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

export function logout() {
    return (dispatch) => {
        dispatch(setToken(null))
        // dispatch(setCompany(null))
        localStorage.removeItem("token")
        localStorage.removeItem("admin")
        toast.success("Logged Out")
    }
}
