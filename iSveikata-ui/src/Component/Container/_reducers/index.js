import { combineReducers } from 'redux';


import patient from './patientReducer';
import user from './userReducer';
import doctor from './doctorReducer'


const rootReducer = combineReducers({
  user:user,
  patient:patient,
  doctor:doctor
});

export default rootReducer;