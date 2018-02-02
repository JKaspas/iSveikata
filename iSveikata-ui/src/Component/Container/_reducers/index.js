import { combineReducers } from 'redux';


import patient from './patientReducer';
import user from './userReducer';


const rootReducer = combineReducers({
  user:user,
  patient:patient
});

export default rootReducer;