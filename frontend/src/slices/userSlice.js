import { createSlice } from "@reduxjs/toolkit";

const parseJSON = (item) => {
    if (item === null || item === undefined) {
        console.warn("Received null or undefined item, returning null.");
        return null;
    }
    try {
        return JSON.parse(item);
    } catch (e) {
        console.error("Error parsing JSON from localStorage", e);
        return null;
    }
};

// Check localStorage and initialize values
const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const initialState = {
    signupData: null,
    loading: false,
    token: parseJSON(token) || "", // Default to empty string if null or undefined
    user: parseJSON(user) || {}, // Default to empty object if null or undefined
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
            console.log("set user value", action.payload);
        },
    },
});

export const { setSignupData, setLoading, setToken, setUser } = userSlice.actions;
export default userSlice.reducer;
