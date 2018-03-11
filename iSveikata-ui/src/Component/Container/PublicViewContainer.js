import React, {Component} from 'react';
import {connect} from 'react-redux';

import statistics from '../images/statistics.png';
import system_users from '../images/system_users.png';
import patients from '../images/patients.png';
import logo from '../images/logo.png';
import lr_logo from '../images/lr_logo.png';

import '../../Frontpage.css';


class PublicViewContainer extends Component{



    load = () =>{     }

    render() {
        return (
            <div>
                <header className="text-black">
                    <div className="container">
                        <img  src={logo} alt="iSveikata" id="logo"/>
                        {/* <button className="btn btn-success" onClick={this.load}>Load</button> */}
                    </div>
                </header>
                <section>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 ">
                                <div className="col-sm-4">
                                    <a href="#pacientams" id="publicPatient" className="thumbnail">
                                    <img  src={patients} alt="Prisijungimas pacientams" id="patients"/>
                                    <h4 className="text-center">Prisijungimas pacientams</h4>
                                    </a>
                                </div>
                                <div className="col-sm-4">
                                    <a href="#statistika" id="publicStatistic" className="thumbnail">
                                    <img  src={statistics} alt="Vieša statistika" id="statistics"/>
                                    <h4 className="text-center">Vieša statistika</h4>
                                    </a>
                                </div>
                                <div className="col-sm-4">
                                    <a href="#vartotojams" id="publicUsers" className="thumbnail">
                                    <img  src={system_users} alt="Prisijungimas sistemos vartotojams" id="users"/>
                                    <h4 className="text-center">Prisijungimas sistemos vartotojams</h4>
                                    </a>
                                </div>    
                            </div>
                        </div>
                    </div>
                </section>
                {/* <PublicViewComponent/> */}
                <footer>
                    <div>
                        <p className="inline" id="footerLink">
                            <a href="http://sam.lrv.lt" id="imgLink"><img src={lr_logo} alt="SAM" id="lrlogo"/></a>
                            Lietuvos Respublikos sveikatos apsaugos ministerija
                        </p>
                        <p className="inline" id="footerText">
                            Sprendimas: DTFG
                        </p>    
                    </div>
                </footer>
            </div>
        )
    }
}


const mapStateToProps = (state) =>{
    return{
        user:state.user
    }
}
  
export default connect(mapStateToProps)(PublicViewContainer);
  