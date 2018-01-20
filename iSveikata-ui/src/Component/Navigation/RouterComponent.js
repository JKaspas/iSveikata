import React from 'react'
import {Router, Route, IndexRoute, hashHistory} from 'react-router';

import PublicViewContainer from '../Container/PublicViewContainer';
import UserLoginContainer from '../Container/UserLoginContainer'
import PatientLoginContainer from '../Container/PatientLoginContainer'
import AdminCreateUserContainer from '../Container/AdminCreateUserContainer';
import DoctorViewContainer from '../Container/DoctorContainer/DoctorViewContainer'
import DruggistViewContainer from '../Container/DruggistContainer/DruggistViewContainer'
import AdminCreatePatientContainer from '../Container/AdminCreatePatientContainer'
import AdminBindDoctorPartContainer from '../Container/AdminBindDoctorPartContainer'
import AdminBindUserPartContainer from '../Container/AdminBindUserPartContainer'
import DoctorRecordContainer from '../Container/DoctorContainer/DoctorRecordContainer'
import DoctorPatientViewContainer from '../Container/DoctorContainer/DoctorPatientViewContainer'

import {InitialAdminApp, InitialPublicApp, InitialDoctorApp, InitialDruggistApp, InitialPatientApp, NoMatch} from './InitialAppComponents'


var RouteComponent = () =>{
    return (
      <Router history={hashHistory}  >
          <Route path="/" component={InitialPublicApp} >
            <IndexRoute component={PublicViewContainer} />
            <Route path="/" component={PublicViewContainer} />
            <Route path="/pacientams" component={PatientLoginContainer} />
            <Route path="/vartotojams" component={UserLoginContainer} />
          </Route>
          <Route path="/admin" component={InitialAdminApp} >
            <IndexRoute component={AdminCreatePatientContainer} />
            <Route path="/admin/create/user" component={AdminCreateUserContainer} />
            <Route path="/admin/create/patient" component={AdminCreatePatientContainer} />
            <Route path="/admin/edit" component={NoMatch} />
            <Route path="/admin/bind" component={AdminBindDoctorPartContainer} />
            <Route path="/admin/bind/:userName" component={AdminBindUserPartContainer} />
            <Route path="/admin/password" component={NoMatch} />
            <Route path="*" component={NoMatch}/>
          </Route>
          <Route path="/doctor" component={InitialDoctorApp} >
            <IndexRoute component={DoctorViewContainer} />
            <Route path="/doctor/patient" component={DoctorViewContainer} />
            <Route path="/doctor/:userName/patient/:patientId" component={DoctorRecordContainer} />
            <Route path="/doctor/patient/:patientId/view" component={DoctorPatientViewContainer} />
            <Route path="/doctor/password" component={NoMatch} />
            <Route path="*" component={NoMatch}/>
          </Route>
          <Route path="/druggist" component={InitialDruggistApp} >
            <IndexRoute component={DruggistViewContainer} />
            <Route path="/druggist" component={DruggistViewContainer} />
            <Route path="/druggist/password" component={NoMatch} />
            <Route path="*" component={NoMatch}/>
          </Route>
          <Route path="/patient" component={InitialPatientApp} >
            <IndexRoute component={NoMatch} />
            <Route path="/patient" component={NoMatch} />
            <Route path="/patient/password" component={NoMatch} />
            <Route path="*" component={NoMatch}/>
          </Route>
      </Router>)
  }

  export default RouteComponent;