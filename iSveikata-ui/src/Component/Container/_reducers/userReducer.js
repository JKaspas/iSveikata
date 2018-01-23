

export default function user( state={
    userType:'',
    userName:'',
    loggedIn:'false',
    doctorList:[],
    patientList:[]
   }, action){
    // if(action.type === "INC"){
    //   return {...state, number:action.payload};
    // }else if(action.type === "DEC"){
    //   return {...state, number:action.payload}
    // }
      switch (action.type){
          case "USER_LOGGED_IN":{
              return {...state, loggedIn:action.loggedIn, userType:action.userType, userName:action.userName}
          }
          case "USER_LOGGED_OUT":{
              return {...state, loggedIn:false, userType:'', userName:''}
          }
          case "USER_UPDATE_DOCTOR_LIST":{
              return {...state, doctorList:action.payload}
          }
          case "USER_UPDATE_PATIENT_LIST":{
            return {...state, patientList:action.payload}
        }
          default:{
              return state
          }
          
      }
  }