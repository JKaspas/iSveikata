import React from 'react'
import {Router, Route, IndexRoute, hashHistory} from 'react-router';

import PublicViewContainer from '../Container/PublicViewContainer';
import PublicStatisticContainer from '../Container/PublicStatisticContainer'

import UserLoginContainer from '../Container/UserLoginContainer'
import PatientLoginContainer from '../Container/PatientLoginContainer'
import AdminCreateUserContainer from '../Container/AdminContainer/AdminCreateUserContainer';
import AdminCreatePatientContainer from '../Container/AdminContainer/AdminCreatePatientContainer'
import AdminBindDoctorPartContainer from '../Container/AdminContainer/AdminBindDoctorPartContainer'
import AdminBindUserPartContainer from '../Container/AdminContainer/AdminBindUserPartContainer'
import AdminViewContainer from '../Container/AdminContainer/AdminViewContainer'

import DoctorViewContainer from '../Container/DoctorContainer/DoctorViewContainer'
import DoctorRecordContainer from '../Container/DoctorContainer/DoctorRecordContainer'
import DoctorPrescriptionContainer from '../Container/DoctorContainer/DoctorPrescriptionContainer'
import DoctorPatientViewContainer from '../Container/DoctorContainer/DoctorPatientViewContainer'
import DoctorPatientListViewContainer from '../Container/DoctorContainer/DoctorPatientListViewContainer'
import DoctorStatisticContainer from '../Container/DoctorContainer/DoctorStatisticContainer'

import DruggistViewContainer from '../Container/DruggistContainer/DruggistViewContainer'
import DruggistPrescriptionViewContainer from '../Container/DruggistContainer/DruggistPrescriptionViewContainer'

import PatientRecordContainer from '../Container/PatientContainer/PatientRecordContainer'
import PatientPrescriptionContainer from '../Container/PatientContainer/PatientPrescriptionContainer'
import PatientPasswordContainer from '../Container/PasswordComponent/PatientPasswordContainer'
import UserPasswordContainer from '../Container/PasswordComponent/UserPasswordContainer'
import {InitialAdminApp, InitialPublicApp, InitialDoctorApp, InitialDruggistApp, InitialPatientApp, NoMatch} from './InitialAppComponents'
import LogoutContainer from '../Container/LogoutContainer';

import GeneruotiIrasus from '../Container/Generators/GeneruotiIrasus'



var RouteComponent = () =>{
    return (
      <Router history={hashHistory}  >
          <Route path="/" component={InitialPublicApp} >
            <IndexRoute component={PublicViewContainer} />
            <Route path="/" component={PublicViewContainer} />
            <Route path="/statistika" component={PublicStatisticContainer} />
            <Route path="/pacientams" component={PatientLoginContainer} />

            <Route path="/vartotojams" component={UserLoginContainer} />
          
            <Route path="/atsijungti" component={LogoutContainer} />
            <Route path="/generuoti" component={GeneruotiIrasus} />
          </Route>

          <Route path="/admin" component={InitialAdminApp} >
            <IndexRoute component={AdminViewContainer} />
            <Route path="/admin/create/user" component={AdminCreateUserContainer} />
            <Route path="/admin/create/patient" component={AdminCreatePatientContainer} />
            <Route path="/admin/edit" component={NoMatch} />
            <Route path="/admin/bind" component={AdminBindDoctorPartContainer} />
            <Route path="/admin/bind/:userName" component={AdminBindUserPartContainer} />

            <Route path="/admin/password" component={UserPasswordContainer} /> 
         

            <Route path="*" component={NoMatch}/>
          </Route>

          <Route path="/gydytojas" component={InitialDoctorApp} >
            <IndexRoute component={DoctorViewContainer} />
            <Route path="/gydytojas/pacientai" component={DoctorPatientListViewContainer} />
            <Route path="/gydytojas/statistika" component={DoctorStatisticContainer} />
            <Route path="/doctor/patient/record" component={DoctorRecordContainer} />
            <Route path="/doctor/patient/prescription" component={DoctorPrescriptionContainer} />
            <Route path="/gydytojas/pacientas/perziura" component={DoctorPatientViewContainer} />
            <Route path="/gydytojas/slaptazodis" component={UserPasswordContainer} />
            <Route path="*" component={NoMatch}/>
          </Route>

          <Route path="/druggist" component={InitialDruggistApp} >
            <IndexRoute component={DruggistViewContainer} />
            <Route path="/druggist" component={DruggistViewContainer} />
            <Route path="/vaistininkas/pacientas/:patientId/receptai" component={DruggistPrescriptionViewContainer} />
            <Route path="/druggist/password" component={UserPasswordContainer} />
            <Route path="*" component={NoMatch}/>
          </Route>
          <Route path="/patient" component={InitialPatientApp} >
            <IndexRoute component={PatientRecordContainer} />
            <Route path="/patient/record" component={PatientRecordContainer} />
            <Route path="/patient/prescription" component={PatientPrescriptionContainer} />
            <Route path="/patient/password" component={PatientPasswordContainer} />
            <Route path="*" component={NoMatch}/>
          </Route>
      </Router>)
  }

  export default RouteComponent;