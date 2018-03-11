import React, {Component} from 'react';
import {connect} from 'react-redux';

import logo from '../../images/logo.png';
import '../../../Frontpage.css';

class AdminViewContainer extends Component{
    constructor(props){
        super(props)
        this.session = JSON.parse(sessionStorage.getItem('session'))
        this.state = {
        }
    }

    //before mount check state of session exist and session user state (loggetIn, userType)
    componentWillMount = () =>{
        if(this.session === null || this.session.user.loggedIn !== true || this.session.user.userType !== 'admin'){
            this.props.router.push('/vartotojams');
            return '';
        }     
    }
    

    render() {
        return (
            <div>
                <header className="text-black">
                    <div className="container text-center">
                        <img  src={logo} alt="iSveikata" id="logo"/>
                    </div>
                </header>
                <section>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 ">
                                <div className="col-sm-4">
                                    <a href="#admin/create/patient" id="adminRegisterPatient" className="thumbnail">
                                    {/* <img  src={patient} alt=""/> */}
                                    <h4 className="text-center">Registruoti naują pacientą</h4>
                                    </a>
                                </div>
                                <div className="col-sm-4">
                                    <a href="#admin/create/user" id="adminRegisterUser" className="thumbnail">
                                    {/* <img  src={statistic} alt=""/> */}
                                    <h4 className="text-center">Registruoti naują vartotoją</h4>
                                    </a>
                                </div>
                                <div className="col-sm-4">
                                    <a href="#admin/bind" id="adminBindDoctorPatient" className="thumbnail">
                                    {/* <img  src={doctor} alt=""/> */}
                                    <h4 className="text-center">Priskirti gydytojui pacientą</h4>
                                    </a>
                                </div>   
                            </div>
                        </div>
                    </div>
                </section>
            </div>)
    }
}


//map reduxe store state to container props
const mapStateToProps = (state) =>{
    return{
        user:state.user
    }
}

export default connect(mapStateToProps)(AdminViewContainer)