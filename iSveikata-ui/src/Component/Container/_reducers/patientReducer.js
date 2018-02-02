

export default function patient( state={ 
    loggedIn:false,
    patientId:'',
}, action){
      switch (action.type){
          case "PATIENT_LOGGED_IN":{
              return {...state, loggedIn:true, patientId:action.payload}
          }
          case "PATIENT_LOGGED_OUT":{
              return {...state, loggedIn:false, patientId:''}
          }
          default:{
              return state
          }
          
      }
  }