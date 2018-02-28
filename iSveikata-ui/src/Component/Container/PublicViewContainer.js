import React, {Component} from 'react'
import {connect} from 'react-redux';

import statistic from '../images/statistic.png'
import doctor from '../images/doctor.png'
import patient from '../images/patient.png'

import {doctorApiList, doctorIcdList} from '../Container/_action'
import {store} from '../Container/_store/store'

class PublicViewContainer extends Component{



    load = () =>{
       
       
    }

    render() {
        return (
            <div>
                <header className="bg-primary text-white">
                    <div className="container text-center">
                        <h1>iSveikata</h1>
                        <p className="lead">Sveikatos priežiūros sistema</p>
                        <button className="btn btn-success" onClick={this.load}>Load</button>
                    </div>
                
                <section>
                    <div className="container">
                    
                        <div className="row">
                            <div className="col-sm-12 ">
                                <div className="col-sm-4">
                                    <a href="#pacientams" className="thumbnail">
                                    <img  src={patient} alt="Mountain View"/>
                                    <h4 className="text-center">Prisijungimas pacientams</h4>
                                    </a>
                                </div>
                                <div className="col-sm-4">
                                    <a href="#statistika" className="thumbnail">
                                    <img  src={statistic} alt="Mountain View"/>
                                    <h4 className="text-center">Vieša statistika</h4>
                                    </a>
                                </div>
                                <div className="col-sm-4">
                                    <a href="#vartotojams" className="thumbnail">
                                    <img  src={doctor} alt="Mountain View"/>
                                    <h4 className="text-center">Prisijungimas sistemos vartotojams</h4>
                                    </a>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </section>
                </header>
                {/* <PublicViewComponent/> */}
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
  