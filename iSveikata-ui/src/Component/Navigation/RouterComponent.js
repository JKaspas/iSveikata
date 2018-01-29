<<<<<<< HEAD
import React, {Component} from 'react'
import {Router, Route, IndexRoute, hashHistory} from 'react-router';

import PublicViewContainer from '../Container/PublicViewContainer';
import LoginContainer from '../Container/LoginContainer'
import AdminViewContainer from '../Container/AdminViewContainer';
import DoctorViewContainer from '../Container/DoctorViewContainer'
import DruggistViewContainer from '../Container/DruggistViewContainer'

import {InitialAdminApp, InitialPublicApp, InitialDoctorApp, InitialDruggistApp, NoMatch} from './InitialAppComponents'
=======
import React from 'react'
import {Router, Route, IndexRoute, hashHistory} from 'react-router';

import PublicViewContainer from '../Container/PublicViewContainer';
import UserLoginContainer from '../Container/UserLoginContainer'
import PatientLoginContainer from '../Container/PatientLoginContainer'
import AdminCreateUserContainer from '../Container/AdminContainer/AdminCreateUserContainer';
import DoctorViewContainer from '../Container/DoctorContainer/DoctorViewContainer'
import DruggistViewContainer from '../Container/DruggistContainer/DruggistViewContainer'
import AdminCreatePatientContainer from '../Container/AdminContainer/AdminCreatePatientContainer'
import AdminBindDoctorPartContainer from '../Container/AdminContainer/AdminBindDoctorPartContainer'
import AdminBindUserPartContainer from '../Container/AdminContainer/AdminBindUserPartContainer'
import DoctorRecordContainer from '../Container/DoctorContainer/DoctorRecordContainer'
import DoctorPatientViewContainer from '../Container/DoctorContainer/DoctorPatientViewContainer'
import PatientViewContainer from '../Container/PatientContainer/PatientViewContainer'
import PatientPasswordContainer from '../Container/PasswordComponent/PatientPasswordContainer'
import UserPasswordContainer from '../Container/PasswordComponent/UserPasswordContainer'
import {InitialAdminApp, InitialPublicApp, InitialDoctorApp, InitialDruggistApp, InitialPatientApp, NoMatch} from './InitialAppComponents'
import LogoutContainer from '../Container/LogoutContainer';
>>>>>>> 2d602e76cbc91ea456d59088c4f7f46af6c4c95c


var RouteComponent = () =>{
    return (
      <Router history={hashHistory}  >
          <Route path="/" component={InitialPublicApp} >
            <IndexRoute component={PublicViewContainer} />
            <Route path="/" component={PublicViewContainer} />
<<<<<<< HEAD
            <Route path="/pacientams" component={LoginContainer} />
            <Route path="/vartotojams" component={LoginContainer} />
          </Route>
          <Route path="/admin" component={InitialAdminApp} >
            <IndexRoute component={AdminViewContainer} />
            <Route path="/admin/create" component={AdminViewContainer} />
            <Route path="/admin/edit" component={AdminViewContainer} />
            <Route path="/admin/bind" component={AdminViewContainer} />
=======
            <Route path="/pacientams" component={PatientLoginContainer} />
            <Route path="/vartotojams" component={UserLoginContainer} />
            <Route path="/atsijungti" component={LogoutContainer} />
          </Route>
          <Route path="/admin" component={InitialAdminApp} >
            <IndexRoute component={AdminCreatePatientContainer} />
            <Route path="/admin/create/user" component={AdminCreateUserContainer} />
            <Route path="/admin/create/patient" component={AdminCreatePatientContainer} />
            <Route path="/admin/edit" component={NoMatch} />
            <Route path="/admin/bind" component={AdminBindDoctorPartContainer} />
            <Route path="/admin/bind/:userName" component={AdminBindUserPartContainer} />
            <Route path="/admin/password" component={UserPasswordContainer} />
>>>>>>> 2d602e76cbc91ea456d59088c4f7f46af6c4c95c
            <Route path="*" component={NoMatch}/>
          </Route>
          <Route path="/doctor" component={InitialDoctorApp} >
            <IndexRoute component={DoctorViewContainer} />
<<<<<<< HEAD
            <Route path="/doctor" component={DoctorViewContainer} />
=======
            <Route path="/doctor/patient" component={DoctorViewContainer} />
            <Route path="/doctor/:userName/patient/:patientId" component={DoctorRecordContainer} />
            <Route path="/doctor/patient/:patientId/view" component={DoctorPatientViewContainer} />
            <Route path="/doctor/password" component={UserPasswordContainer} />
>>>>>>> 2d602e76cbc91ea456d59088c4f7f46af6c4c95c
            <Route path="*" component={NoMatch}/>
          </Route>
          <Route path="/druggist" component={InitialDruggistApp} >
            <IndexRoute component={DruggistViewContainer} />
<<<<<<< HEAD
            <Route path="/doctor" component={DruggistViewContainer} />
=======
            <Route path="/druggist" component={DruggistViewContainer} />
            <Route path="/druggist/password" component={UserPasswordContainer} />
            <Route path="*" component={NoMatch}/>
          </Route>
          <Route path="/patient" component={InitialPatientApp} >
            <IndexRoute component={PatientViewContainer} />
            <Route path="/patient" component={PatientViewContainer} />
            <Route path="/patient/password" component={PatientPasswordContainer} />
>>>>>>> 2d602e76cbc91ea456d59088c4f7f46af6c4c95c
            <Route path="*" component={NoMatch}/>
          </Route>
      </Router>)
  }

  export default RouteComponent;