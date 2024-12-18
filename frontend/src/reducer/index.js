import {combineReducers} from "@reduxjs/toolkit";

import userReducer from '../slices/userSlice'
import profileReducer from '../slices/userProfileSlice'
import companyReducer from '../slices/companySlice'
import recruiterReducer from '../slices/recruiterSlice'

const rootReducer = combineReducers({
    user : userReducer,
    profile : profileReducer,
    company : companyReducer,
    recruiter : recruiterReducer
})

export default rootReducer