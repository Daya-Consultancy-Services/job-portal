import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token : localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    recruiter: localStorage.getItem("recruiter") ? JSON.parse(localStorage.getItem("recruiter")) : null,
    company : localStorage.getItem("company") ? JSON.parse(localStorage.getItem("company")) : null,
    recruiterData:null,
    loading: false,
    applicantData:[]
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
            console.log("in slice token", state.token);
        },
        setRecruiter(state,action){
            state.recruiter = action.payload
            console.log("in slice user", state.recruiter);
        },
        setRecruiterData(state,action){
            state.recruiterData= action.payload
            console.log("in slice recruiterData", state.recruiterData);
        },
        setApplicantData(state,action){
            state.applicantData= action.payload
            console.log("in slice applicantData", state.applicantData);
        }
    },
});

export const { setCompany, setLoading,setToken,setRecruiter,setRecruiterData, setApplicantData } = recruiterSlice.actions;
export default recruiterSlice.reducer;