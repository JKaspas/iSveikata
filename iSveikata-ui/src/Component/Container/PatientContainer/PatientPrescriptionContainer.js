import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router'
import Pagination from "react-js-pagination"

import PrescriptionListingItem from '../DoctorComponent/PrescriptionListingItem'; 
import PrescriptionListView from '../DoctorComponent/PrescriptionListView';
import { DetailsModalView } from '../DoctorComponent/DetailsModalView';


// var backgroundStyle = {     height: '100%', width: '100%', zIndex: '3',
//                             position: 'fixed', top: '0', left: '0', background: 'rgba(255,255,255,0.8)', display:'none'}
// var recordDetailWindowStyle = {  height: '60%', width: '60%',  border: '2px solid black', zIndex: '4',
//                                 position: 'fixed', top: '20%', left: '20%', background: 'white', display:'block'}

export default class PatientPrescriptionContainer extends Component{
    constructor(props){
        super(props)
        this.session =  JSON.parse(sessionStorage.getItem('session'));
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

            prescriptionUsage:''
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


    composePrescription = (prescription, index) =>{
        var usageLink = '';
        if(prescription.useAmount > 0){
            usageLink=<Link onClick={this.hideModal} to={'/pacientas/receptas/'+prescription.id+'/panaudojimai'} className='btn btn-primary'>Recepto panaudojimai</Link>
        }
       
        return(
            <PrescriptionListingItem  
                key={index}
                index={index}
                id={prescription.id}
                prescriptionDate={prescription.prescriptionDate}
                expirationDate={prescription.expirationDate}
                ingredientName={prescription.apiTitle}
                useAmount={prescription.useAmount}
                viewUsageLink={<td>{usageLink}</td>}
                showDetails={this.showPrescriptionDetails}
            />
        )
    }

    hideModal = () =>{
        // document.getElementById(".modal-backdrop").style.position = ""
    }

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
                     <p>Pacientas: {prescription.patientFullName}</p>
                </div>)
    }

    composeSpecificPrescription = (prescription) => {
       
        return (<div>
                <p>Recepto išrašymo data: {prescription.prescriptionDate}</p>
                <p>Recepto galiojimo data: {prescription.expirationDate}</p>
                <p>Receptą išrašęs gydytojas: {prescription.doctorFullName} </p>
                <p>Recepto panaudojimų skaičius: {prescription.useAmount}</p>
                <p>Vaisto aktyvioji medžiaga: {prescription.apiTitle}</p>
                <p>Aktyviosios medžiagos kiekis dozėje: {prescription.amount}</p>
                <p>Matavimo vienetai: {prescription.apiUnits}</p>
                <p>Vartojimo aprašymas: {prescription.description}</p>
        </div>)
    }

    //on  record row click show prescription record details
    showPrescriptionDetails = (rowId) =>{
        this.loadSpecificPrescription(rowId);
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
                        <h4><strong>Asmens kodas {this.state.patient.patientId}</strong></h4>
                            <h3> Receptai</h3>
                        </div>
                        <div className="panel-body">
                            <div className="col-sm-12">

                            {this.state.viewContent}
                                {this.showPagination()}

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
