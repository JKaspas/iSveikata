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
            patient:'',
            searchValue:'',
            info:'',
            
          
        }
    }


    componentWillMount = () =>{
        if(this.session === null || this.session.user.loggedIn !== true || this.session.user.userType !== 'druggist'){
            this.props.router.push('/vartotojams');
            return '';
        }  

        
    }

   
    searchForPatientById = (patientId) =>{
        axios.get(' http://localhost:8080/api/patient/'+patientId)
        .then((response)=>{
            
            if(response.data.length === 0){
                this.setState({
                    info:(<h3>Klientų su tokiu asmens kodu nėra</h3>)
                })
            }else{
                this.setState({
                    patient: <PatientListView  patients={this.composePatient(response.data)} />,
                    
                })
            }
                  
            console.log(response.status)
        })
        .catch((erorr) => {
            
        })
    }

    composePatient = (patient) =>{
        
        return (
            <PatientListingItem
                patientId={patient.id}
                birthDate={patient.birthDate}
                fullName={patient.fullName}
                druggistPrescriptionView={<td><DruggistPrescriptionLink patientId={patient.id}/></td>}
                   
            />
        )
    }
   
    fielddHandler = (e) =>{
        this.setState({
            searchValue:e.target.value
        })
        console.log(e.target.value)
    }
    searchHandler = (e) =>{
        e.preventDefault()
        if(this.state.searchValue.length === 11){
            this.searchForPatientById(this.state.searchValue)
        }else{
            this.setState({
                patient:(<h3>Įveskite taisyklingą asmens kodą</h3>)
            })
        }
    }

 

    


    render() {
        return (
            <div className="container">
            <section>
                <div className="panel-group">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4>Klientų paieška pagal asmens kodą</h4>
                        </div>
                        <div className="panel-body">
                            <div className="col-sm-12">
                            <h4 className="text-center">Įveskite kliento asmens kodą</h4>
                                <SearchFieldForm 
                                    searchType={"number"}
                                    searchHandler={this.searchHandler}
                                    fielddHandler={this.fielddHandler}
                                    searchValue={this.state.searchValue}
                                    searchPlaceHolder={"Kliento asmens kodas"}
                                />
                            </div>
                            
                            <div className="col-sm-12">
                               {this.state.patient}                            
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

