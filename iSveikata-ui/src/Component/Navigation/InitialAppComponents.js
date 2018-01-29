<<<<<<< HEAD
import React, {Component} from 'react'

import {AdminNavigation, PublicNavigation, DoctorNavigation, DruggistNavigation} from './NavigationComponents';
=======
import React from 'react'

import {AdminNavigation, PublicNavigation, DoctorNavigation, DruggistNavigation, PatientNavigation} from './NavigationComponents';
>>>>>>> 2d602e76cbc91ea456d59088c4f7f46af6c4c95c


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
<<<<<<< HEAD
=======
  var InitialPatientApp = (props) =>{
    return (
    <div>
      <PatientNavigation />
      {props.children}
    </div>)
  }
>>>>>>> 2d602e76cbc91ea456d59088c4f7f46af6c4c95c
  var NoMatch = () =>{
    return (<div className='container'><section>URL no match</section></div>)
  }

<<<<<<< HEAD
export var InitialAdminApp = InitialAdminApp;
export var InitialPublicApp = InitialPublicApp;
export var InitialDoctorApp = InitialDoctorApp;
export var InitialDruggistApp = InitialDruggistApp;
export var NoMatch = NoMatch;
=======
export {InitialAdminApp}
export {InitialPublicApp}
export {InitialDoctorApp}
export {InitialDruggistApp}
export {InitialPatientApp}
export {NoMatch}
>>>>>>> 2d602e76cbc91ea456d59088c4f7f46af6c4c95c
