import React, {Component} from 'react'

var AdminNavigation = (props) =>{
    return (
    <nav className="navbar  navbar-inverse navbar-fixed-top" id="mainNav">
        <div className="container">
            <a className="navbar-brand" href="#admin/create">iSveikata</a>
            <ul className="nav navbar-nav navbar-left">
            <li><a className="" href="#admin/create">Kurti</a></li>
            <li><a className="" href="#admin/edit">Redaguoti</a></li>
            <li><a className="" href="#admin/bind">Apjungti</a></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
            <li><a className="" href="#">Atsijungti</a></li>
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
        <ul className="nav navbar-nav navbar-right">
        	<li><a className="" href="#">Atsijungti</a></li>
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
        <ul className="nav navbar-nav navbar-right">
        	<li><a className="" href="#">Atsijungti</a></li>
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
        <ul className="nav navbar-nav navbar-right">
        	<li><a className="" href="#pacientams">Prisijungimas pacientams</a></li>
	        <li><a className="" href="#vartotojams">Prisijungimas sistemos vartotojams</a></li>
      </ul>
      </div>
    </nav>
    )
}

export var PublicNavigation = PublicNavigation;
export var AdminNavigation = AdminNavigation;
export var DoctorNavigation = DoctorNavigation;
export var DruggistNavigation = DruggistNavigation;