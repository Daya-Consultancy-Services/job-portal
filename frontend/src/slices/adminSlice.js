import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    token : localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    admin: localStorage.getItem("admin") ? JSON.parse(localStorage.getItem("admin")) : null,
    loading : false,
    allCompany:null,
    adminExists: false,
    allAdminData:null

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
        setAllCompany(state,action){
            state.allCompany = action.payload
        },
        setAdminExists: (state, action) => {
            state.adminExists = action.payload;
          },
          setAllAdminData: (state, action) => {
            state.allAdminData = action.payload;
            
          },
      
    }
})

export const {setAdmin,setToken,setLoading,setAllAdminData,setAllCompany, setAdminExists} = adminSlice.actions;
export default adminSlice.reducer