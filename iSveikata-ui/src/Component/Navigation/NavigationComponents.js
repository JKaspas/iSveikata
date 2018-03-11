import React from 'react';
import icon from '../images/icon.png';
import '../../Frontpage.css';

var AdminNavigation = (props) =>{
    return (
    <nav className="navbar  navbar-inverse navbar-fixed-top" id="mainNav">
        <div className="container">
            <a className="navbar-brand" id="admin" href="#admin"><img src={icon} alt="Pagrindinis" id="icon"/></a>
            <ul className="nav navbar-nav navbar-left">
              <li><a className="" id="adminCreatePatient" href="#admin/create/patient">Registruoti naują pacientą</a></li>
              <li><a className="" id="adminCreateUser" href="#admin/create/user">Registruoti naują vartotoją</a></li>
              <li><a className="" id="adminBind" href="#admin/bind">Priskirti gydytojui pacientą</a></li>
              <li><a className="" href="#admin/password">Keisti slaptažodį</a></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
            <li><a className="" id="logout" href="#atsijungti">Atsijungti</a></li>
            </ul>
        </div>
    </nav>
    )
  }

  var DoctorNavigation = (props) =>{
    return (
    <nav className="navbar  navbar-inverse navbar-fixed-top" id="mainNav">
      <div className="container">
        <a className="navbar-brand" id="doctorDoctor" href="#gydytojas"><img src={icon} alt="Pagrindinis" id="icon"/></a>
        <ul className="nav navbar-nav navbar-left">
            <li><a className="" id="doctorPatient" href="#gydytojas/pacientai">Pacientai</a></li>
            <li><a className="" id="doctorStatistic" href="#gydytojas/statistika">Darbo dienų statistika</a></li>
            <li><a className="" id="doctorPassword" href="#gydytojas/slaptazodis">Keisti slaptažodį</a></li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
        	<li><a className="" id="logout" href="#atsijungti">Atsijungti</a></li>
        </ul>
      </div>
    </nav>
    )
  }

  
  var DruggistNavigation = (props) =>{
    return (
      <nav className="navbar  navbar-inverse navbar-fixed-top" id="mainNav">
      <div className="container">
        <a className="navbar-brand" id="druggist" href="#druggist"><img src={icon} alt="Pagrindinis" id="icon"/></a>
        <ul className="nav navbar-nav navbar-left">
            <li><a className="" id="druggistPassword" href="#druggist/password">Keisti slaptažodį</a></li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
        	<li><a className="" id="logout" href="#atsijungti">Atsijungti</a></li>
        </ul>
      </div>
    </nav>
    )
}
var PatientNavigation = (props) =>{
  return (
    <nav className="navbar  navbar-inverse navbar-fixed-top" id="mainNav">
    <div className="container">
      <a className="navbar-brand" id="patient" href="#patient"><img src={icon} alt="Pagrindinis" id="icon"/></a>
      <ul className="nav navbar-nav navbar-left">
            <li><a className="" id="patientRecord" href="#patient/record"><strong>Mano ligos istorijos įrašai</strong></a></li>
            <li><a className="" id="patientPrescription" href="#patient/prescription"><strong>Mano receptai</strong></a></li>
            <li><a className="" id="patientPassword" href="#patient/password">Keisti slaptažodį</a></li>
      </ul>
      <ul className="nav navbar-nav navbar-right">
        <li><a className="" id="logout" href="#atsijungti">Atsijungti</a></li>
      </ul>
    </div>
  </nav>
  )
}


var PublicNavigation = (props) =>{
    return (
      <nav className="navbar  navbar-inverse navbar-fixed-top" id="mainNav">
      <div className="container">
        <a className="navbar-brand" id="homeHome" href="#"><img src={icon} alt="Pagrindinis" id="icon"/></a>
        <ul className="nav navbar-nav">
	        <li><a className="" id="publicStatistic" href="#statistika">Vieša statistika</a></li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
        	<li><a className="" id="loginPatient" href="#pacientams">Prisijungimas pacientams</a></li>
	        <li><a className="" id="loginUsers" href="#vartotojams">Prisijungimas sistemos vartotojams</a></li>
      </ul>
      </div>
    </nav>
    )
}

export {PublicNavigation};
export {AdminNavigation};
export {DoctorNavigation};
export {DruggistNavigation};
export {PatientNavigation}