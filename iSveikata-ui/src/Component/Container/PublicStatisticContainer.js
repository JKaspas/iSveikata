import React, {Component} from 'react'
import axios from 'axios'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts'

import PublicViewComponent from './PublicComponent/PublicViewComponent'

export default class PublicStatisticContainer extends Component{
    constructor(props){
        super(props)

        this.state = {
            icdStatistic:null,
            icdData:null,
            icdStatisticTable:null,

            apiStatistic:null,
            apiData:null,

            showHideIcdButton:"Pateikti duomenis lentėje",
            showHideApiButton:"Pateikti duomenis lentėje",
            icdButton:null,
            apiButton:null,
        }
    }
    componentWillMount = () =>{
        this.getIcdData()   
        this.getApiData()
    }

    getApiData = () =>{
        axios.get("http://localhost:8080/api/prescription/statistics")
            .then((response) =>{
                if(response.data.length === 0){
                    this.setState({
                        apiButton:null,
                        apiStatistic:(<h4>Statistiniu duomenų nerasta</h4>)
                    })
                }else{
                    this.setState({
                        apiData:response.data,                       
                    })
                }
                console.log(response.data)               
            })
    }

    getIcdData = () =>{
        axios.get("http://localhost:8080/api/record/statistic/TLK/")
            .then((response) =>{
                if(response.data.length === 0){
                    this.setState({
                       icdButton:null,
                       icdStatistic:(<h4>Statistiniu duomenų nerasta</h4>)
                    })
                }else{
                    this.setState({
                        icdData:response.data.map(this.composeIcdData),
                    })
                    
                }
                console.log(response.status)               
            })
    }

    composeIcdData = (icd, index) =>{
        return {
            count:icd.totalCount,
            proc: Math.round(icd.totalProc * 1000) / 1000,
            icd:icd.info.icdCode + ' - ' + icd.info.title,
            icdCode:icd.info.icdCode,
            title:icd.info.title
        }
    }

    showIcdTable = () =>{
        if(this.state.showHideIcdButton === "Paslepti lentelę"){
            this.setState({
                showHideIcdButton:"Pateikti duomenis lentele",
                icdStatisticTable:null
            })
        }else{
            this.setState({
                showHideIcdButton:"Paslepti lentelę",
                icdStatisticTable:(<table className="table table-hover">
                <thead>
                    <tr>
                        <th>Ligos kodo panaudojimai</th>
                        <th>Ligos kodo panaudojimai procentaliai</th>
                        <th>Ligos kodas ir pavadinimas</th>
                    </tr>
                </thead>
                <tbody>
            {this.state.icdData.map(this.composeIcdTable)} 
                </tbody>
                </table>)
            })
        }
    }

    showApiTable = () =>{
        
        if(this.state.showHideApiButton === "Paslepti lentelę"){
            this.setState({
                showHideApiButton:"Pateikti duomenis lentele",
                apiStatisticTable:null
            })
        }else{
            this.setState({
                showHideApiButton:"Paslepti lentelę",
                apiStatisticTable:(<table className="table table-hover">
                <thead>
                    <tr>
                        <th>Veiklioji medžiaga</th>
                        <th>Pirkimai</th>
                    </tr>
                </thead>
                <tbody>
            {this.state.apiData.map(this.composeApiTable)} 
                </tbody>
                </table>)
            })
        }
    }
    composeIcdTable = (icd, index) =>{
        return(<tr key={icd.icd}>
            <td>{icd.count} kartai</td>
            <td>{icd.proc} %</td>
            <td>{icd.icd}</td>
            </tr>)
    }

    composeApiTable = (api, index) =>{
        return(<tr key={api.ingredientName}>
            <td>{api.ingredientName} </td>
            <td>{api.usedTimes}</td>
            </tr>)
    }

    
    showApiStatistic = () =>{
        if(this.state.apiStatistic !== null ){
            this.setState({
                apiStatistic:null,
                apiButton:null
            })
        }else{
            this.setState({
                apiStatistic: (
                    <div>
                        <h4>Pateikiama 10 dažniausiai panaudojamų vaisto veikliūjų medžiagų statistika</h4>
                    <BarChart width={800} height={300}  data={this.state.apiData}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                    <XAxis dataKey="ingredientName" name="Vaisto veiklioji medžiaga"/>
                    <YAxis/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Legend verticalAlign="top" height={36} iconSize={20} />
                    <Bar stackId="one" dataKey="usedTimes" barSize={45} fill="#8884d8" background={true} name="Pirkimai"  />
                    </BarChart>
                    </div>),
                apiButton:(<div className="text-center">
                            <button className="btn btn=primary" onClick={this.showApiTable} >{this.state.showHideApiButton}</button>
                        </div>)
                })
        }
            
    }

    showIcdStatistic = () =>{
        if(this.state.icdStatistic !== null ){
            this.setState({
                icdStatistic:null,
                icdButton:null
            })
        }else{
            this.setState({
                icdStatistic: (
                    <div>
                        <h4>Pateikiama 10 dažniausiai pasitaikančių ligų pagal jų kodus</h4>
                    <BarChart width={800} height={300}  data={this.state.icdData}
                    margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                    <XAxis dataKey="icdCode" name="Ligos kodas"/>
                    <YAxis/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Legend verticalAlign="top" height={36} iconSize={20} />
                    <Bar stackId="one" dataKey="title" barSize={45} fill="#8884d8" background={true} name="Ligos pavadinimas"  />
                    <Bar stackId="one" dataKey="proc" barSize={45} fill="#8884d8" background={true} name="Ligos kodo dažnumas" unit=" %" />
                    <Bar stackId="one"  legendType="none" dataKey="count" barSize={45} fill="#8884d8" background={true} name="Ligos kodo dažnumas" unit=" kartai" />
                    </BarChart>
                    </div>),
                icdButton: (<div className="text-center">
                            <button className="btn btn=primary" onClick={this.showIcdTable} >{this.state.showHideIcdButton}</button>
                        </div>)
                })
        }
    }

    



    render() {
        return (
                <section>
                    
                    <PublicViewComponent
                    showIcdStatistic={this.showIcdStatistic}
                    showApiStatistic={this.showApiStatistic}

                    icdStatistic={ this.state.icdStatistic} 
                    icdButton={this.state.icdButton}
                    icdTable={this.state.icdStatisticTable}

                    apiStatistic={this.state.apiStatistic}
                    apiButton={this.state.apiButton}
                    apiTable={this.state.apiStatisticTable}
                    />
                </section>
        )
    }
}