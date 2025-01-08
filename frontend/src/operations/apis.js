const BASE_URL = process.env.REACT_APP_BASE_URL // put base url for front end for the .env file

export const userPoint = {
    signup_api     : BASE_URL + "/user/signup",
    login_api      : BASE_URL + "/user/login",
    updateUser_api : BASE_URL + "/user/update",
    deleteUser_api : BASE_URL + "/user/delete",
} 

export const profilePoint = {
    updateProfile_api : BASE_URL + "/profile/update",
    getAllDetails     : BASE_URL + "/profile/details",
}

export const personalDetail = {
    createPersonaldetail : BASE_URL + "/profile/personaldetail",
    updatePersonaldetail : BASE_URL + "/profile/updatepersonaldetail",
    deletePersonaldetail : BASE_URL + "/profile/deletepersonaldetail" 
}
export const onlineProfile = {
    createOnlineProfile : BASE_URL + "/profile/onlineprofile",
    updateOnlineProfile : BASE_URL + "/profile/updateonlineprofile",
    deleteOnlineProfile : BASE_URL + "/profile/deleteonlineprofile",
}


export const companyPoint = {
    signupCompany_api        : BASE_URL + "/company/signup",
    loginCompany_api         : BASE_URL + "/company/login",
    updateCompany_api        : BASE_URL + "/company/update",
    deleteCompany_api        : BASE_URL + "/company/delete",
    getalldetailsCompany_api : BASE_URL + "/company/companydetails"
}

export const recruiterPoint = {
    updateRecruiter_api       : BASE_URL + "/recruiter/update",
    getAllDetailRecruiter_api : BASE_URL + "/recruiter/getdetail"
}
