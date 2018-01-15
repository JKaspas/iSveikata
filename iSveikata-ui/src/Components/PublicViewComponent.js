import React, {Component} from 'react'
import first from './images/first.png'
import second from './images/second.gif'
import third from './images/third.png'


var PublicViewComponent = () =>{
    return(
        <div>
            <header class="bg-primary text-white">
                <div class="container text-center">
                    <h1>iSveikata</h1>
                    <p class="lead">Sveikatos prieziuros sistema</p>
                </div>
            </header>

            <section>
                <div class="container">
                    <div class="row">
                    <div class="col-lg-12 mx-auto">
                        <h2>Statistic chart</h2>
                        <img class="col-lg-12" src={first} alt="Mountain View"/>
                    </div>
                    </div>
                </div>
            </section>

            <section>
                <div class="container">
                    <div class="row">
                    <div class="col-lg-12 mx-auto">
                        <h2>Statistic chart</h2>
                        <img class="col-lg-12" src={second} alt="Mountain View"/>
                    </div>
                    </div>
                </div>
            </section>

            <section>
                <div class="container">
                    <div class="row">
                    <div class="col-lg-12 mx-auto">
                        <h2>Statistic chart</h2>
                        <img class="col-lg-12" src={third} alt="Mountain View"/>
                    </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default PublicViewComponent;