import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    signupData : null,
    loading : false,
    token : localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null
};

const userSlice = createSlice({
    name: "user",
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
        }
    }
});

export const { setSignupData, setLoading, setToken} = userSlice.actions;
export default userSlice.reducer;