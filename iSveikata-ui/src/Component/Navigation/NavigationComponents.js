import React from 'react'

var AdminNavigation = (props) =>{
    return (
    <nav className="navbar  navbar-inverse navbar-fixed-top" id="mainNav">
        <div className="container">
            <a className="navbar-brand" href="#admin">iSveikata</a>
            <ul className="nav navbar-nav navbar-left">
              <li><a className="" href="#admin/create/patient">Registruoti naują pacientą</a></li>
              <li><a className="" href="#admin/create/user">Registruoti naują vartotoją</a></li>
              {/* <li><a className="" href="#admin/edit">Redaguoti</a></li> */}
              <li><a className="" href="#admin/bind">Priskirti gydytojui pacientą</a></li>
              <li><a className="" href="#admin/password">Keisti slaptažodį</a></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
            <li><a className="" href="#atsijungti">Atsijungti</a></li>
            </ul>
        </div>
    </nav>
    )
  }

  var DoctorNavigation = (props) =>{
    return (
    <nav className="navbar  navbar-inverse navbar-fixed-top" id="mainNav">
      <div className="container">
        <a className="navbar-brand" href="#gydytojas">iSveikata</a>
        <ul className="nav navbar-nav navbar-left">
            <li><a className="" href="#gydytojas">Pradžia</a></li>
            <li><a className="" href="#gydytojas/pacientai">Pacientai</a></li>
            <li><a className="" href="#gydytojas/statistika">Darbo statistika</a></li>
            <li><a className="" href="#gydytojas/slaptazodis">Keisti slaptažodį</a></li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
        	<li><a className="" href="#atsijungti">Atsijungti</a></li>
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
        <ul className="nav navbar-nav navbar-left">
            <li><a className="" href="#druggist/password">Keisti slaptažodį</a></li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
        	<li><a className="" href="#atsijungti">Atsijungti</a></li>
        </ul>
      </div>
    </nav>
    )
}
var PatientNavigation = (props) =>{
  return (
    <nav className="navbar  navbar-inverse navbar-fixed-top" id="mainNav">
    <div className="container">
      <a className="navbar-brand" href="#patient">iSveikata</a>
      <ul className="nav navbar-nav navbar-left">
            <li><a className="" href="#patient/record"><strong>Mano ligos istorijos įrašai</strong></a></li>
            <li><a className="" href="#patient/prescription"><strong>Mano receptai</strong></a></li>
            <li><a className="" href="#patient/password">Keisti slaptažodį</a></li>
      </ul>
      <ul className="nav navbar-nav navbar-right">
        <li><a className="" href="#atsijungti">Atsijungti</a></li>
      </ul>
    </div>
  </nav>
  )
}


var PublicNavigation = (props) =>{
    return (
      <nav className="navbar  navbar-inverse navbar-fixed-top" id="mainNav">
      <div className="container">
        <a className="navbar-brand" href="#">iSveikata</a>
        <ul className="nav navbar-nav">
        	<li><a className="" href="#">Pradžia</a></li>
	        <li><a className="" href="#statistika">Vieša statistika</a></li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
        	<li><a className="" href="#pacientams">Prisijungimas pacientams</a></li>
	        <li><a className="" href="#vartotojams">Prisijungimas sistemos vartotojams</a></li>
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