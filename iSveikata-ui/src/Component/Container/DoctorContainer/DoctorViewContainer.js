import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import Pagination from "react-js-pagination"

import PatientListingItem from '../AdminComponent/PatientListingItem'
import PatientListView from '../AdminComponent/PatientListView'
import SearchFieldForm from '../DoctorComponent/SearchFieldForm'
import { DoctorViewPatientLink } from '../LinksAndButtons/DoctorViewPatientLink';
import {NewRecordLink} from '../LinksAndButtons/NewRecordLink'
import { NewPrescriptionLink } from '../LinksAndButtons/NewPrescriptionLink';

class DoctorViewContainer extends Component{
    constructor(props){
        super(props)
        this.session = JSON.parse(sessionStorage.getItem('session'))
        this.state = {
            patients:null,
            listInfo:'',
            listLength:'',
            searchValue:'',
            info:'',
            patientTypeName:'Visi pacientai',
            patientType:true,

            listBegin:0,
            listEnd:5,

            activePage:1,
            itemsPerPage:8

        }
    }

    //before mount check state of session exist and session user state (loggetIn, userType)
    componentWillMount = () =>{
        if(this.session === null || this.session.user.loggedIn !== true || this.session.user.userType !== 'doctor'){
            this.props.router.push('/vartotojams');
            return '';
        }  
        //load patient wich is bind to specific doctor by doctor userName
        this.getDoctorPatient(this.session.user.userName, this.state.activePage);
    }
    //sen request for a list of patient wich ir bind to doctor userName and some paging info
    getDoctorPatient = (userName, activePage) =>{
        axios.get('http://localhost:8080/api/doctor/'+userName+'/patient?page='+activePage+'&size='+this.state.itemsPerPage)
        .then((response)=>{
            this.setState({
                patients:response.data.content.map(this.composePatient),
                listInfo:response.data,
                listLength:response.data.content.length,
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

    //send request for a list of patient and some paging info
    getAllPatient = (activePage) =>{
        axios.get('http://localhost:8080/api/patient/?page='+activePage+'&size='+this.state.itemsPerPage)
        .then((response)=>{
            this.setState({
                patients:response.data.content.map(this.composePatient),
                listInfo:response.data,
                listLength:response.data.content.length,
            })
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

    //compose patient list item (row) to show it in table
    composePatient = (patient, index) =>{
        let patientViewLink = ''

        //if composing patient by doctor userName add link to view patient details
        //else do not show patient details button
        if(this.state.patientType){
        patientViewLink=(<td><DoctorViewPatientLink patientId={patient.patientId} /></td>)
        }
        return (
            <PatientListingItem
                key={index}
                patientId={patient.patientId}
                birthDate={patient.birthDate}
                firstName={patient.firstName}
                lastName={patient.lastName}
    
                recordLink={<td><NewRecordLink  patientId={patient.patientId}/></td>}
                prescriptionLink={<td><NewPrescriptionLink  patientId={patient.patientId}/></td>}
                doctorViewPatient={patientViewLink}
                  
                    
            />
        )
    }
    //in seacrh field change state value ot new event (e) value
    fielddHandler = (e) =>{
        this.setState({
            searchValue:e.target.value
        })
    }
    //search button click handling 
    searchHandler = (e) =>{
        e.preventDefault()
       console.log("Searcrh search..."+ this.state.searchValue)
    }
    //on button click chnage patient from doctor patient or all patient and vice versa
    changePatients = () =>{
        if(this.state.patientType){
            this.getAllPatient(1)
            this.setState({
                patientType:!this.state.patientType,
                patientTypeName:"Mano pacientai",
                activePage:1,
            })
        }else{
            this.getDoctorPatient(this.session.user.userName,1)
            this.setState({
                patientType:!this.state.patientType,
                patientTypeName:"Visi pacientai",
                activePage:1,
            })
        }
    }

    //handle paggination page changes 
    handlePageChange = (activePage) => {
        //if patient type is true (means it's still doctor patient) 
        //request for new page with given active page number and doctro userName 
        if(this.state.patientType){
            this.getDoctorPatient(this.session.user.userName, activePage);
            console.log(`active page is doctor patient ${activePage}`);
        }else{
            this.getAllPatient(activePage)
            console.log(`active page is all patient ${activePage}`);
        }
        //change activePage state to new page number
        this.setState({
            activePage:activePage
        })
      }
      //Show paggination div with props from state
      showPagination = () =>{
          if(this.state.listLength < this.state.itemsPerPage && !this.state.listInfo.last){
            return ''
          }
          return (
              <div className="col-sm-5 col-sm-offset-4">
                <Pagination
                activePage={this.state.activePage}
                itemsCountPerPage={this.state.itemsPerPage}
                totalItemsCount={this.state.listInfo.totalElements}
                pageRangeDisplayed={5}
                onChange={this.handlePageChange}
                />
            </div>
          )
      }
      


    render() {
        return (
            <div className="container">
            <section>
                <div className="panel-group">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4>Priskirtų pacientų sąrašas</h4>
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
                                {this.showPagination()}
                                {this.state.info}
                              

                            </div>
                        </div> 
                    </div> 
                </div>           
            </section>
        </div>)
    }
}


//map reduxe store state to container props
const mapStateToProps = (state) =>{
    return{
        user:state.user
    }
}

export default connect(mapStateToProps)(DoctorViewContainer)