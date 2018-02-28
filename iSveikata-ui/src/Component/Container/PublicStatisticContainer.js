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

            showHideButton:"Pateikti duomenis lentėje",
            button:null
        }
    }
    componentWillMount = () =>{
        axios.get("http://localhost:8080/api/record/statistic/TLK/")
            .then((response) =>{
                if(response.data.length === 0){
                    this.setState({
                       button:null,
                       icdStatistic:(<h4>Statistiniu duomenų nerasta</h4>)
                    })
                }else{
                    this.setState({
                        icdData:response.data.map(this.composeIcdData),
                        button: (<div className="text-center">
                                    <button className="btn btn=primary" onClick={this.showIcdTable} >{this.state.showHideButton}</button>
                                </div>)
                    })
                    this.showIcdStatistic()
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
        if(this.state.showHideButton === "Paslepti lentelę"){
            this.setState({
                showHideButton:"Pateikti duomenis lentele",
                icdStatisticTable:null
            })
        }else{
            this.setState({
                showHideButton:"Paslepti lentelę",
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
    composeIcdTable = (icd, index) =>{
        return(<tr key={icd.icd}>
            <td>{icd.count} kartai</td>
            <td>{icd.proc} %</td>
            <td>{icd.icd}</td>
            </tr>)
    }

    


    showIcdStatistic = () =>{
        this.setState({
            icdStatistic: (
                <div>
                    <h4>Pateikiama 10 dažniausiai pasitaikančių ligų pagal jų kodus</h4>
                <BarChart width={800} height={300}  data={this.state.icdData}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <XAxis dataKey="icdCode" name="Ligos kodas"/>
                {/* <XAxis dataKey="title"  name="Ligo pavadinimas"/> */}
                <YAxis/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend verticalAlign="top" height={36} iconSize={20} />
                <Bar stackId="one" dataKey="title" barSize={45} fill="#8884d8" background={true} name="Ligos pavadinimas"  />
                <Bar stackId="one" dataKey="proc" barSize={45} fill="#8884d8" background={true} name="Ligos kodo dažnumas" unit=" %" />
                <Bar stackId="one"  legendType="none" dataKey="count" barSize={45} fill="#8884d8" background={true} name="Ligos kodo dažnumas" unit=" kartai" />
                </BarChart>
                </div>)
            })
    }

    



    render() {
        return (
                <section>
                    <PublicViewComponent
                    icdStatistic={ this.state.icdStatistic} 
                    button={this.state.button}
                    icdTable={this.state.icdStatisticTable}
                    />
                </section>
        )
    }
}