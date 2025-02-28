import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    token : localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    admin: localStorage.getItem("admin") ? JSON.parse(localStorage.getItem("admin")) : null,
    loading : false,

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
      
    }
})

export const {setAdmin,setToken,setLoading} = adminSlice.actions;
export default adminSlice.reducer