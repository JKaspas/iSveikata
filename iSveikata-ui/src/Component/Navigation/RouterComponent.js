import React, {Component} from 'react'
import {Router, Route, IndexRoute, hashHistory} from 'react-router';

import PublicViewContainer from '../Container/PublicViewContainer';
import LoginContainer from '../Container/LoginContainer'
import AdminViewContainer from '../Container/AdminViewContainer';
import DoctorViewContainer from '../Container/DoctorViewContainer'
import DruggistViewContainer from '../Container/DruggistViewContainer'

import {InitialAdminApp, InitialPublicApp, InitialDoctorApp, InitialDruggistApp, NoMatch} from './InitialAppComponents'


var RouteComponent = () =>{
    return (
      <Router history={hashHistory}  >
          <Route path="/" component={InitialPublicApp} >
            <IndexRoute component={PublicViewContainer} />
            <Route path="/" component={PublicViewContainer} />
            <Route path="/pacientams" component={LoginContainer} />
            <Route path="/vartotojams" component={LoginContainer} />
          </Route>
          <Route path="/admin" component={InitialAdminApp} >
            <IndexRoute component={AdminViewContainer} />
            <Route path="/admin/create" component={AdminViewContainer} />
            <Route path="/admin/edit" component={AdminViewContainer} />
            <Route path="/admin/bind" component={AdminViewContainer} />
            <Route path="*" component={NoMatch}/>
          </Route>
          <Route path="/doctor" component={InitialDoctorApp} >
            <IndexRoute component={DoctorViewContainer} />
            <Route path="/doctor" component={DoctorViewContainer} />
            <Route path="*" component={NoMatch}/>
          </Route>
          <Route path="/druggist" component={InitialDruggistApp} >
            <IndexRoute component={DruggistViewContainer} />
            <Route path="/doctor" component={DruggistViewContainer} />
            <Route path="*" component={NoMatch}/>
          </Route>
      </Router>)
  }

  export default RouteComponent;