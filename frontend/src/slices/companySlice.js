import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    signupData : null,
    loading : false,
    token : localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    company: localStorage.getItem("company") ? JSON.parse(localStorage.getItem("company")) : null,
    recruiter: localStorage.getItem("recruiter") ? JSON.parse(localStorage.getItem("recruiter")) : null,
    recruiters : null,
    allJobs : null
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
           
        },
        setRecruiter(state,actions){
            state.recruiter = actions.payload
        },
        setRecruiters(state,action){
            state.recruiters =action.payload
        },
        setallJobs(state,action){
            state.allJobs = action.payload
            

        },
        setCompanyLogo(state,action){
            state.companyLogo = action.payload
        }
     
    }
});

export const { setSignupData, setLoading, setToken, setCompany,setRecruiter,setRecruiters,setallJobs, setCompanyLogo } = companySlice.actions;
export default companySlice.reducer;