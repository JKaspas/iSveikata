import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router'
import Pagination from "react-js-pagination"

import PrescriptionListingItem from '../DoctorComponent/PrescriptionListingItem'; 
import PrescriptionListView from '../DoctorComponent/PrescriptionListView';


var backgroundStyle = {     height: '100%', width: '100%', zIndex: '3',
                            position: 'fixed', top: '0', left: '0', background: 'rgba(255,255,255,0.8)', display:'none'}
var recordDetailWindowStyle = {  height: '60%', width: '60%',  border: '2px solid black', zIndex: '4',
                                position: 'fixed', top: '20%', left: '20%', background: 'white', display:'block'}

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
            usageLink=<Link to={'/pacientas/receptas/'+prescription.id+'/panaudojimai'} className='btn btn-primary'>Recepto panaudojimai</Link>
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

    loadSpecificPrescription = (prescriptionId) =>{
        axios.get('http://localhost:8080/api/prescription/'+prescriptionId)
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
                <p>Receptą išrašęs gydytojas: {prescription.doctorFullName} </p>
                <p>Recepto panaudojimų skaičius: {prescription.useAmount}</p>
                <p>Vaisto aktyvioji medžiaga: {prescription.apiTitle}</p>
                <p>Aktyviosios medžiagos kiekis dozėje: {prescription.amount}</p>
                <p>Matavimo vienetai: {prescription.apiUnits}</p>
                <p>Aprašymas: {prescription.description}</p>
        </div>)
    }

 //on medical record row click show prescription record details
    showPrescriptionDetails = (rowId) =>{
        this.loadSpecificPrescription(rowId);
        this.closeOpenDetails();
        console.log(rowId)
    }



//onClick on (medicalRecord or prescription) show or hide div with details
    closeOpenDetails = () =>{
        let el = document.getElementById("recordDetails")
        if(el.style.display === 'block'){
            el.style.display = 'none'
        }else{
            el.style.display = 'block'
        }
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
                            <h4>Man išrašyti receptai</h4>
                        </div>
                        <div className="panel-body">
                            <div className="col-sm-12">

                            {this.state.viewContent}
                                {this.showPagination()}

                                <div id="recordDetails" style={backgroundStyle}>
                                    <div  style={recordDetailWindowStyle}>
                                        <button onClick={this.closeOpenDetails} className="btn btn-success pull-right" >X</button> 
                                        {this.state.infoDetails}

                                     </div>
                                </div>
                            </div>
                        </div> 
                    </div> 
                </div>           
            </section>
        </div>)
    }
}
