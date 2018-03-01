import React, {Component} from 'react'
import axios from 'axios'
import Pagination from "react-js-pagination"



import PatientListView from '../AdminComponent/PatientListView'
import PatientListingItem from '../AdminComponent/PatientListingItem'
import { PatientBindLink } from '../LinksAndButtons/PatientBindLink';
import SearchFieldForm from '../DoctorComponent/SearchFieldForm';

export default class AdminBindUserPartContainer extends Component{
    constructor(){
        super();
        this.session =  JSON.parse(sessionStorage.getItem('session'))
        this.state = {
            patientList:'',
            infoState:'',
            
            listInfo:'',

            activePage:195,
            itemsPerPage:8,
            listLength:'',

            listIsEmpty:false,

            searchValue:''
        }
    }
  
    componentWillMount = () =>{
        if(this.session === null || this.session.user.loggedIn !== true || this.session.user.userType !== 'admin'){
            this.props.router.push('/vartotojams');
            return '';
        }
        this.getPatientList(this.state.searchValue, this.state.activePage);  
    }

    getPatientList = (searchValue, activePage) =>{
        let allPatientRequestLink = 'http://localhost:8080/api/patient/notbind?page='+activePage+'&size='+this.state.itemsPerPage
        let searchPatientrequestLink = 'http://localhost:8080/api/patient/notbind/'+searchValue+'/search?page='+activePage+'&size='+this.state.itemsPerPage
        let finalRequestLink = allPatientRequestLink;

        if(searchValue.length > 2){
           finalRequestLink = searchPatientrequestLink
        }else if(searchValue.length === 0){
           finalRequestLink = allPatientRequestLink
        }else{
            this.setState({
                patientList:(<h3>Įveskit bent 3 simbolius</h3>),
                listIsEmpty:true,
            })
            return ''
        }

        axios.get(finalRequestLink)
        .then((response)=>{
            if(response.data.content.length === 0){
                if(activePage !== 0){
                    this.setState({
                        activePage:activePage - 1
                    })
                    if(this.state.searchValue > 2){
                        this.setState({
                            patientList:(<h3>Pacientų nėrasta</h3>)
                        })
                    }
                    return ''
                }
                this.setState({
                    patientList:(<h3>Pacientų nėrasta</h3>),
                    listIsEmpty:true,
                })
            }else{
                this.setState({
                    patientList:<PatientListView patients={response.data.content.map(this.composePatient)}/>,
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

    bindClick = (patient_id) =>{
        axios.post("http://localhost:8080/api/admin/new/bind/"+this.props.params.userName+"/to/"+patient_id)
        .then((response)=>{
            console.log(response.status)
            this.getPatientList(this.state.searchValue, this.state.activePage);  
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
                key={patient.id}
                patientId={patient.id}
                birthDate={patient.birthDate}
                fullName={patient.fullName}
                patientBindLink={<td><PatientBindLink bindClick={this.bindClick} patientId={patient.id}/></td>}
            />
        )
    }

    fielddHandler = (e) =>{
        this.setState({
            searchValue:e.target.value
        })
    }
    
    searchdHandler = (e) =>{
        e.preventDefault();
        setTimeout(() =>{
            this.getPatientList(this.state.searchValue, 0)
        } , 1000 )
        
        this.setState({
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
        this.getPatientList(this.state.searchValue, activePage);  

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
                    <button className="btn btn-default" onClick={() => this.handlePageChange(this.state.activePage - 1)}>⟨</button>
                    <button className="btn btn-default" onClick={() => this.handlePageChange(this.state.activePage + 1)}>⟩</button>
                </div>
             
            </div>
        )
    }


    render(){
        return(
        <div className="container">
            <section>
                <div className="panel-group">
                <button onClick={() =>  this.props.router.goBack()} className="btn btn-primary"> Atgal </button>
                <p/>
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4>Priskirkite pacientą gydytojui</h4>
                        </div>
                        <div className="panel-body">
                            {this.state.infoState}
                            <div className="col-sm-12">
                                <h4 className="text-center" >Prašome įvesti bent 3 simbolius</h4>
                                <SearchFieldForm
                                        searchHandler={this.searchdHandler}
                                        fielddHandler={this.fielddHandler}
                                        searchValue={this.state.searchValue}
                                        searchPlaceHolder={"Pacientų paieška"}
                                        searchType={"text"}
                                    />
                            </div>
                            <div className="col-sm-12">
                                {this.state.patientList}
                                 {this.showPagination()}
                            </div>
                        </div> 
                    </div> 
                </div>           
            </section>
        </div>)
    }
}
