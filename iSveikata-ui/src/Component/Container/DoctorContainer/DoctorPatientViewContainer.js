import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router'

import RecordListingItem from '../DoctorComponent/RecordListingItem'
import RecordListView from '../DoctorComponent/RecordListView'
import PrescriptionListingItem from '../DoctorComponent/PrescriptionListingItem';
import PrescriptionListView from '../DoctorComponent/PrescriptionListView';
import RecordListingItemDemo from '../DoctorComponent/RecordListingItemDemo';
import RecordListViewDemo from '../DoctorComponent/RecordListViewDemo';

export default class DoctorPatientViewContainer extends Component{
    constructor(props){
        super(props)
        this.state = {
            patient:'',
            records:null,
            recordDetails:'',
            prescriptions:null,
            notFoundRecord:'',
            notFoundPrescription:'',
            viewContent:'',

            opendRecordRow:'',
            medicalcordDetail:''
        }
    }

    componentWillMount = () =>{

        var session =  JSON.parse(sessionStorage.getItem('session'))
        if(session === null || session.user.loggedIn !== true || session.user.userType !== 'doctor'){
            this.props.router.push('/vartotojams');
            return '';
        } 

       this.loadRecords();
       this.loadPrescriptions();
    }

    loadRecords = () =>{
        axios.get('http://localhost:8080/api/patient/'+this.props.params.patientId+'/record')
        .then((response) => {
            if(response.data.length === 0){
                this.setState({
                    notFoundRecord:(<h3>Ligos istorija tuščia</h3>)
                })
            }
            this.setState({
                records:response.data.map(this.composeRecord),
                viewContent:<RecordListViewDemo records={response.data.map(this.composeRecord)} notFound={this.state.notFoundRecord}/>
            })
            console.log(response.data)
        })
        .catch((erorr) =>{
            console.log(erorr)
        })
    }
    showRecordDetails = (rowId) =>{
        this.loadSpecificRecord(rowId);
        this.closeOpenDetails();
        console.log(rowId)
    }
    showPrescriptionDetails = (rowId) =>{
        this. loadSpecificPrescription(rowId);
        this.closeOpenDetails();
        console.log(rowId)
    }

    composeRecord = (record,index) =>{
        var date = new Date(record.appointment.date)
        var newDate = 
        date.getFullYear() 
        + '-'+ (date.getMonth()<10 ? 0+''+(date.getMonth()+1): (date.getMonth()+1)) 
        + '-' + (date.getDate()<10? 0+''+date.getDate(): date.getDate());
        
        return(
            <RecordListingItemDemo
                key={index}
                id={record.id}
                appDate={newDate}
                icd={record.icd.icdCode}
                doctorName={record.doctor.firstName + ' ' +record.doctor.lastName }
                // appDescription={record.appointment.description}
                // appDuration={record.appointment.duration}
                // compensable={record.compensable}
                // repetitive={record.repetitive}
                showDetails={this.showRecordDetails}
            />
        )
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

        return (<div style={{padding:'30px' }}>
                <p> Ligos įrašo data: {record.appointment.data}</p>
                <p>Ligos kodas: {record.icd.icdCode}</p>
                <p>Ligos įraša padares gydytojas: {record.doctor.firstName + ' ' +record.doctor.lastName} </p>
                <p>Vizito trukme: {record.appointment.duration}</p>
                <p>Vizitas komensuojamas? {compensable}</p>
                <p>Vizitas pakartotinas? {repetitive}</p>
                <p>Aprasymas: {record.appointment.description}</p>
        </div>)
    }

    loadPrescriptions = () =>{
        axios.get('http://localhost:8080/api/patient/'+this.props.params.patientId+'/prescription')
        .then((response) => {
            if(response.data.length === 0){
                this.setState({
                    notFoundPrescription:(<h3>Išrašytų receptų nėra</h3>)
                })
            }
            this.setState({
                prescriptions:response.data.map(this.composePrescription)
            })
            console.log(response.status)
        })
        .catch((erorr) =>{
            console.log(erorr)
        })
    }
    

    composePrescription = (prescription, index) =>{
        var usageLink = '';
        if(prescription.useAmount > 0){
            usageLink=<Link to={'/gydytojas/pacientas/receptas/'+prescription.id+'/panaudojimai'} className='btn btn-primary'>Recepto panaudojimai</Link>
        }

        return(
            <PrescriptionListingItem 
                key={index}
                index={index}
                id={prescription.id}
                prescriptionDate={prescription.prescriptionDate}
                expirationDate={prescription.expirationDate}
                ingredientName={prescription.api.title}
                // ingredientAmount={prescription.ingredientAmount}
                // units={prescription.ingredientUnit}
                // description={prescription.description}
                useAmount={prescription.useAmount}
                viewUsageLink={usageLink}
                showDetails={this.showPrescriptionDetails}
            />
        )
    }
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
    composeSpecificPrescription = (prescription) => {
       
        return (<div style={{padding:'30px' }}>
                <p>Išrašymo data: {prescription.prescriptionDate}</p>
                <p>Galiojimo data: {prescription.expirationDate}</p>
                <p>Recepto panaudojmų skaičius: {prescription.useAmount}</p>
                <p>Vaisto aktyvioji medžiaga: {prescription.apiDto.ingredientName}</p>
                <p>Aktyviosios medžiagos kiekis dozeje: {prescription.ingredientAmount}</p>
                <p>Matavimo vienetai: {prescription.unit}</p>
                <p>Aprašymas: {prescription.description}</p>
        </div>)
    }
    showMedicalRecord = () =>{
        this.setState({
            viewContent:<RecordListViewDemo records={this.state.records} notFound={this.state.notFoundRecord}/>
        })
    }
    showPrescription = () =>{
        this.setState({
            viewContent:<PrescriptionListView prescription={this.state.prescriptions} notFound={this.state.notFoundPrescription}/>
        })
    }

    

    closeOpenDetails = () =>{
        let el = document.getElementById("recordDetails")
        if(el.style.display === 'block'){
            el.style.display = 'none'
        }else{
            el.style.display = 'block'
        }
    }

    render() {
        return (
            <div className="container">
            <section>
                <div className="panel-group">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4>Pacientas</h4>
                            {/* <p>{this.state.patient.firstName + ' ' + this.state.patient.lastName}</p>
                            <p>{this.state.patient.patientId}</p>
                            <p>{this.state.patient.birthDate}</p> */}
                            <p>{this.props.params.patientId}</p>
                        </div>
                        <div className="panel-body">
                            <div className="col-sm-12">
                                 <ul className="nav nav-tabs">
                                    <li className="col-sm-6" ><a className="text-center" onClick={this.showMedicalRecord} data-toggle="pill" >Paciento ligos įrašai</a></li>
                                    <li className="col-sm-6" ><a className="text-center" onClick={this.showPrescription} data-toggle="pill" >Paciento receptai</a></li>
                                </ul>
                                <br/>
                                {this.state.viewContent}
                                <div id="recordDetails" style={{  height: '60%',
                                                width: '60%',
                                                border: '2px solid black',
                                                zIndex: '2',
                                                position: 'fixed',
                                                top: '20%',
                                                left: '20%',
                                                background: 'white',
                                                display:'none'}}>
                                <button onClick={this.closeOpenDetails} className="btn btn-success pull-right" >Uždaryti</button> 
                                {this.state.infoDetails}
                                </div>
                            </div>
                        </div> 
                    </div> 
                </div>           
            </section>
        </div>)
    }
}

  