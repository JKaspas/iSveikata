import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router'

import PrescriptionListingItem from '../DoctorComponent/PrescriptionListingItem'; 
import PrescriptionListView from '../DoctorComponent/PrescriptionListView';



export default class PatientPrescriptionContainer extends Component{
    constructor(props){
        super(props)
        this.session =  JSON.parse(sessionStorage.getItem('session'));
        this.state = {
            prescriptions:null,
            notFound:'',
            recordDetails:'',
            patient:'',
            notFoundPrescription:'',
            opendRecordRow:'',
            viewContent:''
            
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
      
       axios.get('http://localhost:8080/api/patient/'+this.session.patient.patientId+'/prescription')
        .then((response) => {
            if(response.data.length === 0){
                this.setState({
                    notFound:(<h3>Išrašytų receptų nėra</h3>)
                })
            }else{
                this.setState({
                    prescriptions:response.data.map(this.composePrescription),
                    // viewContent:<PrescriptionListView prescription={this.state.composePrescription} notFound={this.state.notFoundPrescription}/>
                    })
            }
            console.log(response.data)
        })
        .catch((erorr) =>{
            console.log(erorr)
        })
    }

    showPrescriptionDetails = (rowId) =>{
        this. loadSpecificPrescription(rowId);
        this.closeOpenDetails();
        console.log(rowId)
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
                <p>Recepto išrašymo data: {prescription.prescriptionDate}</p>
                <p>Recepto galiojimo data: {prescription.expirationDate}</p>
                <p>Recepto panaudojmų skaičius: {prescription.useAmount}</p>
                <p>Vaisto aktyvioji medžiaga: {prescription.apiDto.ingredientName}</p>
                <p>Aktyviosios medžiagos kiekis dozeje: {prescription.ingredientAmount}</p>
                <p>Matavimo vienetai: {prescription.unit}</p>
                <p>Aprašymas: {prescription.description}</p>
        </div>)
    }

    // showPrescription = () =>{
    //     this.setState({
    //         viewContent:<PrescriptionListView prescription={this.state.prescriptions} notFound={this.state.notFoundPrescription}/>
    //     })
    // }

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
                            <h4>Man išrašyti receptai</h4>
                        </div>
                        <div className="panel-body">
                            <div className="col-sm-12">
                            {/* {this.state.viewContent} */}
                            <PrescriptionListView
                                    prescription={this.state.prescriptions}
                                />
                                {this.state.notFound}
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

