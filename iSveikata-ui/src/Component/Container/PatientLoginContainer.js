import React ,{Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

import LoginForm from '../LoginForm/LoginForm';
import { patientLoggedIn } from './_action/index';

class PatientLoginContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
            patientId:'',
            password:'',

            infoState:'',

            formErrors: {patientId: '', password: ''},
            fieldState: {patientId: 'is-empty', password: 'is-empty'},
            patientIdValid: false,
            passwordValid: false,    
            formValid: false,
        };
    }
    
    
    submitHandler = (e) =>{
        e.preventDefault();
            axios.post('http://localhost:8080/api/patient/login', {
                patientId:this.state.patientId,
                password:this.state.password
            })
            .then((response) => {
                this.props.dispatch(patientLoggedIn(this.state.patientId))
                this.props.router.push('/patient/');
                console.log(this.props)
                console.log(response.status)
            })
            .catch((error) => {
                //console.log(error.response.data)
                this.setState({
                    infoState:(<div className="alert alert-danger"><strong>{error.response.data}</strong></div>)
                })
            })
        
    }
    
    fieldHandler = (e) => {
        // e === event
        const name = e.target.name;
        const value = e.target.value;
    
            this.setState({[name]: value});
    }

    fieldValidationHandler = (e) => {
        // e === event
        const name = e.target.name;
        const value = e.target.value;

        if(value.length !== 0) {
         
            this.validateField(name, value);
        } else {
            let nameValid = name + 'Valid';
            this.setState({[nameValid]: false}, this.validateForm);      
        }    
    }

    validateField = (fieldName, value) => {
        let fieldValidationErrors = this.state.formErrors;
        let fieldValidationState = this.state.fieldState;
        let patientIdValid = this.state.patientIdValid;
        let passwordValid = this.state.passwordValid;
      
        switch (fieldName) {
            case 'patientId':
                //Patikrinama ar įrašyta 11 skaitmenų.
                if(value.length === 11) {

                    //Patikrinamas AK: 
                    //    įrašyti tik skaitmenys;
                    //    pirmas skaičius gali būti tik 3, 4, 5 arba 6;
                    //    ketvirtas ir penktas - 00-12; 
                    //    šeštas ir septintas - 00-31;
                    //    jei Ketvirtas ir penktas - 02, tai šeštas ir septintas - 00-29.
                    //Pastaba: jei asmuo neprisimena savo gimimo mėnesio ar dienos, tokiuose koduose vietoje mėnesio ar dienos skaitmenų įrašomi 0. Tai labai reta išimtis.
                    if(value.match(/^([3-6]{1})([0-9]{2})(((([0]{1})([013-9]{1})|([1]{1})([0-2]{1}))(([0-2]{1})([0-9]{1})|([3]{1})([0-1]{1})))|(([0]{1})([2]{1})([0-2]{1})([0-9]{1})))([0-9]{4})$/g)) {

                        let patientIdAsString = value.toString();

                        let birthYearFirstdigits = patientIdAsString.charAt(0) === "3" || patientIdAsString.charAt(0) === "4" ? 1900 : 2000;
                        let birthYearLastdigits = parseInt(patientIdAsString.substring(1, 3), 10);

                        let birthYear = birthYearFirstdigits + birthYearLastdigits;
                        let birthMonth = parseInt(patientIdAsString.substring(3, 5), 10); 
                        let birthDay = parseInt(patientIdAsString.substring(5, 7), 10);

                        let currentDate = new Date();
                        let birthDate = new Date();
                        birthDate.setFullYear(birthYear, birthMonth-1, birthDay);

                        //Patikrinama, ar gimimo data "ne ateityje". 
                        if(birthDate < currentDate) {

                            //Patikrinama, ar gimimo metai keliamieji.
                            if(birthYear % 400 === 0 || (birthYear % 100 !== 0 && birthYear % 4 === 0)) {
                                patientIdValid = true;
                                fieldValidationErrors.patientId = '';
                            //Jei gimimo metai ne keliamieji - tikrinama ar ketvirtas-septintas skaitmenys nėra 0229 (tokiais metais vasaris turi tik 28 dienas).
                            } else if(birthMonth === 2 && birthDay === 29) {
                                patientIdValid = false;
                                fieldValidationErrors.patientId = 'Patikrinkite ar gerai įvedėte 4-7 skaitmenis.';
                            } else {
                                patientIdValid = true;
                                fieldValidationErrors.patientId = '';  
                            }
                            
                        } else {
                            patientIdValid = false;
                            fieldValidationErrors.patientId = 'Patikrinkite ar gerai įvedėte pirmą skaitmenį. Jei taip - tikrinkite 2-7 skaitmenis.';
                        }

                    } else {
                        patientIdValid = false;
                        fieldValidationErrors.patientId = 'Patikrinkite ar gerai įvedėte 1-7 skaitmenis.'; 
                    }

                } else {
                    patientIdValid = false;
                    fieldValidationErrors.patientId = 'Įveskite 11 skaitmenų asmens kodą.';
                }

                fieldValidationState.patientId = patientIdValid ? 'is-valid' : 'is-invalid';
                //Jei įvesties lauko rėmelis žalias - informacija įvesta teisingai, jei raudonas - neteisingai.
                //Čia "is-valid" ir "is-invalid" yra formos elemento id. Spalvinimas aprašytas Form.css faile. 
                break;

            case 'password':
                passwordValid = value.length >= 8 && value.length <= 15;
                // ^ Tikrina ar įrašyta ne mažiau kaip 8 ir ne daugiau kaip 15 simbolių.
                fieldValidationErrors.password = passwordValid ? '' : (value.length < 8 ? 'Slaptažodis per trumpas.' : 'Slaptažodis per ilgas.');
                fieldValidationState.password = passwordValid ? 'is-valid' : 'is-invalid';
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
                    fieldState: fieldValidationState,
                    patientIdValid: patientIdValid,
                    passwordValid: passwordValid,
                    }, this.validateForm);
    }

    //Paspausti "submit" leidžiama tik jei visi laukai įvesti teisingai.
    validateForm = () => {
        this.setState({formValid: this.state.patientIdValid && this.state.passwordValid});
    }

    render() {
        return (
            <LoginForm
            errorClassLoginValue={this.state.fieldState.patientId}
            errorClassPassword={this.state.fieldState.password} 
            infoState={this.state.infoState}
            formErrors={this.state.formErrors}
            formValid={this.state.formValid}

            loginValue={this.state.patientId}
            password={this.state.password}

            fieldValidationHandler={this.fieldValidationHandler}
            fieldHandler={this.fieldHandler}
            submitHandler={this.submitHandler}

            loginPlaceholder={"Asmens kodas"}
            loginValueName={"patientId"}
            />
        )
    }
}


const mapStateToProps = (state) =>{
    return{
        patient:state.patient
    }
}

export default connect(mapStateToProps)(PatientLoginContainer)