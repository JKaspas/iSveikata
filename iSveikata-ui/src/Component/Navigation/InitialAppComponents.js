import React, {Component} from 'react'

import {AdminNavigation, PublicNavigation, DoctorNavigation, DruggistNavigation} from './NavigationComponents';


var InitialPublicApp = (props) =>{
    return (
    <div>
      <PublicNavigation />
      {props.children}
    </div>)
  }
  
  var InitialAdminApp = (props) =>{
    return (
    <div>
      <AdminNavigation />
      {props.children}
    </div>)
  }
  var InitialDoctorApp = (props) =>{
    return (
    <div>
      <DoctorNavigation />
      {props.children}
    </div>)
  }
  var InitialDruggistApp = (props) =>{
    return (
    <div>
      <DruggistNavigation />
      {props.children}
    </div>)
  }
  var NoMatch = () =>{
    return (<div className='container'><section>URL no match</section></div>)
  }

export var InitialAdminApp = InitialAdminApp;
export var InitialPublicApp = InitialPublicApp;
export var InitialDoctorApp = InitialDoctorApp;
export var InitialDruggistApp = InitialDruggistApp;
export var NoMatch = NoMatch;