import React, {Component} from 'react'
import axios from 'axios'

import PatientListingItem from '../AdminComponent/PatientListingItem'
import PatientListView from '../AdminComponent/PatientListView'
import SearchFieldForm from '../DoctorComponent/SearchFieldForm'
import { DoctorViewPatientLink } from '../LinksAndButtons/DoctorViewPatientLink';
import {NewRecordLink} from '../LinksAndButtons/NewRecordLink'
import { NewPrescriptionLink } from '../LinksAndButtons/NewPrescriptionLink';


export default class DoctorPatientListViewContainer extends Component{
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
            activePage:0,
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
                if(activePage !== 0){
                    this.setState({
                        activePage:activePage - 1
                    })
                    return ''
                }
                this.setState({
                    patientListView:(<h3>Jūs neturite priskirtų pacientų</h3>),
                    listIsEmpty:true,
                })                
            }else{
                this.setState({
                    patientListView:<PatientListView patients={response.data.content.map(this.composePatient)} />,
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
                if(activePage !== 0){
                    this.setState({
                        activePage:activePage - 1
                    })
                    return ''
                }
                this.setState({
                    patientListView:(<h3>Sistemos klaida, pacientų nėra</h3>),
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
            //console.log(erorr)
        })
    }
    viewPatientClickHandler = (patientId, fullName, birthDate) =>{
       sessionStorage.setItem("patientInfo", JSON.stringify({id:patientId, fullName:fullName, birthDate:birthDate}))
    }
    //compose patient list item (row) to show it in table
    composePatient = (patient, index) =>{
        let patientViewLink = null

        //if composing patient by doctor userName add link to view patient details
        //else do not show patient details button
        if(this.state.patientType){
            patientViewLink=(<td><DoctorViewPatientLink index={index} clickHandler={this.viewPatientClickHandler} 
                patientId={patient.id} 
                fullName={patient.fullName}
                birthDate={patient.birthDate}/></td>)
        }
        return (
            <PatientListingItem
                key={patient.id}
                patientId={patient.id}
                birthDate={patient.birthDate}
                fullName={patient.fullName}
    
                recordLink={<td><NewRecordLink index={index} patientId={patient.id}/></td>}
                prescriptionLink={<td><NewPrescriptionLink index={index} patientId={patient.id}/></td>}
                doctorViewPatient={patientViewLink}                 
            />
        )
    }

    getDoctorPatientBySearchValue = (activePage, searchValue) =>{
        console.log("ActivePage: " + activePage)
        axios.get('http://localhost:8080/api/doctor/'+this.session.user.userName+'/patient/'
        +searchValue+'?page='+activePage+'&size='+this.state.itemsPerPage)
        .then((response)=>{
            if(response.data.content.length === 0){
                if(activePage !== 0){
                    this.setState({
                        activePage:activePage - 1
                    })
                    if(this.state.searchValue > 2){
                        this.setState({
                            patientListView:(<h3>Tokių pacientų nerasta</h3>)
                        })
                    }
                    return ''
                }
                this.setState({
                    patientListView:(<h3>Tokių pacientų nerasta</h3>),
                    listIsEmpty:true,
                    listLength:0
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
                if(activePage !== 0){
                    this.setState({
                        activePage:activePage - 1
                    })
                    if(this.state.searchValue > 2){
                        this.setState({
                            patientListView:(<h3>Tokių pacientų nerasta</h3>)
                        })
                    }
                    return ''
                }
                this.setState({
                    patientListView:(<h3>Tokių pacientų nerasta</h3>),
                    
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
        console.log("Search.....")
        if(this.state.searchValue.length > 2){
            if(this.state.patientType){
                setTimeout(() =>{
                    this.getDoctorPatientBySearchValue(0, this.state.searchValue)  
                } , 2000 )
                
            }else{
                setTimeout(() =>{
                    this.getAllPatientBySearchValue(0, this.state.searchValue)          
                } , 2000 )
            }
        }else if(this.state.searchValue.length === 0){
            if(this.state.patientType){
                setTimeout(() =>{
                    this.getDoctorPatient(this.session.user.userName, 0)  
                } , 1000 )
            }else{
                setTimeout(() =>{
                    this.getAllPatient(0)  
                } , 1000 )
            }
        }else{
            this.setState({
                patientListView:(<h3>Įveskit bent 3 simbolius</h3>),
                listIsEmpty:true
            })
        }
        
        this.setState({
            activePage:0,
        })
    }
    //on button click chnage patient from doctor patient or all patient and vice versa
    changePatients = () =>{
        if(this.state.patientType){
            this.getAllPatient(0)
            this.setState({
                patientTypeName:"Mano pacientai",
                searchOn:false
            })
        }else{
            this.getDoctorPatient(this.session.user.userName,0)
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
        if(activePage < 1 || this.state.listLength < this.state.itemsPerPage ){
            if(this.state.activePage > activePage && activePage > -1){
               
            }else{
                return ''
            }
        }
 
        //if patient type is true (means it's still doctor patient) 
        //request for new page with given active page number and doctro userName 
        if(this.state.patientType){
            if(this.state.searchOn){
                this.getDoctorPatientBySearchValue(activePage, this.state.searchValue)
            }else{
                this.getDoctorPatient(this.session.user.userName, activePage);
            }
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
        
          return (
              <div className="text-center">
                <div>
                    <button className="btn btn-default" id="previousPage" onClick={() => this.handlePageChange(this.state.activePage - 1)}>⟨</button>
                    <button className="btn btn-default" id="nextPage" onClick={() => this.handlePageChange(this.state.activePage + 1)}>⟩</button>
                </div>
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
                                <button id="doctorChangePatientList" className='btn btn-success pull-right' onClick={this.changePatients}>{this.state.patientTypeName}</button>
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


