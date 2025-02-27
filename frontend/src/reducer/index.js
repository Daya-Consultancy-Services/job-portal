import {combineReducers} from "@reduxjs/toolkit";

import userReducer from '../slices/userSlice'
import profileReducer from '../slices/userProfileSlice'
import companyReducer from '../slices/companySlice'
import recruiterReducer from '../slices/recruiterSlice'
import adminReducer from '../slices/adminSlice'

const rootReducer = combineReducers({
    user : userReducer,
    profile : profileReducer,
    company : companyReducer,
    recruiter : recruiterReducer,
    admin: adminReducer
})

export default rootReducer