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
    uploadresume      : BASE_URL + "/profile/upload-resume",
    deleteresume      : BASE_URL + "/profile/delete-resume",
    getresume         : BASE_URL + "/profile/download-resume",
    uploadimage       : BASE_URL + "/profile/upload-image",
    getimage          : BASE_URL + "/profile/get-profile-image",
    getExtraprofile   : BASE_URL + "/profile/getextraprofile",
}

export const personalDetail = {
    createPersonaldetail : BASE_URL + "/profile/personaldetail",
    updatePersonaldetail : BASE_URL + "/profile/updatepersonaldetail",
    deletePersonaldetail : BASE_URL + "/profile/deletepersonaldetail" ,
    getPersonalDetail    : BASE_URL + "/profile/getpersonaldetails"
}
export const onlineProfile = {
    createOnlineProfile : BASE_URL + "/profile/onlineprofile",
    updateOnlineProfile : BASE_URL + "/profile/updateonlineprofile",
    deleteOnlineProfile : BASE_URL + "/profile/deleteonlineprofile",
    getOnlineProfile    : BASE_URL + "/profile/getonlineprofile"
}
export const certificateProfile = {
    createCertificate : BASE_URL + "/profile/certificate",
    updateCertificate : BASE_URL + "/profile/updatecertificate",
    deleteCertificate : BASE_URL + "/profile/deletecertificate",
    getCertificate    : BASE_URL + "/profile/getcertificate"
}
export const skillprofile = {
    createSkillProfile : BASE_URL + "/profile/skillprofile",
    updateSkillProfile : BASE_URL + "/profile/updateskillprofile",
    deleteSkillProfile : BASE_URL + "/profile/deleteskillprofile",
    getSkillProfile    : BASE_URL + "/profile/getskillprofile"
}
export const projectProfile = {
    createProject : BASE_URL + "/profile/project",
    updateProject : BASE_URL + "/profile/updateproject",
    deleteProject : BASE_URL + "/profile/deleteproject",
    getProject    : BASE_URL + "/profile/getproject"
}
export const careerProfile = {
    createCareer : BASE_URL + "/profile/careerprofile",
    updateCareer : BASE_URL + "/profile/updatecareer",
    deleteCareer : BASE_URL + "/profile/deletecareer",
    getCareer    : BASE_URL + "/profile/getcareer"
}
export const educationProfile = {
    createEducationProfile : BASE_URL+"/profile/educationprofile",
    updateEducationProfile : BASE_URL+"/profile/updateeducation",
    deleteEducationProfile : BASE_URL+"/profile/deleteeducation",
    getEducationProfile    : BASE_URL+"/profile/geteducation"
}
export const employmentprofile = {
    createEmploymentProfile : BASE_URL + "/profile/employprofile",
    updateEmploymentProfile : BASE_URL + "/profile/updateemployprofile",
    deleteEmploymentProfile : BASE_URL + "/profile/deleteemployprofile",
    getEmploymentProfile    : BASE_URL + "/profile/getemployprofile"
}
export const companyPoint = {
    signupCompany_api        : BASE_URL + "/company/signup",
    loginCompany_api         : BASE_URL + "/company/login",
    updateCompany_api        : BASE_URL + "/company/update",
    deleteCompany_api        : BASE_URL + "/company/delete",
    getalldetailsCompany_api : BASE_URL + "/company/companydetails",
    uploadCompanyLogo        : BASE_URL + "/upload-logo",
}

export const recruiterPoint = {
    createRecruiter_api : BASE_URL + "/company/createrecruiter",
    updateRecruiter_api : BASE_URL + "/company/updaterecruiter",
    getRecruiter_api    : BASE_URL + "/company/getrecruiter",
    deleteRecruiter_api : BASE_URL + "/company/deleterecruiter",
    loginRecruiter_api  : BASE_URL + "/recruiter/login",
    createJob_api       : BASE_URL + "/recruiter/createjob",
    updateJob_api       : BASE_URL + "/recruiter/updatejob",
    deleteJob_api       : BASE_URL + "/recruiter/deletejob",
    getJob_api          : BASE_URL + "/recruiter/getjobrecruiter",

}
