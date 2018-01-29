import React, {Component} from 'react'
import axios from 'axios'

import PatientForm from '../AdminComponent/PatientForm'


export default class AdminCreatePatientContainer extends Component{
    constructor(){
        super();
        this.state = {
            patientId:'',
            firstName:'',
            lastName:'',

            formErrors: {firstName: '', lastName: '', patientId: ''},
            firstNameValid: false,
            lastNameValid: false,
            patientIdValid: false,                  
            formValid: false,
            passwordMasked: true,
            generatedNumber: (Math.floor(Math.random() * (99 - 10 +1)) + 10).toString(),
            infoState:''
        }
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

        this.setState({[name]: value},
          () => { this.validateField(name, value) });
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
          
        let patientIdAsString = this.state.patientId.toString();
    
        let birthYearLastdigitsAsString = patientIdAsString.substring(1, 3);
        let birthMonthAsString = patientIdAsString.substring(3, 5); 
        let birthDayAsString = patientIdAsString.substring(5, 7);
    
        if(this.state.patientIdValid) {
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
        let firstNameValid = this.state.firstNameValid;
        let lastNameValid = this.state.lastNameValid;
        let patientIdValid = this.state.patientIdValid;
      
        switch (fieldName) {
            case 'firstName':
                firstNameValid = value.match(/^[a-zA-ZĄČĘĖĮŠŲŪŽąčęėįšųūž]+( [a-zA-ZĄČĘĖĮŠŲŪŽąčęėįšųūž]+)*$/g);
                // ^ Tikrina ar įrašytos tik raidės. Tarp žodžių leidžiamas vienas tarpas.
                //Vėliau su XRegExp galima būtų padaryti kad atpažintų ir kitų kalbų raides;
                fieldValidationErrors.firstName = firstNameValid ? '' : 'Įveskite vardą.';
                break;
            case 'lastName':
                lastNameValid = value.match(/^[a-zA-ZĄČĘĖĮŠŲŪŽąčęėįšųūž]+( [a-zA-ZĄČĘĖĮŠŲŪŽąčęėįšųūž]+)*$/g);
                // ^ Tikrina ar įrašytos tik raidės. Tarp žodžių leidžiamas vienas tarpas.
                fieldValidationErrors.lastName = lastNameValid ? '' : 'Įveskite pavardę.';
                break;
            case 'patientId':
                if(value.match(/^([3-6]{1})([0-9]{2})(((([0]{1})([013-9]{1})|([1]{1})([0-2]{1}))(([0-2]{1})([0-9]{1})|([3]{1})([0-1]{1})))|(([0]{1})([2]{1})([0-2]{1})([0-9]{1})))([0-9]{4})$/g)) {
                // ^ Tikrina ar įrašyta 11 skaitmenų. Pirmas skaičius gali būti tik 3, 4, 5 arba 6. Ketvirtas ir penktas - 00-12.  Šeštas ir septintas - 00-31. Jei Ketvirtas ir penktas - 02.  Šeštas ir septintas - 00-29.
                //Pastaba: jei asmuo neprisimena savo gimimo mėnesio ar dienos, tokiuose koduose vietoje mėnesio ar dienos skaitmenų įrašomi 0. Tai labai reta išimtis.
        
                    //Toliau patikrinama ar gimimo data "ne ateityje": 
                    let patientIdAsString = value.toString();
                
                    if(patientIdAsString.charAt(0) === "5" || patientIdAsString.charAt(0) === "6") {
            
                        let birthYearLastdigits = parseInt(patientIdAsString.substring(1, 3), 10);
                        let birthMonth = parseInt(patientIdAsString.substring(3, 5), 10); 
                        let birthDay = parseInt(patientIdAsString.substring(5, 7), 10);
                
                        let currentDate = new Date();
                        let currentYear = currentDate.getFullYear();
                        let currentMonth = currentDate.getMonth()+1;
                        let currentDay = currentDate.getDate();
                
                        if(currentYear < (2000 + birthYearLastdigits)) {
                            patientIdValid = false;
                        } else if(currentYear === (2000 + birthYearLastdigits) && currentMonth < birthMonth) {
                            patientIdValid = false;
                        } else if(currentYear === (2000 + birthYearLastdigits) && currentMonth === birthMonth && currentDay < birthDay) {
                            patientIdValid = false;
                        } else {
                            patientIdValid = true;
                        }
            
                    } else {patientIdValid = true;} 
        
                } else {patientIdValid = false;}
        
                fieldValidationErrors.patientId = patientIdValid ? '': 'Įveskite taisyklingą asmens kodą.';
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
                        firstNameValid: firstNameValid,
                        lastNameValid: lastNameValid,
                        patientIdValid: patientIdValid
                      }, this.validateForm);
    }

    //Paspausti "submit" leidžiama tik jei visi laukai įvesti teisingai.
    validateForm = () => {
        this.setState({formValid: this.state.firstNameValid && this.state.lastNameValid && this.state.patientIdValid});
    }
    
    //Jei įvesties lauko rėmelis žalias - informacija įvesta teisingai, jei raudonas - neteisingai.
    //Čia "is-valid" ir "is-invalid" yra formos elemento id. Spalvinimas aprašytas Form.css faile. 
    errorClass = (error) => {
        return(error.length === 0 ? 'is-valid' : 'is-invalid');
    }
    
    

    
    render(){
        return(
            <PatientForm 
            erorrClassPatientId={this.errorClass(this.state.formErrors.patientId)}
            erorrClassFirstName={this.errorClass(this.state.formErrors.firstName)}
            erorrClassLastName={this.errorClass(this.state.formErrors.lastName)}
            infoState={this.state.infoState}
            formErrors={this.state.formErrors}
            generateBirthDate={this.generateBirthDate()}
            generatePassword={this.generatePassword()}
            passwordMasked={this.state.passwordMasked}
            formValid={this.state.formValid}
            handlePasswordMasking={this.handlePasswordMasking}

            patientId={this.state.patientId}
            firstName={this.capitalizeFirstLetter(this.state.firstName)}
            lastName={this.capitalizeFirstLetter(this.state.lastName)}
            fieldHandler={this.fieldHandler}
            submitHandler={this.submitHandler}/>)
    }
}


