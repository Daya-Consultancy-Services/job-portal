import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    signupData: null,
    loading: false,
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    alljob:null,
    appliedJobs:[],
    results: {
        companies: [],
        jobs: []
    },
};

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setSignupData(state, action) {
            state.signupData = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setToken(state, action) {
            state.token = action.payload;
        },
        setUser(state, action) {
            
            state.user = action.payload;
            console.log("value : ",action);
        },
        setalljob(state,action){
            state.alljob = action.payload
        },
        setappliedjobs(state,action){
            state.appliedJobs = action.payload
        },
        setSearchLoading: (state, action) => {
            state.loading = action.payload;
        },
        setSearchResults: (state, action) => {
            state.results = action.payload;
            state.loading = false;
            console.log("Search Results: ", state.results);
        },
        clearSearchResults: (state) => {
            state.results = {
                companies: [],
                jobs: []
            };
        }
    },
});

export const { setSignupData, setLoading, setToken, setUser,setalljob,setappliedjobs, setSearchLoading, setSearchResults, clearSearchResults } = userSlice.actions;
export default userSlice.reducer;
