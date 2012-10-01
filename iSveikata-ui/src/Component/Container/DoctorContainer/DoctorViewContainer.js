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
            patientListView:null,
           
            searchValue:'',
            patientTypeName:'Visi pacientai',
            patientType:true,
            searchOn:false,

            listInfo:'',
            listLength:'',
            activePage:1,
            itemsPerPage:8,

            listIsEmpty:false

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
            if(response.data.content.length === 0){
                this.setState({
                    patientListView:(<h3>Jūs neturite priskirtų pacientų</h3>),
                    listIsEmpty:true
                })
            }else{
                this.setState({
                    patientListView:<PatientListView patients={response.data.content.map(this.composePatient)} />,
                    listInfo:response.data,
                    listLength:response.data.content.length,
                    listIsEmpty:false
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
            if(response.data.content.length === 0){
                this.setState({
                    patientListView:(<h3>Sistemos klaida, pacientų nėra</h3>),
                    listIsEmpty:true
                })
            }else{
                this.setState({
                    patientListView:<PatientListView patients={response.data.content.map(this.composePatient)} />,
                    listInfo:response.data,
                    listLength:response.data.content.length,
                    listIsEmpty:false

                })  
            }         
            console.log(response.data)
        })
        .catch((erorr) => {
            //console.log(erorr)
        })
    }

    //compose patient list item (row) to show it in table
    composePatient = (patient, index) =>{
        let patientViewLink = null

        //if composing patient by doctor userName add link to view patient details
        //else do not show patient details button
        if(this.state.patientType){
            patientViewLink=(<td><DoctorViewPatientLink patientId={patient.id} /></td>)
        }
        return (
            <PatientListingItem
                key={patient.id}
                patientId={patient.id}
                birthDate={patient.birthDate}
                fullName={patient.fullName}
    
                recordLink={<td><NewRecordLink  patientId={patient.id}/></td>}
                prescriptionLink={<td><NewPrescriptionLink  patientId={patient.id}/></td>}
                doctorViewPatient={patientViewLink}
                  
                    
            />
        )
    }

    getDoctorPatientBySearchValue = (activePage, searchValue) =>{
        axios.get('http://localhost:8080/api/doctor/'+this.session.user.userName+'/patient/'
        +searchValue+'?page='+activePage+'&size='+this.state.itemsPerPage)
        .then((response)=>{
            if(response.data.content.length === 0){
                this.setState({
                    patientListView:(<h3>Tokių pacientų nerasta</h3>),
                    listIsEmpty:true
                })
            }else{  
                this.setState({
                    patientListView:<PatientListView patients={response.data.content.map(this.composePatient)} />,
                    listInfo:response.data,
                    listLength:response.data.content.length,
                    listIsEmpty:false,
                    searchOn:true

                })
            }
            console.log(response.status)
        })
        .catch((erorr) => {
            console.log(erorr)

        })
    }

    getAllPatientBySearchValue = (activePage, searchValue) =>{
        axios.get('http://localhost:8080/api/patient/search/'
        +searchValue+'?page='+activePage+'&size='+this.state.itemsPerPage)
        .then((response)=>{
            if(response.data.content.length === 0){
                this.setState({
                    patientListView:(<h3>Tokių pacientų nerasta</h3>),
                    listIsEmpty:true
                })
            }else{  
                this.setState({
                    patientListView:<PatientListView patients={response.data.content.map(this.composePatient)} />,
                    listInfo:response.data,
                    listLength:response.data.content.length,
                    listIsEmpty:false,
                    searchOn:true
                })
            }
            console.log(response.status)
        })
        .catch((erorr) => {
            console.log(erorr)

        })
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
        if(this.state.searchValue.length > 2){
            if(this.state.patientType){
                this.getDoctorPatientBySearchValue(1, this.state.searchValue)   
            }else{
                this.getAllPatientBySearchValue(1, this.state.searchValue)            
            }
        }else if(this.state.searchValue.length === 0){
            if(this.state.patientType){
                this.getDoctorPatient(this.session.user.userName, 1)  
            }else{
                this.getAllPatient(1)  
            }
        }else{
            this.setState({
                patientListView:(<h3>Įveskit bent 3 simbolius</h3>),
                listIsEmpty:true
            })
        }
        
        this.setState({
            activePage:1,
        })
    }
    //on button click chnage patient from doctor patient or all patient and vice versa
    changePatients = () =>{
        if(this.state.patientType){
            this.getAllPatient(1)
            this.setState({
                patientTypeName:"Mano pacientai",
                searchOn:false
            })
        }else{
            this.getDoctorPatient(this.session.user.userName,1)
            this.setState({
                patientTypeName:"Visi pacientai",
                searchOn:false
            })
        }
        this.setState({
            patientType:!this.state.patientType,
            activePage:1
        })
    }

    //handle paggination page changes 
    handlePageChange = (activePage) => {
        
        //if patient type is true (means it's still doctor patient) 
        //request for new page with given active page number and doctro userName 
        if(this.state.patientType){
            if(this.state.searchOn){
                this.getDoctorPatientBySearchValue(activePage, this.state.searchValue)
            }else{
                this.getDoctorPatient(this.session.user.userName, activePage);
            }

            console.log(`active page is doctor patient ${activePage}`);
        }else{
            if(this.state.searchOn){
                this.getAllPatientBySearchValue(activePage, this.state.searchValue)
            }else{
                this.getAllPatient(activePage)
            }
        }
        //change activePage state to new page number
        this.setState({
            activePage:activePage
        })
      }
      //Show paggination div with props from state
      showPagination = () =>{
          if(this.state.listLength === this.state.listInfo.totalElements || this.state.listIsEmpty){
            return ''
          }
          return (
              <div className="text-center">
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
                            <div className="text-center">
                                <h4>Prašome įvesti bent 3 simbolius</h4>
                                <SearchFieldForm 
                                    searchHandler={this.searchHandler}
                                    fielddHandler={this.fielddHandler}
                                    searchValue={this.state.searchValue}
                                    searchPlaceHolder={"Pacientų paieška"}
                                    searchType={"text"}
                                />
                                <button className='btn btn-success pull-right' onClick={this.changePatients}>{this.state.patientTypeName}</button>
                            </div>
                            <div className="col-sm-12">
                                {this.state.patientListView}
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