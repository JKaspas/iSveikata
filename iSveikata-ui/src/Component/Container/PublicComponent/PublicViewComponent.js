import React from 'react'
import first from '../../images/first.png'
import second from '../../images/second.gif'
import third from '../../images/third.png'


var PublicViewComponent = () =>{
    return(
        <div>
            <header className="bg-primary text-white">
                <div className="container text-center">
                    <h1>iSveikata</h1>
                    <p className="lead">Sveikatos priežiūros sistema</p>
                </div>
            </header>

            <section>
                <div className="container">
                    <div className="row">
                    <div className="col-lg-12 mx-auto">
                        <h2>Susirgimų statistika</h2>
                        <img className="col-lg-12" src={first} alt="Mountain View"/>
                    </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="container">
                    <div className="row">
                    <div className="col-lg-12 mx-auto">
                        <h2>Vaistų vartojimo statistika</h2>
                        <img className="col-lg-12" src={second} alt="Mountain View"/>
                    </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="container">
                    <div className="row">
                    <div className="col-lg-12 mx-auto">
                        <h2>Papildoma statistika</h2>
                        <img className="col-lg-12" src={third} alt="Mountain View"/>
                    </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default PublicViewComponent;