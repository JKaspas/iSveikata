

export const userLoggedIn = (userType, userName) =>{
    return{
        type:'USER_LOGGED_IN', loggedIn:true, userType:userType, userName:userName
    }
}

export const userLoggedOut = () =>{
    return{
        type:'USER_LOGGED_OUT'
    }
}