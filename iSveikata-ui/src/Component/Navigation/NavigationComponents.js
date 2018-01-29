<<<<<<< HEAD
import React, {Component} from 'react'
=======
import React from 'react'
>>>>>>> 2d602e76cbc91ea456d59088c4f7f46af6c4c95c

var AdminNavigation = (props) =>{
    return (
    <nav className="navbar  navbar-inverse navbar-fixed-top" id="mainNav">
        <div className="container">
<<<<<<< HEAD
            <a className="navbar-brand" href="#admin/create">iSveikata</a>
            <ul className="nav navbar-nav navbar-left">
            <li><a className="" href="#admin/create">Kurti</a></li>
            <li><a className="" href="#admin/edit">Redaguoti</a></li>
            <li><a className="" href="#admin/bind">Apjungti</a></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
            <li><a className="" href="#">Atsijungti</a></li>
=======
            <a className="navbar-brand" href="#admin">iSveikata</a>
            <ul className="nav navbar-nav navbar-left">
              <li><a className="" href="#admin/create/patient">Kurti pacienta</a></li>
              <li><a className="" href="#admin/create/user">Kurti vartotoja</a></li>
              {/* <li><a className="" href="#admin/edit">Redaguoti</a></li> */}
              <li><a className="" href="#admin/bind">Apjungti</a></li>
              <li><a className="" href="#admin/password">Slaptažodis</a></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
            <li><a className="" href="#atsijungti">Atsijungti</a></li>
>>>>>>> 2d602e76cbc91ea456d59088c4f7f46af6c4c95c
            </ul>
        </div>
    </nav>
    )
  }

  var DoctorNavigation = (props) =>{
    return (
    <nav className="navbar  navbar-inverse navbar-fixed-top" id="mainNav">
      <div className="container">
        <a className="navbar-brand" href="#doctor">iSveikata</a>
<<<<<<< HEAD
        <ul className="nav navbar-nav navbar-right">
        	<li><a className="" href="#">Atsijungti</a></li>
=======
        <ul className="nav navbar-nav navbar-left">
            <li><a className="" href="#doctor/patient">Pacientai</a></li>
            <li><a className="" href="#doctor/password">Slaptažodis</a></li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
        	<li><a className="" href="#atsijungti">Atsijungti</a></li>
>>>>>>> 2d602e76cbc91ea456d59088c4f7f46af6c4c95c
        </ul>
      </div>
    </nav>
    )
  }

  
  var DruggistNavigation = (props) =>{
    return (
      <nav className="navbar  navbar-inverse navbar-fixed-top" id="mainNav">
      <div className="container">
        <a className="navbar-brand" href="#druggist">iSveikata</a>
<<<<<<< HEAD
        <ul className="nav navbar-nav navbar-right">
        	<li><a className="" href="#">Atsijungti</a></li>
=======
        <ul className="nav navbar-nav navbar-left">
            <li><a className="" href="#druggist/password">Slaptažodis</a></li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
        	<li><a className="" href="#atsijungti">Atsijungti</a></li>
>>>>>>> 2d602e76cbc91ea456d59088c4f7f46af6c4c95c
        </ul>
      </div>
    </nav>
    )
}
<<<<<<< HEAD
=======
var PatientNavigation = (props) =>{
  return (
    <nav className="navbar  navbar-inverse navbar-fixed-top" id="mainNav">
    <div className="container">
      <a className="navbar-brand" href="#patient">iSveikata</a>
      <ul className="nav navbar-nav navbar-left">
            <li><a className="" href="#patient">Pagrindinis</a></li>
            <li><a className="" href="#patient/password">Slaptažodis</a></li>
      </ul>
      <ul className="nav navbar-nav navbar-right">
        <li><a className="" href="#atsijungti">Atsijungti</a></li>
      </ul>
    </div>
  </nav>
  )
}
>>>>>>> 2d602e76cbc91ea456d59088c4f7f46af6c4c95c


var PublicNavigation = (props) =>{
    return (
      <nav className="navbar  navbar-inverse navbar-fixed-top" id="mainNav">
      <div className="container">
        <a className="navbar-brand" href="#">iSveikata</a>
        <ul className="nav navbar-nav navbar-right">
        	<li><a className="" href="#pacientams">Prisijungimas pacientams</a></li>
	        <li><a className="" href="#vartotojams">Prisijungimas sistemos vartotojams</a></li>
      </ul>
      </div>
    </nav>
    )
}

<<<<<<< HEAD
export var PublicNavigation = PublicNavigation;
export var AdminNavigation = AdminNavigation;
export var DoctorNavigation = DoctorNavigation;
export var DruggistNavigation = DruggistNavigation;
=======
export {PublicNavigation};
export {AdminNavigation};
export {DoctorNavigation};
export {DruggistNavigation};
export {PatientNavigation}
>>>>>>> 2d602e76cbc91ea456d59088c4f7f46af6c4c95c
