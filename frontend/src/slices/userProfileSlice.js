import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user : localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    token : localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    certificates: [],
    skillprofiles: [],
    careers: [],
    loading: false,
    Onlineprofile : null,
}

const profileSlice = createSlice({
    name:"profile",
    initialState:initialState,
    reducers:{
        setUser(state, value){
            state.user = value.payload;
        },
        setToken(state, action) {
            state.token = action.payload;
        },
        setLoading(state, value){
            state.loading = value.payload
        },
        setCertificate(state,action){
            state.certificates = action.payload
        },
        setOnlineprofile(state,action){
            state.Onlineprofile = action.payload
         
        },
        setskillprofiles(state,action){
            state.skillprofiles = action.payload
        },
        setCareers(state,action){
            state.careers = action.payload
        }
    },
});

// added setToken because there is an import of setToken in profileDetailAPI 
export const {

    setUser, 
    setLoading, 
    setToken, 
    setCertificate, 
    setOnlineprofile, 
    setskillprofiles,
    setCareers

} = profileSlice.actions;
export default profileSlice.reducer;