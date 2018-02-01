import React, {Component} from 'react';
import axios from 'axios';

import PatientInfoCard from '../DoctorComponent/PatientInfoCard';
import PrescriptionForm from '../DoctorComponent/PrescriptionForm';



export default class DoctorPrescriptionContainer extends Component{
    constructor(){
        super();
        this.session =  JSON.parse(sessionStorage.getItem('session'))
        this.state = {

            patient: '',
            patientFullName: '',

            substances: '',

            daysToExpiration: '30 dienų',
            expirationDate: '',
            substance: 'Ibuprofenas',
            substanceAmount: '',
            substanceUnit: 'mg',
            description: '',

            patientId: props.params.patientId,
            userName: this.session.user.userName,
            
            infoState: '',

            formErrors: {substanceAmount: '', description: ''},
            substanceAmountValid: false,
            descriptionValid: false,    

            daysToExpirationValid: true,  
            substanceValid: true,
            substanceUnitValid: true,
      
            formValid: false,
        };
    }

    componentWillMount = () =>{
        if(this.session === null || this.session.user.loggedIn !== true || this.session.user.userType !== 'doctor'){
            this.props.router.push('/vartotojams');
            return '';
        }
        this.loadPatient();
        //this.loadSubstance();
        //this.getSubstanceUnit();
    }

    loadSubstance = () =>{
        axios.get('http://localhost:8080/api/substance')
        .then((response)=>{
            this.setState({
                substances:response.data.map((title, index) => (<option key={index} value={title.substance}>{title.substance}</option>))
            })
            console.log(response.status)
        })
        .catch((erorr) => {
            console.log(erorr)
        })
    }

    loadPatient = () =>{
        axios.get('http://localhost:8080/api/patient/'+ this.props.params.patientId)
        .then((response)=>{
            this.setState({
                patient:response.data,
                patientFullName:response.data.firstName + ' ' + response.data.lastName
            })
            console.log(response.status)
        })
        .catch((erorr) => {
            console.log(erorr)
        })
    }
    
    fieldHandler = (e) =>{
        const name = e.target.name;
        const value = e.target.value;

        this.setState({[name]: value},
            () => { this.validateField(name, value) });
        }
  
        // console.log("Input field name: " + name);
        // console.log("Input field value: " + value);
    }

    submitHandler = (e) =>{
        let date = new Date()
        let newDate = date.getFullYear() + '-'+ date.getMonth()+1 + '-' + date.getDate();
        e.preventDefault();
        console.log(newDate)
        axios.post('http://localhost:8080/api/doctor/new/prescription', {
 
            date: newDate,
            daysToExpiration: this.state.daysToExpiration,
            substance: this.state.substance,
            substanceAmount: this.state.ubstanceAmount,
            substanceUnit: this.state.substanceUnit,
            description: this.state.description,

            patientId: this.state.patientId,
            userName: this.state.userName
        })
        .then((response)=>{
            console.log(response.status)
            this.setState({
                infoState:<div className="alert alert-success"><strong>Naujas receptas sėkmingai sukurtas. </strong></div>,
                 
                substanceAmount: '',
                description: '',
    
                formErrors: {substanceAmount: '', description: ''},
                substanceAmountValid: false,
                descriptionValid: false,    
                daysToExpirationValid: true,  
                substanceValid: true,
                substanceUnitValid: true,
                formValid: false,
            })
        })
        .catch((erorr) => {
            console.log(erorr)
            this.setState({
                infoState:<div className="alert alert-danger"><strong>Nesėkmingas recepto kūrimas {erorr.response.data}</strong></div>
            })
        })
    }
    
    //neužbaigta funkcija
    generateExpirationDate = () => {
        let generatedExpirationDate = ''; 

        if(this.state.daysToExpirationValid) {
            let currentDate = new Date();
            currentDate.setDate(currentDate.getDate() + this.state.daysToExpiration);
            generatedExpirationDate = currentDate.toISOString().substr(0, 10);       
        }
        return generatedExpirationDate;
    }
    

    //Formos laukų validacija:
    validateField = (fieldName, value) => {
        let fieldValidationErrors = this.state.formErrors;
        let descriptionValid = this.state.descriptionValid;
        let substanceAmountValid = this.state.substanceAmountValid;
      
        switch (fieldName) {
            case 'description':
                descriptionValid = value.length >= 3;
                // ^ Tikrina ar įrašyta bent kažkas.
                fieldValidationErrors.description = descriptionValid ? '' : 'Nurodyti kokią vaisto dozę, kiek kartų ir kaip vartoti..';
                break;
            case 'substanceAmount':
                durationValid = value.match(/^\d{1,10}$/g);
                // ^ Tikrina ar įrašytas teigiamas skaičius.
                fieldValidationErrors.duration = durationValid ? '': 'Įveskite veikliosios medžiagos kiekį.';
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
                    descriptionValid: descriptionValid,
                    substanceAmountValid: substanceAmountValid,
                    }, this.validateForm);
    }
    
    //Paspausti "submit" leidžiama tik jei visi laukai įvesti teisingai.
    validateForm = () => {
        this.setState({formValid: this.state.descriptionValid && this.state.substanceAmountValid});
    }

    //Jei įvesties lauko rėmelis žalias - informacija įvesta teisingai, jei raudonas - neteisingai.
    //Čia "is-valid" ir "is-invalid" yra formos elemento id. Spalvinimas aprašytas Form.css faile. 
    errorClass = (error) => {
        return(error.length === 0 ? 'is-valid' : 'is-invalid');
    }
    
    render() {
        return (
            <div className='container'>
                <section>
                <h2>Naujas receptas</h2>
                <PatientInfoCard 
                patientFullName={this.state.patientFullName}
                patientId={this.state.patient.patientId}
                prescriptionForm={
                <PrescriptionForm 
                    errorClassDescription={this.errorClass(this.state.formErrors.description)}
                    errorClassSubstanceAmount={this.errorClass(this.state.formErrors.substanceAmount)}
                    infoState={this.state.infoState}
                    substances={this.state.substances}
                    formErrors={this.state.formErrors}

                    daysToExpiration={this.state.daysToExpiration}
                    description={this.state.description}
                    substance={this.state.substance}
                    substanceAmount={this.state.substanceAmount}
                    substanceUnit={this.state.substanceUnit}
                    formValid={this.state.formValid}
                    icd={this.state.icd}

                    submitHandler={this.submitHandler}
                    fieldHandler={this.fieldHandler}
                />}
                />
                {this.state.date}
                </section>
            </div>
        )
    }
}


