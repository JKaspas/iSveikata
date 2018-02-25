import React, {Component} from 'react'
import {connect} from 'react-redux'



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
                <header className="bg-primary text-white">
                    <div className="container text-center">
                        <h1>iSveikata</h1>
                        <p className="lead">Sveikatos priežiūros sistema</p>
                    </div>
                
                <section>
                    <div className="container">
                        <div class="row">
                            <div className="col-sm-12 ">
                                <div class="col-sm-4">
                                    <a href="#gydytojas/pacientai" class="thumbnail">
                                    {/* <img  src={patient} alt="Mountain View"/> */}
                                    <h4 className="text-center">Peržiūrėti pacientus</h4>
                                    </a>
                                </div>
                                <div class="col-sm-4">
                                    <a href="#gydytojas/statistika" class="thumbnail">
                                    {/* <img  src={statistic} alt="Mountain View"/> */}
                                    <h4 className="text-center">Peržiūrėti darbo statistiką</h4>
                                    </a>
                                </div>
                                <div class="col-sm-4">
                                    <a href="#gydytojas/slaptazodis" class="thumbnail">
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