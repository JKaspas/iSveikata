import React, {Component} from 'react';
import axios from 'axios';

import PatientInfoCard from '../DoctorComponent/PatientInfoCard';
import PrescriptionForm from '../DoctorComponent/PrescriptionForm';


export default class DoctorPrescriptionContainer extends Component{
    constructor(props){
        super(props)
        this.session =  JSON.parse(sessionStorage.getItem('session'))
        this.state = {
            patient:'',
            patientFullName:'',
            apis:'',

            patientId:props.params.patientId,
            userName:this.session.user.userName,

            infoState:'',

            daysToExpiration: '10',
            substance: 'Lumefantrine',
            substanceAmount: '',
            substanceUnit: 'mg',
            description: '',
    
            formErrors: {substanceAmount: '', description: ''},
            fieldState: {substanceAmount: 'is-empty', description: 'is-empty'},
            substanceAmountValid: false,
            descriptionValid: false,    

            daysToExpirationValid: true,  
            substanceValid: true,
            substanceUnitValid: true,
      
            formValid: false,

        }
    }

     componentWillMount = () =>{
        if(this.session === null || this.session.user.loggedIn !== true || this.session.user.userType !== 'doctor'){
            this.props.router.push('/vartotojams');
            return '';
        }  
        this.loadPatient();
        this.loadApi();
    } 


    loadApi = () =>{
        axios.get('http://localhost:8080/api/api')
        .then((response)=>{
            this.setState({
                apis:response.data.map((api,index) => (<option key={index} value={api.ingredientName}>{api.ingredientName}</option>))
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
    
    fieldHandler = (e) => {
        // e === event
        const name = e.target.name;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        
            this.setState({[name]: value});
    }


    fieldValidationHandler = (e) => {
        // e === event
        const name = e.target.name;
        const value = e.target.value;
      
        this.validateField(name, value);
    }

    submitHandler = (e) => {
        let date = new Date()
        let currentDate = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
        let expDate = this.generateExpirationDate();
        e.preventDefault();
        axios.post('http://localhost:8080/api/doctor/new/prescription', {
           
    
            prescription:{
                expirationDate:expDate,
                prescriptionDate:currentDate,
                description:this.state.description,
                ingredientAmount:this.state.substanceAmount,
                ingredientUnit:this.state.substanceUnit,
            },
            patientId: this.state.patientId,
            userName: this.state.userName,
            apiTitle:this.state.substance
        })
        .then((response)=> {
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
                infoState:<div className="alert alert-danger"><strong>Nesėkmingas recepto kūrimas </strong></div>
            })
        })
    }

    //Receptas galioja iki
    generateExpirationDate = () => {
        let generatedExpirationDate = ''; 

        if(this.state.daysToExpirationValid) {

            let currentDate = new Date();
            currentDate.setDate(currentDate.getDate() + parseInt(this.state.daysToExpiration, 10));
            generatedExpirationDate = currentDate.toISOString().substr(0, 10);       
        }

        return generatedExpirationDate;
    }

     //Formos laukų validacija:
     validateField = (fieldName, value) => {
        let fieldValidationErrors = this.state.formErrors;
        let fieldValidationState = this.state.fieldState;
        let descriptionValid = this.state.descriptionValid;
        let substanceAmountValid = this.state.substanceAmountValid;
      
        switch (fieldName) {
            case 'description':
                descriptionValid = value.length >= 3;
                // ^ Tikrina ar įrašyta bent kažkas.
                fieldValidationErrors.description = descriptionValid ? '' : 'Nurodykite kokią vaisto dozę, kiek kartų ir kaip vartoti.';
                fieldValidationState.description = descriptionValid ? 'is-valid' : 'is-invalid';
                //Jei įvesties lauko rėmelis žalias - informacija įvesta teisingai, jei raudonas - neteisingai.
                //Čia "is-valid" ir "is-invalid" yra formos elemento id. Spalvinimas aprašytas Form.css faile. 
                break;
            case 'substanceAmount':
                substanceAmountValid = value.match(/^(([1-9]{1})([\d]{0,9})|([0]{1})([.]{1})([\d]{0,7})([1-9]{1}))$/g);
                // ^ Tikrina ar įrašytas teigiamas skaičius. Jei pirmas skaičius nulis, po jo būtinai turi eiti "," ir bent vienas už nulį didesnis skaičius.
                fieldValidationErrors.substanceAmount = substanceAmountValid ? '': 'Įveskite veikliosios medžiagos kiekį (teigiamas skaičius).';
                fieldValidationState.substanceAmount = substanceAmountValid ? 'is-valid' : 'is-invalid';
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
                    fieldState: fieldValidationState,
                    descriptionValid: descriptionValid,
                    substanceAmountValid: substanceAmountValid,
                    }, this.validateForm);
    }
    
    //Paspausti "submit" leidžiama tik jei visi laukai įvesti teisingai.
    validateForm = () => {
        this.setState({formValid: this.state.descriptionValid && this.state.substanceAmountValid});
    }


    render() {
        return (
            <div className='container'>
                <section>
                <h2>Naujas receptas</h2>
                <PatientInfoCard 
                patientFullName={this.state.patientFullName}
                patientId={this.state.patient.patientId}
                form={
                <PrescriptionForm 
                    errorClassDescription={this.state.fieldState.description}
                    errorClassSubstanceAmount={this.state.fieldState.substanceAmount}
                    infoState={this.state.infoState}
                    substances={this.state.apis}
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
                    fieldValidationHandler={this.fieldValidationHandler}

                    generateExpirationDate={this.generateExpirationDate()}
                />}
                />
                {this.state.date}
                </section>
            </div>
        )
    } 
                              
}
