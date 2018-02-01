import React, {Component} from 'react'
import axios from 'axios'


import PatientListView from '../AdminComponent/PatientListView'
import PatientListingItem from '../AdminComponent/PatientListingItem'
import { PatientBindLink } from '../LinksAndButtons/PatientBindLink';

export default class AdminBindUserPartContainer extends Component{
    constructor(){
        super();
        this.session =  JSON.parse(sessionStorage.getItem('session'))
        this.state = {
            patients:null,
            infoNoPatient:'',
            infoState:''
        }
    }

    fieldHandler = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    
    }
  
  
    componentWillMount = () =>{
        
        if(this.session === null || this.session.user.loggedIn !== true || this.session.user.userType !== 'admin'){
            this.props.router.push('/vartotojams');
            return '';
        }
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
        .then((response)=>{
            console.log(response.status)
            this.getPatientList();
            this.setState({
                infoState:<div className="alert alert-success"><strong>{response.data}</strong></div>
            })
        })
        .catch((erorr) => {
            console.log(erorr)
            this.setState({
                infoState:<div className="alert alert-danger"><strong>{erorr.response.data}</strong></div>
            })
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
                patientBindLink={<PatientBindLink bindClick={this.bindClick} patientId={patient.patientId}/>}
                
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
                            <h4>Priskirkite pacientą gydytojui</h4>
                        </div>
                        <div className="panel-body">
                            {this.state.infoState}
                            <div className="col-sm-12">
                                <div className="col-sm-4 col-sm-offset-4">
                                    <input type="text" className="form-control" value={this.state.search} onChange={this.searchdHandler} placeholder="Paieška" name="search" />
                                </div>
                            </div>
                            
                            <div className="col-sm-12">
                                <PatientListView 
                                    patients={this.state.patients}
                                />
                                {this.state.infoNoPatient}
                                
                            </div>
                        </div> 
                    </div> 
                </div>           
            </section>
        </div>)
    }
}
