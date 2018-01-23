

export const patientLoggedIn = (patientId) =>{
    return{
        type:'PATIENT_LOGGED_IN', payload:patientId
    }
}

export const patientLoggedOut = () =>{
    return{
        type:'PATIENT_LOGGED_OUT'
    }
}