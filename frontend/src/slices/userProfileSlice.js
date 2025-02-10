import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user : localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    token : localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    certificates: [],
    skillprofiles: [],
    careers: [],
    education: [],
    projects : [],
    empProfile: [],
    loading: false,
    Onlineprofile : null,
    personalDetails:null,
    extraprofile:null



    
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
        },
        setEducation(state,action){
            state.education = action.payload
        },
        setProject(state,action){
            state.projects = action.payload
        },
        setEmpProfile(state,action){
            state.empProfile = action.payload
        },
        // setResume(state, action) {  
        //     state.resume = action.payload;  
        // },
        // clearResume(state) {
        //     state.resume = null; 
        // },
        setExtraProfile(state, action){
            state.extraprofile = action.payload;
            console.log("userprofileslice",action)  
        },
        setPersonalDetails(state, action){
            state.personalDetails = action.payload;
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
    setCareers,
    setEducation,
    setProject,
    setEmpProfile,
    //setResume,
    //clearResume,
    //setImage,
    setExtraProfile,
    setPersonalDetails

} = profileSlice.actions;
export default profileSlice.reducer;