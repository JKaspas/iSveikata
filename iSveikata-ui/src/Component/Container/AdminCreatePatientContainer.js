import React, {Component} from 'react'
import axios from 'axios'

import PatientForm from './AdminComponent/PatientForm'


export default class AdminCreatePatientContainer extends Component{
    constructor(){
        super();
        this.state = {
            patientId:12345678901,
            birthDate:'2018-02-01',
            firstName:'Vardas',
            lastName:'Pavarde',
            password:1970 
        }
    }

    fieldHandler = (e) =>{
        this.setState({[e.target.name]: e.target.value})
        console.log("Input field name: " + e.target.name)
        console.log("Input field value: " + e.target.value)
    }
    submitHandler = (e) =>{
        e.preventDefault();
        axios.post('http://localhost:8080/api/admin/new/patient', {
            patientId:this.state.patientId,
            birthDate:this.state.birthDate,
            firstName:this.state.firstName,
            lastName:this.state.lastName,
            password:this.state.password, 
        })
        .then((response)=>{
            console.log(response.status)
            // this.setState({
            //     name:'',
            //     surname:'',
            //     username:'',
            //     password:'',
    
            //     drugStore:'', 
            //     specialization:'',
            //     type:''
            // })
        })
        .catch((erorr) => {
            console.log(erorr)
        })
    }
    

    
    render(){
        return(
        <div className="container">
            <section>
                
                <div className="panel-group">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4>Sukurkite pacienta</h4>
                        </div>
                        <div className="panel-body">
                            <PatientForm 
                            patientId={this.state.patientId}
                            birthDate={this.state.birthDate}
                            firstName={this.state.firstName}
                            lastName={this.state.lastName}
                            password={this.state.password}
                            fieldHandler={this.fieldHandler}
                            submitHandler={this.submitHandler}/>
                        </div> 
                    </div> 
                </div>           
            </section>
        </div>
        
            

               
            
        )
    }
}

