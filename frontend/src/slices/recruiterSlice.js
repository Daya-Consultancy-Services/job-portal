import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    company : localStorage.getItem("company") ? JSON.parse(localStorage.getItem("company")) : null,
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
    },
});

export const { setCompany, setLoading } = recruiterSlice.actions;
export default recruiterSlice.reducer;