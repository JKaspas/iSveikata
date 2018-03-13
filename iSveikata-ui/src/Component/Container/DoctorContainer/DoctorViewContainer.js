import React, {Component} from 'react';
import {connect} from 'react-redux';

import logo from '../../images/logo.png';
import lr_logo from '../../images/lr_logo.png';

import '../../../Frontpage.css';

class DoctorViewContainer extends Component{
    constructor(props){
        super(props)
        this.session = JSON.parse(sessionStorage.getItem('session'))
        this.state = {
        }
    }

    //before mount check state of session exist and session user state (loggetIn, userType)
    componentWillMount = () =>{
        if(this.session === null || this.session.user.loggedIn !== true || this.session.user.userType !== 'doctor'){
            this.props.router.push('/vartotojams');
            return '';
        }   
    } 
    

    render() {
        return (
            <div>
                <header className="text-black">
                    <div className="container">
                        <img  src={logo} alt="iSveikata" id="logo"/>
                    </div>
                </header>
                <body>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-4">
                                <a href="#gydytojas/pacientai" id="doctorViewPatient" className="thumbnail">
                                {/* <img  src={patient} alt=""/> */}
                                <h4 className="text-center">Peržiūrėti pacientų duomenis</h4>
                                </a>
                            </div>
                            <div className="col-sm-4">
                                <a href="#gydytojas/statistika" id="doctorViewStatistic" className="thumbnail">
                                {/* <img  src={statistic} alt=""/> */}
                                <h4 className="text-center">Peržiūrėti darbo dienų statistiką</h4>
                                </a>
                            </div>
                            <div className="col-sm-4">
                                <a href="#gydytojas/slaptazodis" id="doctorChangePassword" className="thumbnail">
                                {/* <img  src={doctor} alt=""/> */}
                                <h4 className="text-center">Keisti slaptažodį</h4>
                                </a>
                            </div> 
                        </div>
                    </div>
                </body>
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


//map reduxe store state to container props
const mapStateToProps = (state) =>{
    return{
        user:state.user
    }
}

export default connect(mapStateToProps)(DoctorViewContainer)