import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    signupData : null,
    loading : false,
    token : localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    company: localStorage.getItem("company") ? JSON.parse(localStorage.getItem("company")) : null,
};

const companySlice = createSlice({
    name:"company",
    initialState: initialState,
    reducers : {
        setSignupData(state, value){
            state.signupData = value.payload;
        },
        setLoading(state, value){
            state.loading = value.payload
        },
        setToken(state, value){
            state.token = value.payload
        },
        setCompany(state,value){
            state.company =  value.payload
        }
    }
});

export const { setSignupData, setLoading, setToken, setCompany} = companySlice.actions;
export default companySlice.reducer;