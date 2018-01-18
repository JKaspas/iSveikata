import React, {Component} from 'react'
import axios from 'axios'
import PropTypes from 'prop-types';

import PatientListingItem from '../AdminComponent/PatientListingItem'
import PatientListView from '../AdminComponent/PatientListView'
import SearchFieldForm from '../DoctorComponent/SearchFieldForm'

export default class DoctorViewContainer extends Component{
    constructor(props){
        super(props)
        this.state = {
            patients:'',
            userName:'',
            info:''
        }
    }

    componentWillMount = () =>{
        // this.getDoctorPatient(this.state.userName);
    }

    getDoctorPatient = (userName) =>{
        axios.get('http://localhost:8080/api/doctor/'+userName+'/patient')
        .then((response)=>{
            this.setState({
                patients:response.data.map(this.composePatient)
            })
            if(response.data.length === 0){
                this.setState({
                    info:(<h3>No patient found</h3>)
                })
            }
                  
            console.log(response.status)
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
                recordLinkStatus={{display:'block'}}
                patientLinkStatus={{display:'block'}}
                bindLinkStatus={{display:'none'}}
                recordLinkValue={"Naujas įrašas"}
                patientLinkValue={"View"}
                userName={this.state.userName}            
            />
        )
    }

    fielddHandler = (e) =>{
        this.setState({
            userName:e.target.value
        })
       
    }
    searchHandler = (e) =>{
        e.preventDefault()
        if(this.state.userName.length > 3){
            this.getDoctorPatient(this.state.userName);
        }
    }



    render() {
        return (
            <div className="container">
            <section>
                <div className="panel-group">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4>Pacientu sarasas</h4>
                            <h4>Doctor user name = {this.state.userName}</h4>
                        </div>
                        <div className="panel-body">
                            <div className="col-sm-12">
                                <SearchFieldForm 
                                    searchHandler={this.searchHandler}
                                    fielddHandler={this.fielddHandler}
                                    userName={this.state.userName}
                                />
                            </div>
                            
                            <div className="col-sm-12">
                                <PatientListView 
                                    patients={this.state.patients}
                                />
                                {this.state.info}
                            </div>
                        </div> 
                    </div> 
                </div>           
            </section>
        </div>)
    }
}

DoctorViewContainer.contextTypes = {
    userName: PropTypes.string
  };
