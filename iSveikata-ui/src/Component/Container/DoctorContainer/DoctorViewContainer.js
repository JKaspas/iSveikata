import React, {Component} from 'react'
import {connect} from 'react-redux'

import {doctorApiList, doctorIcdList} from '../../Container/_action'



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
        //get API list
        doctorApiList()

        //get ICD list 
        doctorIcdList()
       
    }
    


    render() {
        return (
            <div>
                <header className="bg-primary text-white">
                    <div className="container text-center">
                        <h1>iSveikata</h1>
                        <p className="lead">Sveikatos priežiūros sistema</p>
                    </div>
                
                <section>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 ">
                                <div className="col-sm-4">
                                    <a href="#gydytojas/pacientai" className="thumbnail">
                                    {/* <img  src={patient} alt="Mountain View"/> */}
                                    <h4 className="text-center">Peržiūrėti pacientus</h4>
                                    </a>
                                </div>
                                <div className="col-sm-4">
                                    <a href="#gydytojas/statistika" className="thumbnail">
                                    {/* <img  src={statistic} alt="Mountain View"/> */}
                                    <h4 className="text-center">Peržiūrėti darbo statistiką</h4>
                                    </a>
                                </div>
                                <div className="col-sm-4">
                                    <a href="#gydytojas/slaptazodis" className="thumbnail">
                                    {/* <img  src={doctor} alt="Mountain View"/> */}
                                    <h4 className="text-center">Keisti slaptažodi</h4>
                                    </a>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </section>
                </header>
            </div>)
    }
}


//map reduxe store state to container props
const mapStateToProps = (state) =>{
    return{
        user:state.user
    }
}

export default connect(mapStateToProps)(DoctorViewContainer)