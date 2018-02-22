

export default function doctor( state={
    patientId:''
   }, action){
   
      switch (action.type){
          case "DOCTOR_VIEW_PATIENT":{
              return {...state, patientId:action.payload}
          }
          default:{
              return state
          }
          
      }
  }