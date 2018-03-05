import React, {Component} from 'react';
import axios from 'axios';

import PatientInfoCard from '../DoctorComponent/PatientInfoCard';
import PrescriptionForm from '../DoctorComponent/PrescriptionForm';
import { NewRecordLink } from '../LinksAndButtons/NewRecordLink';

export default class DoctorPrescriptionContainer extends Component{
    constructor(props){
        super(props);
        this.session =  JSON.parse(sessionStorage.getItem('session'));
        this.patientInfo = JSON.parse(sessionStorage.getItem('patientInfo'))
        this.state = {
            apis: '',
            apiUnits: '',

            userName: this.session.user.userName,

            infoState: '',

            daysToExpiration: 'select',
            substance: 'select',
            substanceAmount: '',
            substanceUnit: '',
            description: '',

            formErrors: {substanceAmount: '', description: ''},
            fieldState: {substanceAmount: 'is-empty', description: 'is-empty'},
            substanceAmountValid: false,
            descriptionValid: false,    

            daysToExpirationValid: false,  
            substanceValid: false,
      
            formValid: false,
        };
    }

    componentWillMount = () =>{
        if(this.session === null || this.session.user.loggedIn !== true || this.session.user.userType !== 'doctor'){
            this.props.router.push('/vartotojams');
            return '';
        }  
        this.loadApi();
    } 

    loadApi = () =>{
        this.setState({
            apis:this.session.doctor.apiList.map((api,index) => (<option key={index} value={api.ingredientName}>{api.ingredientName}</option>)),
            apiUnits:this.session.doctor.apiList.map(this.mapApiUnitsWithTitle)
        })
    } 

    mapApiUnitsWithTitle = (api, index) =>{
        return {
            "title": api.ingredientName,
            "units": api.unit,
            "desc":api.description
        }
    } 
 
    submitHandler = (e) => {
        let date = new Date()
        let currentDate = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
        let expDate = this.generateExpirationDate();
        console.log(expDate)
        e.preventDefault();
        if(this.state.formValid){
            axios.post('http://localhost:8080/api/doctor/new/prescription', {
                prescription:{
                    expirationDate:expDate,
                    prescriptionDate:currentDate,
                    description:this.state.description.toString(),
                    ingredientAmount:this.state.substanceAmount
                },
                patientId: this.patientInfo.id,
                userName: this.state.userName,
                apiTitle:this.state.substance
            })
            .then((response)=>{
                console.log(response.status)
                this.setState({
                    infoState:<div className="alert alert-success"><strong>Naujas receptas sėkmingai sukurtas.</strong></div>,
                    
                    substanceAmount: '',
                    description: '',
        
                    formErrors: {substanceAmount: '', description: ''},
                    substanceAmountValid: false,
                    descriptionValid: false,    
                    formValid: false,
                })
            })
            .catch((error) => {
                console.log(error)
                this.setState({
                    infoState:<div className="alert alert-danger"><strong>Nesėkmingas recepto kūrimas.</strong></div>
                })
            })
        }else{
            this.setState({
                infoState:<div className="alert alert-danger"><strong>Prašome taisyklingai užpildyti visus laukus ir pasirinkti reikiamas reikšmes iš sąrašų.</strong></div>
            })
        }
    }
    
    fieldHandler = (e) => {
        // e === event
        const name = e.target.name;
        const value = e.target.value;

        let daysToExpirationValid = this.state.daysToExpirationValid;
        let substanceValid = this.state.substanceValid;
       
        let substanceUnit = this.state.substanceUnit;

        switch (name) {
            case 'daysToExpiration':
                daysToExpirationValid = value === "select" ? false : true;
                break;
            case 'substance':
                substanceValid = value === "select" ? false : true;
                substanceUnit = substanceValid ? this.state.apiUnits.filter((api) => api.title === e.target.value).map((api) => api.units) : "";
                this.setState({
                    description:this.state.apiUnits.filter((api) => api.title === e.target.value).map((api) => api.desc),
                })
                break;
            default:
                break;
        }
        this.setState({[name]: value,
                    substanceUnit: substanceUnit,
                    daysToExpirationValid: daysToExpirationValid,
                    substanceValid: substanceValid,
        });   
    }

    fieldOnFocusHandler = (e) => {
        // e === event
        const name = e.target.name;
 
        let fieldValidationState = this.state.fieldState;
      
        switch (name) {
            case 'substanceAmount':
                fieldValidationState.substanceAmount = 'is-empty';
                break;
            case 'description':
                fieldValidationState.description = 'is-empty';
                break;
            default:
                break;
        }
        this.setState({fieldState: fieldValidationState, infoState: ''});
    }
    
    fieldValidationHandler = (e) => {
        // e === event
        const name = e.target.name;
        const value = e.target.value;

        if(value.length !== 0) {
         
            this.validateField(name, value);
        } else {
            let nameValid = name + 'Valid';
         
            let fieldValidationErrors = this.state.formErrors;
            switch (name) {
                case 'substanceAmount':
                    fieldValidationErrors.substanceAmount = '';
                    break;
                case 'description':
                    fieldValidationErrors.description = '';
                    break;
                default:
                    break;
            }
            this.setState({[nameValid]: false,
                formErrors: fieldValidationErrors
                }, this.validateForm);
        }    
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
                fieldValidationState.description = descriptionValid ? 'has-success' : 'has-error';
                //Jei įvesties lauko rėmelis žalias - informacija įvesta teisingai, jei raudonas - neteisingai.
                //Čia "is-valid" ir "is-invalid" yra formos elemento id. Spalvinimas aprašytas Form.css faile. 
                break;
            case 'substanceAmount':
                substanceAmountValid = value.match(/^(([1-9]{1})([\d]{0,})|([0-9]{1})([.]{1})([\d]{0,})([1-9]{1}))$/g);
                // ^ Tikrina ar įrašytas teigiamas skaičius. Jei pirmas skaičius nulis, po jo būtinai turi eiti "," ir bent vienas už nulį didesnis skaičius.
                fieldValidationErrors.substanceAmount = substanceAmountValid ? '': 'Įveskite veikliosios medžiagos kiekį (teigiamas skaičius).';
                fieldValidationState.substanceAmount = substanceAmountValid ? 'has-success' : 'has-error';
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
    
    //Jei bent vienas laukas neįvestas teisingai, paspaudus "submit" pasirodo perspėjimas.
    validateForm = () => {
        this.setState({formValid: this.state.descriptionValid && 
                                this.state.substanceAmountValid && 
                                this.state.daysToExpirationValid &&  
                                this.state.substanceValid &&
                                this.state.substanceUnit !== ""});
    }

    render() {
        return (
            <div className='container'>
                <section>
                    <button onClick={() =>  this.props.router.goBack()} className="btn btn-primary"> Atgal </button>
                    <NewRecordLink  patientId={this.patientInfo.id} />
                    <h2>Naujas receptas</h2>
                    <PatientInfoCard 
                    patientFullName={this.patientInfo.fullName}
                    date={this.patientInfo.birthDate}
                    patientId={this.patientInfo.id}
                    form={
                        <PrescriptionForm 
                        classNameDescription={this.state.fieldState.description}
                        classNameSubstanceAmount={this.state.fieldState.substanceAmount}
                        errorMessageDescriptione={this.state.formErrors.description}
                        errorMessageSubstanceAmount={this.state.formErrors.substanceAmount}
                        infoState={this.state.infoState}

                        substances={this.state.apis}

                        daysToExpiration={this.state.daysToExpiration}
                        description={this.state.description}
                        substance={this.state.substance}
                        substanceAmount={this.state.substanceAmount}
                        substanceUnit={this.state.substanceUnit}

                        icd={this.state.icd}

                        fieldValidationHandler={this.fieldValidationHandler}
                        fieldHandler={this.fieldHandler}
                        fieldOnFocusHandler={this.fieldOnFocusHandler}
                        submitHandler={this.submitHandler}
                        
                        generateExpirationDate={this.generateExpirationDate()} />
                    } />
                    {this.state.date}
                </section>
            </div>
        )
    } 

}
