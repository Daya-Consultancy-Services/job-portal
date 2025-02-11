import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token : localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    recruiter: localStorage.getItem("recruiter") ? JSON.parse(localStorage.getItem("recruiter")) : null,
    company : localStorage.getItem("company") ? JSON.parse(localStorage.getItem("company")) : null,
    recruiterData:null,
    loading: false
}

const recruiterSlice = createSlice({
    name:"recruiter",
    initialState:initialState,
    reducers:{
        setCompany(state, value){
            state.company = value.payload;
        },
        setLoading(state, value){
            state.loading = value.payload
        },
        setToken(state, value){
            state.token = value.payload
        },
        setRecruiter(state,action){
            state.recruiter = action.payload
        },
        setRecruiterData(state,action){
            state.recruiterData= action.payload
        }
    },
});

export const { setCompany, setLoading,setToken,setRecruiter,setRecruiterData } = recruiterSlice.actions;
export default recruiterSlice.reducer;