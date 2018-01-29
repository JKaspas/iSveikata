import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'

import PatientListingItem from '../AdminComponent/PatientListingItem'
import PatientListView from '../AdminComponent/PatientListView'
import SearchFieldForm from '../DoctorComponent/SearchFieldForm'
import { DoctorViewPatientLink } from '../LinksAndButtons/DoctorViewPatientLink';
import {NewRecordLink} from '../LinksAndButtons/NewRecordLink'

class DoctorViewContainer extends Component{
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
        if(this.session === null || this.session.user.loggedIn !== true || this.session.user.userType !== 'doctor'){
            this.props.router.push('/vartotojams');
            return '';
        }  

        this.getDoctorPatient(this.session.user.userName);
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
    getAllPatient = () =>{
        axios.get('http://localhost:8080/api/patient/')
        .then((response)=>{
            this.setState({
                patients:response.data.map(this.composePatient)
            })
            // this.setPatientAmount(this.state.patients,0, 20)

            if(response.data.length === 0){
                this.setState({
                    info:(<h3>No patient found</h3>)
                })
            }
                  
            console.log(response.status)
        })
        .catch((erorr) => {
            
            //console.log(erorr)
        })
    }

    // setPatientAmount = (patient, start, end) =>{
    //     var value=0;
    //     this.setState({
    //         patients:patient.filter()
    //     })
    // }

    composePatient = (patient, index) =>{
        var date = new Date(patient.birthDate)
        var newDate = date.getFullYear() + '-'+ date.getMonth()+1 + '-' + date.getDate();
        // if(index > this.state.listEnd || index < this.state.listBegin){
        //     return null;
        // }
        return (
            <PatientListingItem
                key={index}
                patientId={patient.patientId}
                birthDate={newDate}
                firstName={patient.firstName}
                lastName={patient.lastName}
    
                recordLink={<NewRecordLink userName={this.session.user.userName} patientId={patient.patientId}/>}
                doctorViewPatient={<DoctorViewPatientLink patientId={patient.patientId} />}          
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

    changePatients = () =>{
        if(this.state.patientType){
            this.getAllPatient()
            this.setState({
                patientType:!this.state.patientType,
                patientTypeName:"Mano pacientai"
            })
        }else{
            this.getDoctorPatient(this.session.user.userName)
            this.setState({
                patientType:!this.state.patientType,
                patientTypeName:"Visi pacientai"
            })
        }
    }

    forward = () =>{
        this.setState({
            listBegin:this.state.listBegin+5,
            listEnd:this.state.listEnd+5
        })
        this.getAllPatient()
    }
    backward = () =>{
        this.setState({
            listBegin:this.state.listBegin-5,
            listEnd:this.state.listEnd-5
        })
        this.getAllPatient()
    }




    render() {
        return (
            <div className="container">
            <section>
                <div className="panel-group">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4>Pacientų sąrašas</h4>
                        </div>
                        <div className="panel-body">
                            <div className="col-sm-12">
                                <SearchFieldForm 
                                    searchHandler={this.searchHandler}
                                    fielddHandler={this.fielddHandler}
                                    searchValue={this.state.searchValue}
                                />
                                <button className='btn btn-success pull-right' onClick={this.changePatients}>{this.state.patientTypeName}</button>
                            </div>
                            
                            <div className="col-sm-12">
                                <PatientListView 
                                    patients={this.state.patients}
                                />
                                {this.state.info}
                                {/* <button className='btn btn-success pull-right' onClick={this.forward}>Pirmyn</button>
                                <button className='btn btn-success pull-right' onClick={this.backward}>Atgal</button> */}

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

export default connect(mapStateToProps)(DoctorViewContainer)