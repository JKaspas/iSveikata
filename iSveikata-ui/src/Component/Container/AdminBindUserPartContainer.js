import React, {Component} from 'react'
import axios from 'axios'

import PatientListView from './AdminComponent/PatientListView'
import PatientListingItem from './AdminComponent/PatientListingItem'

export default class AdminBindUserPartContainer extends Component{
    constructor(){
        super();
        
        this.state = {
            patients:'',
            infoNoPatient:'',
            infoBind:''
        }
    }

    fieldHandler = (e) =>{
        this.setState({[e.target.name]: e.target.value})
        console.log("Input field name: " + e.target.name)
        console.log("Input field value: " + e.target.value)
    }
    componentWillMount= () =>{
        this.getPatientList();
    }

    getPatientList = () =>{
        axios.get('http://localhost:8080/api/doctor/notbind')
        .then((response)=>{
            this.setState({
                patients:response.data.map(this.composePatient)
            })
            if(response.data.length === 0){
                this.setState({
                    infoNoPatient:(<h3>No patient found</h3>)
                })
            }
            console.log(response.status)
        })
        .catch((erorr) => {
            console.log(erorr)
        })
    }

    bindClick = (patient_id) =>{
        axios.post("http://localhost:8080/api/admin/new/bind/"+this.props.params.userName+"/to/"+patient_id)
        .then((response) => {
            console.log(response.status)
            this.getPatientList();
            this.setState({
                infoBind:(<p>Pacientas: {patient_id}, buvo apjungtas su daktaru: {this.props.params.userName}</p>)
            })
        })
        .catch((erorr) => {
            console.log(erorr)
        })
    }

    composePatient = (patient, index) =>{
        return (
            <PatientListingItem 
                key={index}
                patientId={patient.patientId}
                birthDate={patient.birthDate}
                firstName={patient.firstName}
                lastName={patient.lastName}
                recordLinkStatus={{display:'none'}}
                bindLinkStatus={{display:'block'}}
                bindLinkValue={"Apjungti"}
                bindClick={this.bindClick}
                
            />
        )
    }
    

    
    render(){
        return(
        <div className="container">
            <section>
                <div className="panel-group">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4>Prijunkyte pacienta</h4>
                            <h4>Doctor user name = {this.props.params.userName}</h4>
                        </div>
                        <div className="panel-body">
                            <div className="col-sm-12">
                                <div className="col-sm-4 col-sm-offset-4">
                                    <input type="text" className="form-control" value={this.state.search} onChange={this.searchdHandler} placeholder="Paieska" name="search" />
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <PatientListView 
                                    patients={this.state.patients}
                                />
                                {this.state.infoNoPatient}
                                {this.state.infoBind}
                            </div>
                        </div> 
                    </div> 
                </div>           
            </section>
        </div>)
    }
}

