import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router'
import Pagination from "react-js-pagination"

import PrescriptionListingItem from '../DoctorComponent/PrescriptionListingItem'; 
import PrescriptionListView from '../DoctorComponent/PrescriptionListView';
import PrescriptionUsageListView from '../DoctorComponent/PrescriptionUsageListView';
import PrescriptionUsageListingItem from '../DoctorComponent/PrescriptionUsageListingItem';

import { DetailsModalView } from '../DoctorComponent/DetailsModalView';



export default class PatientPrescriptionContainer extends Component{
    constructor(props){
        super(props)
        this.session =  JSON.parse(sessionStorage.getItem('session'));
        this.patientInfo = JSON.parse(sessionStorage.getItem('patientInfo'))
        this.state = {
            prescriptions:null,
            recordDetails:'',
            patient:'',
            notFoundPrescription:(<h3>Išrašytų receptų pacientas neturi</h3>),
            opendRecordRow:'',
            viewContent:'',
            contentType:'record',

            listInfo:'',

            activePage:1,
            itemsPerPage:8,
            listLength:'',

            infoDetails:'',
            infoHeader:'',

            prescriptionUsage:'',
            usage:null,
            info:''
        }
    }
    componentDidCatch = (erorr, info) =>{
        console.log(erorr)
        console.log(info)
    }
   
    componentWillMount = () =>{
        
        if(this.session === null || this.session.patient.loggedIn !== true){
            this.props.router.push('/pacientams');
            return '';
        }
        this.loadRecords(this.state.activePage);
    }
    //load all patient prescriptions and compose to view component
    loadRecords = (activePage) =>{
       axios.get('http://localhost:8080/api/patient/'
       +this.session.patient.patientId+'/prescription?page='
       +activePage+'&size='+this.state.itemsPerPage)
        .then((response) => {
            if(response.data.content.length === 0){
                this.setState({
                    viewContent:this.state.notFoundPrescription
                })
            }else{
                this.setState({
                    viewContent:<PrescriptionListView prescription={response.data.content.map(this.composePrescription)} />,
                    listInfo:response.data,
                    listLength:response.data.content.length,
                    })
            }
            console.log(response.data)
        })
        .catch((erorr) =>{
            console.log(erorr)
        })
    }

    //compose prescription list to specific listing item (view component)
    composePrescription = (prescription, index) =>{      
        return(
            <PrescriptionListingItem  
                key={index}
                index={index}
                id={prescription.id}
                prescriptionDate={prescription.prescriptionDate}
                expirationDate={prescription.expirationDate}
                ingredientName={prescription.apiTitle}
                useAmount={prescription.useAmount}
                showDetails={this.showPrescriptionDetails}
            />
        )
    }

    //request for single prescription and compose it to view object
   loadSpecificPrescription = (prescriptionId) =>{
        axios.get('http://localhost:8080/api/prescription/'+prescriptionId)
        .then((response) => {
            this.setState({
                    infoDetails:this.composeSpecificPrescription(response.data),
                    infoHeader: this.composeSpecificPrescriptionHeader(response.data)
                })
            console.log(response.status)
        })
        .catch((erorr) =>{
            console.log(erorr)
        })
    }

    composeSpecificPrescriptionHeader = (prescription) => {
       return   (<div>
                     <p>Recepto detali informacija</p>
                </div>)
    }

    //compose single object to spcific view object
    composeSpecificPrescription = (prescription) => {
       
        return (<div>
                <p>Vaisto aktyvioji medžiaga: <strong> {prescription.apiTitle}</strong></p>
                <p>Aktyviosios medžiagos kiekis dozėje: {prescription.amount}</p>
                <p>Matavimo vienetai: {prescription.apiUnits}</p>
                <p>Vartojimo aprašymas: {prescription.description}</p>
                <br/>
                <p>Recepto išrašymo data: {prescription.prescriptionDate}</p>
                <p>Recepto galiojimo data: {prescription.expirationDate}</p>
                <p>Receptą išrašęs gydytojas: {prescription.doctorFullName} </p>
                <p>Recepto panaudojimų skaičius: {prescription.useAmount}</p>
               
                

        </div>)
    }


    getPrescriptionUsage = (prescriptionId) =>{
        axios.get('http://localhost:8080/api/prescription/'+prescriptionId+'/usages')
        .then((response)=>{
            
            if (response.data.length === 0){
                this.setState({
                    info:(<h3>Recepto panaudojimų nerasta</h3>)
                })
            } else {
                    this.setState({
                      prescriptionUsage:<PrescriptionUsageListView 
                                            usage={response.data.map(this.composeUsage)}/>
                })
            }
            console.log(response.data)
        })

        .catch((erorr) => {
            //console.log(erorr)
        })
    }

    composeUsage= (usage, index) =>{
        return (
             <PrescriptionUsageListingItem
                key={index}
                date={usage.usageDate}
                druggistName={usage.druggist.firstName + ' ' + usage.druggist.lastName}
            />
        )
    }

    
    //on  record row click show prescription record details
    showPrescriptionDetails = (rowId) =>{
        if(document.getElementById('myModal').style.display === '' ||
         document.getElementById('myModal').style.display === 'none'){
            document.getElementById('modalButton').click()
        }
        
        this.loadSpecificPrescription(rowId);
        this.getPrescriptionUsage(rowId);
        console.log(rowId)
    }

     //handle paggination page changes 
    handlePageChange = (activePage) => {
        //by content type (record/prescription) send request for specific page
        this.loadRecords(activePage);
    
        //change activePage state to new page number
        this.setState({
             activePage:activePage
        })  
    }

    //Show paggination div with props from state
    showPagination = () =>{
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
                        <h4><strong>Vardas, pavardė: {this.patientInfo.fullName}</strong></h4>
                        <p>Asmens kodas: {this.patientInfo.id}</p>
                        <h3> Receptai</h3>
                        </div>
                        <div className="panel-body">
                            <div className="col-sm-12">

                            {this.state.viewContent}
                                {this.showPagination()}
                                <p id="modalButton" data-toggle="modal" data-backdrop="false" data-target="#myModal" className="hidden" ></p>
                                <DetailsModalView
                                    infoHeader={this.state.infoHeader}
                                    infoDetails={this.state.infoDetails}
                                    prescriptionUsage={this.state.prescriptionUsage}
                                />

                                {/* <div id="recordDetails" style={backgroundStyle}>
                                    <div  style={recordDetailWindowStyle}>
                                        <button onClick={this.closeOpenDetails} className="btn btn-success pull-right" >X</button> 
                                        {this.state.infoDetails}

                                     </div>
                                </div> */}
                            </div>
                        </div> 
                    </div> 
                </div>           
            </section>
        </div>)
    }
}
