import React, {Component} from 'react'

import statistic from '../images/statistic.png'
import doctor from '../images/doctor.png'
import patient from '../images/patient.png'

export default class PublicViewContainer extends Component{

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
                                    <a href="#pacientams" class="thumbnail">
                                    <img  src={patient} alt="Mountain View"/>
                                    <h4 className="text-center">Prisijungimas pacientams</h4>
                                    </a>
                                </div>
                                <div class="col-sm-4">
                                    <a href="#statistika" class="thumbnail">
                                    <img  src={statistic} alt="Mountain View"/>
                                    <h4 className="text-center">Vieša statistika</h4>
                                    </a>
                                </div>
                                <div class="col-sm-4">
                                    <a href="#vartotojams" class="thumbnail">
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