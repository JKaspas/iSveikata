import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router'
import Pagination from "react-js-pagination"


import PrescriptionListingItem from '../DoctorComponent/PrescriptionListingItem';
import PrescriptionListView from '../DoctorComponent/PrescriptionListView';
import RecordListingItemDemo from '../DoctorComponent/RecordListingItemDemo';
import RecordListViewDemo from '../DoctorComponent/RecordListViewDemo';
import { DetailsModalView } from '../DoctorComponent/DetailsModalView';

// var backgroundStyle = {     height: '100%', width: '100%', zIndex: '3',
//                             position: 'fixed', top: '0', left: '0', background: 'rgba(255,255,255,0.8)', display:'none'}
// var recordDetailWindowStyle = {  height: '60%', width: '60%',  border: '2px solid black', zIndex: '4',
//                                 position: 'fixed', top: '20%', left: '20%', background: 'white', display:'block'}

export default class DoctorPatientViewContainer extends Component{
    constructor(props){
        super(props)
        this.state = {
            patient:'',
            recordDetails:'',
            notFoundRecord:(<h3>Ligos istorija tuščia</h3>),
            notFoundPrescription:(<h3>Išrašytų receptų pacientas neturi</h3>),
            viewContent:'',
            contentType:'record',

            listInfo:'',

            activePage:1,
            itemsPerPage:8,
            listLength:'',

            infoHeader:'',
            infoDetails:'',

            prescriptionUsage:''

        }
    }

    componentWillMount = () =>{
        var session =  JSON.parse(sessionStorage.getItem('session'))
        if(session === null || session.user.loggedIn !== true || session.user.userType !== 'doctor'){
            this.props.router.push('/vartotojams');
            return '';
        } 
       this.loadRecords(this.state.activePage);

    }
    //load all patient medical record and compose to view component
    loadRecords = (activePage) =>{
        axios.get('http://localhost:8080/api/patient/'
        +this.props.params.patientId+'/record?page='
        +activePage+'&size='+this.state.itemsPerPage)
        .then((response) => {
            document.getElementById("record-tab").style.background = "lightGrey"

            if(response.data.content.length === 0){
                this.setState({
                    viewContent:this.state.notFoundRecord
                })
            }else{
                this.setState({
                    viewContent:<RecordListViewDemo records={response.data.content.map(this.composeRecords)} />,
                    listInfo:response.data,
                    listLength:response.data.content.length,
                })
                console.log(response.status)
            }
        })
        .catch((erorr) =>{
            console.log(erorr)
        })
    }
     //load all patient prescriptions and compose to view component
     loadPrescriptions = (activePage) =>{
        axios.get('http://localhost:8080/api/patient/'
        +this.props.params.patientId+'/prescription?page='
        +activePage+'&size='+this.state.itemsPerPage)
        .then((response) => {
            if(response.data.content.length === 0){
                this.setState({
                    viewContent:this.state.notFoundPrescription
                })
            }else{
                this.setState({
                    viewContent:<PrescriptionListView 
                                prescription={response.data.content.map(this.composePrescription)} />,
                    listInfo:response.data,
                    listLength:response.data.content.length,
                   
                })
                
            }
            console.log(response.status)
        })
        .catch((erorr) =>{
            console.log(erorr)
        })
    }
    composeRecords = (record,index) =>{
        // var date = new Date(record.appointment.date)
        // var newDate =  date.getFullYear() 
        // + '-'+ ((date.getMonth()+1)<10 ? 0+''+(date.getMonth()+1): (date.getMonth()+1)) 
        // + '-' + (date.getDate()<10? 0+''+date.getDate(): date.getDate());
        return(
            <RecordListingItemDemo
                key={index}
                id={record.id}
                appDate={record.appointmentDate}
                icd={record.icdCode}
                doctorName={record.doctorFullName}
                showDetails={this.showRecordDetails}
            />
        )
    }
     //compose prescription list to specific listing item (view component)
     composePrescription = (prescription, index) =>{
        var usageLink = '';
        //if prescription have any prescriptionUsage then show button to view usages
        if(prescription.useAmount > 0){
            usageLink=<Link onClick={this.hideModal} to={'/gydytojas/pacientas/receptas/'+prescription.id+'/panaudojimai'} className='btn btn-primary'>Recepto panaudojimai</Link>
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

    loadSpecificRecord = (recordId) =>{
        axios.get('http://localhost:8080/api/record/'+recordId)
        .then((response) => {
            this.setState({
                infoDetails:this.composeSpecificRecord(response.data)
                })
            console.log(response.status)
        })
        .catch((erorr) =>{
            console.log(erorr)
        })
    }
    composeSpecificRecord = (record) => {
        var yesValue = 'Taip';
        var noValue = 'Ne';

        var compensable = record.compensable === true? yesValue:noValue;
        var repetitive = record.repetitive === true? yesValue:noValue;

        return (<div>
                <p>Ligos įrašo data: {record.appointmentDate}</p>
                <p>Ligos kodas: {record.icdCode}</p>
                <p>Ligos aprasymas: {record.icdDescription}</p>
                <p>Ligos įrašą padaręs gydytojas: {record.doctorFullName} </p>
                <p>Vizito trukmė: {record.appoitmentDuration}</p>
                <p>Vizitas kompensuojamas? {compensable}</p>
                <p>Vizitas pakartotinis? {repetitive}</p>
                <p>Vizito aprašymas: {record.appointmentDescription}</p>
        </div>)
    }

    
   //request for single prescription and compose it to view object
   loadSpecificPrescription = (prescriptionId) =>{
        axios.get('http://localhost:8080//api/prescription/'+prescriptionId)
        .then((response) => {
            this.setState({
                    infoDetails:this.composeSpecificPrescription(response.data)
                })
            console.log(response.status)
        })
        .catch((erorr) =>{
            console.log(erorr)
        })
    }
    //compose single object to spcific view object
    composeSpecificPrescription = (prescription) => {
       
        return (<div>
                <p>Išrašymo data: {prescription.prescriptionDate}</p>
                <p>Galiojimo data: {prescription.expirationDate}</p>
                <p>Receptą išrašęs gydytojas: {prescription.doctorFullName} </p>
                <p>Recepto panaudojimų skaičius: {prescription.useAmount}</p>
                <p>Vaisto aktyvioji medžiaga: {prescription.apiTitle}</p>
                <p>Aktyviosios medžiagos kiekis dozėje: {prescription.amount}</p>
                <p>Matavimo vienetai: {prescription.apiUnits}</p>
                <p>Aprašymas: {prescription.description}</p>
        </div>)
    }

    //on medical record tab click show list of medical record
    showMedicalRecord = () =>{
        document.getElementById("record-tab").style.background = "lightGrey"
        document.getElementById("prescription-tab").style.background = "none"
        
        this.setState({
            activePage:1,
            contentType:'record'
        })
        this.loadRecords(1)
    }
    //on prescription tab click show list of prescription
    showPrescription = () =>{
        document.getElementById("record-tab").style.background = "none"
        document.getElementById("prescription-tab").style.background = "lightGrey"

        this.setState({
            activePage:1,
            contentType:'prescription'
        })
        this.loadPrescriptions(1) 
    }

    //on medical record row click show record details
    showRecordDetails = (rowId) =>{
        this.loadSpecificRecord(rowId);
    }
    //on prescription click show sprescription details
    showPrescriptionDetails = (rowId) =>{
        this.loadSpecificPrescription(rowId);
    }



     //handle paggination page changes 
     handlePageChange = (activePage) => {
        //by content type (record/prescription) send request for specific page
       if(this.state.contentType === 'record'){
            this.loadRecords(activePage);
        }else{
            this.loadPrescriptions(activePage)
        }
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
            <button onClick={() =>  this.props.router.goBack()} className="btn btn-primary"> Atgal </button>
            <p/>
                <div className="panel-group">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4>Pacientas</h4>
                            <p>{this.props.params.patientId}</p>
                        </div>
                        <div className="panel-body">
                            <div className="col-sm-12">
                                 <ul className="nav nav-tabs">
                                    <li className="col-sm-6">
                                        <a className="text-center" id="record-tab"
                                            onClick={this.showMedicalRecord} 
                                            data-toggle="pill" >Paciento ligos įrašai</a>
                                    </li>
                                    <li className="col-sm-6" >
                                        <a className="text-center" id="prescription-tab"
                                            onClick={this.showPrescription} 
                                            data-toggle="pill" >Paciento receptai</a>
                                    </li>
                                </ul>
                                <br/>
                                {this.state.viewContent}
                                {this.showPagination()}

                                <DetailsModalView
                                    infoHeader={this.state.infoHeader}
                                    infoDetails={this.state.infoDetails}
                                    prescriptionUsage={this.state.prescriptionUsage}
                                />
                            </div>
                        </div> 
                    </div> 
                </div>           
            </section>
        </div>)
    }
}

