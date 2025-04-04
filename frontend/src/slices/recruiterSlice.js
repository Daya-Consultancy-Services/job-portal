

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    recruiter: localStorage.getItem("recruiter") ? JSON.parse(localStorage.getItem("recruiter")) : null,
    company: localStorage.getItem("company") ? JSON.parse(localStorage.getItem("company")) : null,
    recruiterData: null,
    loading: false,
    applicantData: [],
    searchResults: [],
    searchTotal: 0,
    searchPage: 1,
    searchLimit: 10,
    searchLoading: false
}

const recruiterSlice = createSlice({
    name: "recruiter",
    initialState: initialState,
    reducers: {
        setCompany(state, value) {
            state.company = value.payload;
        },
        setLoading(state, value) {
            state.loading = value.payload
        },
        setToken(state, value) {
            state.token = value.payload
            console.log("in slice token", state.token);
        },
        setRecruiter(state, action) {
            state.recruiter = action.payload
            console.log("in slice user", state.recruiter);
        },
        setRecruiterData(state, action) {
            state.recruiterData = action.payload
            console.log("in slice recruiterData", state.recruiterData);
        },
        setApplicantData(state, action) {
            state.applicantData = action.payload
            console.log("in slice applicantData", state.applicantData);
        },
        // New reducers for search functionality
        setSearchResults(state, action) {
            state.searchResults = action.payload.candidates || [];
            state.searchTotal = action.payload.total || 0;
            state.searchPage = action.payload.page || 1;
            state.searchLimit = action.payload.limit || 10;
            console.log("in slice searchResults", state.searchResults);
        },
        setSearchLoading(state, action) {
            state.searchLoading = action.payload;
        },
        clearSearchResults(state) {
            state.searchResults = [];
            state.searchTotal = 0;
            state.searchPage = 1;
            state.searchLimit = 10;
        }
    },
});

export const { 
    setCompany, 
    setLoading, 
    setToken, 
    setRecruiter, 
    setRecruiterData, 
    setApplicantData,
    // Export new search-related actions
    setSearchResults,
    setSearchLoading,
    clearSearchResults
} = recruiterSlice.actions;

export default recruiterSlice.reducer;

