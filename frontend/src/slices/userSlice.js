import { createSlice } from "@reduxjs/toolkit";

const parseJSON = (item) => {
    if (item === null || item === undefined) {
        console.error("Received null or undefined item, returning null.");
        return null;
    }
    try {
        return JSON.parse(item);
    } catch (e) {
        console.error("Error parsing JSON from localStorage", e);
        return null;
    }
};

const initialState = {
    signupData: null,
    loading: false,
    token: parseJSON(localStorage.getItem("token")),
    user: parseJSON(localStorage.getItem("user")),
};

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setSignupData(state, value) {
            state.signupData = value.payload;
        },
        setLoading(state, value) {
            state.loading = value.payload;
        },
        setToken(state, value) {
            state.token = value.payload;
        },
        setUser(state, value) {
            state.user = value.payload;
            console.log("set user value", value.payload);
        },
    },
});

export const { setSignupData, setLoading, setToken, setUser } = userSlice.actions;
export default userSlice.reducer;
