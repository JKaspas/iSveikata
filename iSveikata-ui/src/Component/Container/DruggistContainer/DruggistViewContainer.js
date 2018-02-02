import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'

import PatientListingItem from '../AdminComponent/PatientListingItem'
import PatientListView from '../AdminComponent/PatientListView'
import SearchFieldForm from '../DoctorComponent/SearchFieldForm'
import { DruggistPrescriptionLink } from '../LinksAndButtons/DruggistPrescriptionLink';

class DruggistViewContainer extends Component{
    constructor(props){
        super(props)
        this.session = JSON.parse(sessionStorage.getItem('session'))
        this.state = {
            patients:null,
            searchValue:'',
            info:'',
            patientTypeName:'Visi pacientai',
            patientType:true,

            listBegin:0,
            listEnd:5,
            
        }
    }


    componentWillMount = () =>{
        if(this.session === null || this.session.user.loggedIn !== true || this.session.user.userType !== 'druggist'){
            this.props.router.push('/vartotojams');
            return '';
        }  

        this.getAllPatient()
    }

    getAllPatient = () =>{
        axios.get('http://localhost:8080/api/patient/')
        .then((response)=>{
            this.setState({
                patients:response.data.map(this.composePatient)
            })
            // this.setPatientAmount(this.state.patients,0, 20)

            if(response.data.length === 0){
                this.setState({
                    info:(<h3>Priskirtų pacientų nerasta</h3>)
                })
            }
                  
            console.log(response.status)
        })
        .catch((erorr) => {
            
            //console.log(erorr)
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

                druggistPrescriptionView={<td><DruggistPrescriptionLink patientId={patient.patientId}/></td>}
                  
                    
            />
        )
    }

    fielddHandler = (e) =>{
        this.setState({
            searchValue:e.target.value
        })
    }
    searchHandler = (e) =>{
        e.preventDefault()
       console.log("Searcrh search..."+ this.state.searchValue)
    }

    


    render() {
        return (
            <div className="container">
            <section>
                <div className="panel-group">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <button onClick={() =>  this.props.router.goBack()} className="btn btn-primary"> Atgal </button>
                            <h4>Pacientų sarašas</h4>
                        </div>
                        <div className="panel-body">
                            <div className="col-sm-12">
                                <SearchFieldForm 
                                    searchHandler={this.searchHandler}
                                    fielddHandler={this.fielddHandler}
                                    searchValue={this.state.searchValue}
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

const mapStateToProps = (state) =>{
    return{
        user:state.user
    }
}

export default connect(mapStateToProps)(DruggistViewContainer)

