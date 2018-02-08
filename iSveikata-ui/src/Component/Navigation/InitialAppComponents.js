import React from 'react'

import {AdminNavigation, PublicNavigation, DoctorNavigation, DruggistNavigation, PatientNavigation} from './NavigationComponents';


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
  var InitialPatientApp = (props) =>{
    return (
    <div>
      <PatientNavigation />
      {props.children}
    </div>)
  }
  var NoMatch = () =>{
    return (<div className='container'><section>Puslapis nerastas</section></div>)
  }

export {InitialAdminApp}
export {InitialPublicApp}
export {InitialDoctorApp}
export {InitialDruggistApp}
export {InitialPatientApp}
export {NoMatch}