import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    token : localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    admin: localStorage.getItem("admin") ? JSON.parse(localStorage.getItem("admin")) : null,
    loading : false,
    allAdminData: localStorage.getItem("allAdminData") ? JSON.parse(localStorage.getItem("allAdminData")) : null,
};

const adminSlice = createSlice({
    name:"admin",
    initialState: initialState,
    reducers : {
        setAdmin(state,action){
            state.admin = action.payload;
        },
        setToken(state,action){
            state.token = action.payload
        },
        setLoading(state, action){
            state.loading = action.payload
        },
        setAllAdminData(state,action){
            state.allAdminData = action.payload
            console.log("in slice",state.allAdminData);
        },
      
    }
})

export const {setAdmin,setToken,setLoading, setAllAdminData} = adminSlice.actions;
export default adminSlice.reducer