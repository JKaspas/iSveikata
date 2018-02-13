import React, {Component} from 'react';
import axios from 'axios';

import PatientForm from '../AdminComponent/PatientForm';


export default class AdminCreatePatientContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
            patientId:'',
            firstName:'',
            lastName:'',

            formErrors: {firstName: '', lastName: '', patientId: ''},
            fieldState: {firstName: 'is-empty', lastName: 'is-empty', patientId: 'is-empty'},
            firstNameValid: false,
            lastNameValid: false,
            patientIdValid: false,                  
            formValid: false,
            passwordMasked: true,
            generatedNumber: (Math.floor(Math.random() * (99 - 10 +1)) + 10).toString(),
            infoState:''
        };
    }

    componentWillMount = () =>{
        var session =  JSON.parse(sessionStorage.getItem('session'))
        if(session === null || session.user.loggedIn !== true || session.user.userType !== 'admin'){
            this.props.router.push('/vartotojams');
            return '';
        }  
    }


    fieldHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({[name]: value});
    }


    fieldValidationHandler = (e) => {
        // e === event
        const name = e.target.name;
        const value = e.target.value;
      
        this.validateField(name, value);
    }


    submitHandler = (e) =>{
        e.preventDefault();
        
        axios.post('http://localhost:8080/api/admin/new/patient', {
            patientId:this.state.patientId,
            birthDate:this.generateBirthDate(),  //this.generateBirthDate(),  (?)
            firstName:this.state.firstName,  //this.capitalizeFirstLetter(this.state.firstName),  (?)  
            lastName:this.state.lastName,    //this.capitalizeFirstLetter(this.state.lastName),  (?)
            password:this.generatePassword(),    //this.generatePassword(),  (?) 
        })
        .then((response)=>{
            console.log(response.status)
            this.setState({
                infoState:<div className="alert alert-success"><strong>{response.data}</strong></div>,
                patientId:'',
                firstName:'',
                lastName:'',
                formValid:false
            })

        })
        .catch((erorr) => {
            console.log(erorr)
            this.setState({
                infoState:<div className="alert alert-danger"><strong>{erorr.response.data}</strong></div>
            })
        })
    }
    capitalizeFirstLetter = (string) => { 
        return string.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }

    //Pagal įvestą asmens kodą sužinoma gimimo data. 
    generateBirthDate = () => {
        let birthDateAutoInput = '';
          
        if(this.state.patientIdValid) {
            let patientIdAsString = this.state.patientId.toString();
    
            let birthYearLastdigitsAsString = patientIdAsString.substring(1, 3);
            let birthMonthAsString = patientIdAsString.substring(3, 5); 
            let birthDayAsString = patientIdAsString.substring(5, 7);
            
            if(patientIdAsString.charAt(0) === "3" || patientIdAsString.charAt(0) === "4") {
                birthDateAutoInput = "19" + birthYearLastdigitsAsString + "-" + birthMonthAsString + "-" + birthDayAsString;
            } else if(patientIdAsString.charAt(0) === "5" || patientIdAsString.charAt(0) === "6") {
                birthDateAutoInput = "20" + birthYearLastdigitsAsString + "-" + birthMonthAsString + "-" + birthDayAsString;
            } 
            // else {
            //     birthDateAutoInput = "18" + birthYearLastdigitsAsString + "-" + birthMonthAsString + "-" + birthDayAsString;
            // } 
        }
        return birthDateAutoInput;  
    }

    //Slaptažodis sudaromas iš trijų pirmų vardo raidžių, trijų pirmų pavardės raidžių ir atsitiktinio dviženklio skaičiaus. 
    generatePassword = () => {
        let generatedPassword = ''; 
        if(this.state.formValid) {
            generatedPassword = this.state.firstName.substring(0, 3) + this.state.lastName.substring(0, 3) + this.state.generatedNumber;    
        }
        return generatedPassword;
    }

     //Paspaudus ant slaptažodžio įvesties langelio (read only), galima pamatyti slaptažodį; vėl paspaudus - paslėpti.
     handlePasswordMasking = () => {
        this.setState(prevState => ({passwordMasked: !prevState.passwordMasked}));
    }
     //Formos laukų validacija:
     validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let fieldValidationState = this.state.fieldState;
        let firstNameValid = this.state.firstNameValid;
        let lastNameValid = this.state.lastNameValid;
        let patientIdValid = this.state.patientIdValid;
      
        switch (fieldName) {
            case 'firstName':
                firstNameValid = value.match(/^[a-zA-ZĄČĘĖĮŠŲŪŽąčęėįšųūž]+( [a-zA-ZĄČĘĖĮŠŲŪŽąčęėįšųūž]+)*$/g);
                // ^ Tikrina ar įrašytos tik raidės. Tarp žodžių leidžiamas vienas tarpas.
                //Vėliau su XRegExp galima būtų padaryti kad atpažintų ir kitų kalbų raides;
                fieldValidationErrors.firstName = firstNameValid ? '' : 'Įveskite vardą.';
                fieldValidationState.firstName = firstNameValid ? 'is-valid' : 'is-invalid';
                //Jei įvesties lauko rėmelis žalias - informacija įvesta teisingai, jei raudonas - neteisingai.
                //Čia "is-valid" ir "is-invalid" yra formos elemento id. Spalvinimas aprašytas Form.css faile. 
                break;
            case 'lastName':
                lastNameValid = value.match(/^[a-zA-ZĄČĘĖĮŠŲŪŽąčęėįšųūž]+( [a-zA-ZĄČĘĖĮŠŲŪŽąčęėįšųūž]+)*$/g);
                // ^ Tikrina ar įrašytos tik raidės. Tarp žodžių leidžiamas vienas tarpas.
                fieldValidationErrors.lastName = lastNameValid ? '' : 'Įveskite pavardę.';
                fieldValidationState.lastName = lastNameValid ? 'is-valid' : 'is-invalid';
                break;
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
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
                        fieldState: fieldValidationState,
                        firstNameValid: firstNameValid,
                        lastNameValid: lastNameValid,
                        patientIdValid: patientIdValid
                      }, this.validateForm);
    }

    //Paspausti "submit" leidžiama tik jei visi laukai įvesti teisingai.
    validateForm = () => {
        this.setState({formValid: this.state.firstNameValid && this.state.lastNameValid && this.state.patientIdValid});
    }
    
    
    render(){
        return(
            <PatientForm 
            errorClassPatientId={this.state.fieldState.patientId}
            errorClassFirstName={this.state.fieldState.firstName}
            errorClassLastName={this.state.fieldState.lastName}
            infoState={this.state.infoState}
            formErrors={this.state.formErrors}
            formValid={this.state.formValid}

            generateBirthDate={this.generateBirthDate()}
            generatePassword={this.generatePassword()}

            passwordMasked={this.state.passwordMasked}
            handlePasswordMasking={this.handlePasswordMasking}

            patientId={this.state.patientId}
            firstName={this.capitalizeFirstLetter(this.state.firstName)}
            lastName={this.capitalizeFirstLetter(this.state.lastName)}

            fieldValidationHandler={this.fieldValidationHandler}
            fieldHandler={this.fieldHandler}
            submitHandler={this.submitHandler}/>)
    }
}


