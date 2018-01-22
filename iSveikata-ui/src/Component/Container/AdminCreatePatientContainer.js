import React, {Component} from 'react'
import axios from 'axios'

import { FormErrors } from './Form_errors';
import './Form.css';

export default class AdminCreatePatientContainer extends Component{

    constructor (props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            patientId: '',
            birthDate: '',
            password: '',
            formErrors: {firstName: '', lastName: '', patientId: ''},
            firstNameValid: false,
            lastNameValid: false,
            patientIdValid: false,                  
            formValid: false,
            passwordMasked: true,
            generatedNumber: (Math.floor(Math.random() * (99 - 10 +1)) + 10).toString()
        };
        this.handlePasswordMasking = this.handlePasswordMasking.bind(this);
    }

    fieldHandler (e) {
        const name = e.target.name;
        const value = e.target.value;
    
        this.setState({[name]: value},
          () => { this.validateField(name, value) });
        
        console.log("Input field name: " + name);
        console.log("Input field value: " + value);
    }

    submitHandler = (e) =>{
        e.preventDefault();
        axios.post('http://localhost:8080/api/admin/new/patient', {
            patientId:this.state.patientId,
            birthDate:this.state.birthDate,  //this.generateBirthDate(),  (?)
            firstName:this.state.firstName,  //this.capitalizeFirstLetter(this.state.firstName),  (?)  
            lastName:this.state.lastName,    //this.capitalizeFirstLetter(this.state.lastName),  (?)
            password:this.state.password,    //this.generatePassword(),  (?) 
        })
        .then((response)=>{
            console.log(response.status)
            // this.setState({
            //     name:'',
            //     surname:'',
            //     username:'',
            //     password:'',
    
            //     drugStore:'', 
            //     specialization:'',
            //     type:''
            // })
        })
        .catch((erorr) => {
            console.log(erorr)
        })
    }

    //Užtikrina, kad vardas ir pavardė būtų iš didžiosios raidės, jei įvesta mažosiomis.
    capitalizeFirstLetter(string) { 
        return string.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }
    
    //Pagal įvestą asmens kodą sužinoma gimimo data. 
    generateBirthDate() {
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
            } else {
                birthDateAutoInput = "18" + birthYearLastdigitsAsString + "-" + birthMonthAsString + "-" + birthDayAsString;
            } 
        }
        return birthDateAutoInput;  
    }
    
    //Slaptažodis sudaromas iš trijų pirmų vardo raidžių, trijų pirmų pavardės raidžių ir atsitiktinio dviženklio skaičiaus. 
    generatePassword() {
        let generatedPassword = ''; 
        if(this.state.formValid) {
            generatedPassword = this.state.firstName.substring(0, 3) + this.state.lastName.substring(0, 3) + this.state.generatedNumber;    
        }
        return generatedPassword;
    }
    
    //Paspaudus ant slaptažodžio įvesties langelio (read only), galima pamatyti slaptažodį; vėl paspaudus - paslėpti.
    handlePasswordMasking() {
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
    validateForm() {
        this.setState({formValid: this.state.firstNameValid && this.state.lastNameValid && this.state.patientIdValid});
    }
    
    //Jei įvesties lauko rėmelis žalias - informacija įvesta teisingai, jei raudonas - neteisingai.
    //Čia "is-valid" ir "is-invalid" yra formos elemento id. Spalvinimas aprašytas Form.css faile. 
    errorClass(error) {
        return(error.length === 0 ? 'is-valid' : 'is-invalid');
    }
    
    render(){
        return(
        <div className="container">
            <section>     
                <div className="panel-group">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4>Naujo paciento registravimo forma</h4>
                        </div>
                        <div className="panel-body">
                            <div className="col-sm-10">
                                <div className="col-sm-9 col-sm-offset-3"> 
                                    <FormErrors formErrors={this.state.formErrors}/>
                                </div>
                                <form onSubmit={this.submitHandler} className="form-horizontal" >
                                    <div className="form-group">
                                        <label className="control-label col-sm-3">Asmens kodas:</label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" id={this.errorClass(this.state.formErrors.patientId)} value={this.state.patientId} required maxLength="11" onChange={(event) => this.fieldHandler(event)} placeholder="Asmens kodas" name="patientId" />
                                        </div>
                                    </div>
                                        <div className="form-group">
                                        <label className="control-label col-sm-3">Gimimo data:</label>
                                        <div className="col-sm-9">
                                            <input type="text" readOnly className="form-control" value={this.generateBirthDate()} required onChange={(event) => this.fieldHandler(event)} placeholder="yyyy-MM-dd" name="birthDate" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-sm-3">Vardas:</label>
                                        <div className="col-sm-9">          
                                            <input type="text" className="form-control" id={this.errorClass(this.state.formErrors.firstName)} value={this.capitalizeFirstLetter(this.state.firstName)} required onChange={(event) => this.fieldHandler(event)} placeholder="Paciento vardas" name="firstName" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-sm-3" >Pavardė:</label>
                                        <div className="col-sm-9">          
                                            <input type="text" className="form-control" id={this.errorClass(this.state.formErrors.lastName)} value={this.capitalizeFirstLetter(this.state.lastName)} required onChange={(event) => this.fieldHandler(event)} placeholder="Paciento pavardė" name="lastName" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-sm-3" >Slaptažodis:</label>
                                        <div className="col-sm-9">          
                                            <input type={this.state.passwordMasked ? "password" : "text"} readOnly className="form-control" value={this.generatePassword()} required onChange={(event) => this.fieldHandler(event)} onClick={this.handlePasswordMasking} placeholder="Slaptažodis" name="password"/>
                                        </div>
                                    </div>
                                    <div className="form-group">        
                                        <div className="col-sm-offset-3 col-sm-9">
                                            <button className="btn btn-default" type="submit" disabled={!this.state.formValid}>Registruoti</button>
                                        </div>
                                    </div>
                                </form>
                            </div>   
                        </div> 
                    </div> 
                </div>           
            </section>
        </div>     
        )
    }
}
