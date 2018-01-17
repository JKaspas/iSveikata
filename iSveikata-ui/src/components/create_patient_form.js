import React, { Component } from 'react';
import { FormErrors } from './form_errors';
import './form.css';



class CreatePatientForm extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      patientName: '',
      patientSurname: '',
      patientPCode: '',
      patientBdate: '',
      formErrors: {patientName: '', patientSurname: '', patientPCode: ''},
      patientNameValid: false,
      patientSurnameValid: false,
      patientPCodeValid: false,
      patientBdateValid: false,                   
      formValid: false
    }
  }

  handleUserInput (e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
      () => { this.validateField(name, value) });
  }

  generatePassword() {
    let generatedPassword = ''; 
    if(this.state.formValid) {
      let generatedNumber = (Math.floor(Math.random() * (99 - 10 +1)) + 10).toString();
      generatedPassword = this.state.patientName.substring(0, 3) + this.state.patientSurname.substring(0, 3) + generatedNumber;    
    }
    return generatedPassword;
  }

  inputBirthDate() {
      let personalCodeAsString = this.state.patientPCode.toString();

      let birthYearLastdigits = parseInt(personalCodeAsString.substring(1, 3));
      let birthMonth = parseInt(personalCodeAsString.substring(3, 5)); 
      let birthDay = parseInt(personalCodeAsString.substring(5, 7));

      let currentDate = new Date();
      let currentYear = currentDate.getFullYear();
      let currentMonth = currentDate.getMonth()+1;
      let currentDay = currentDate.getDate();

      if(personalCodeAsString.charAt(0) == 3 || personalCodeAsString.charAt(0) == 4) {
        this.state.patientBdate = "19" + birthYearLastdigits + "-" + personalCodeAsString.substring(3, 5) + "-" + personalCodeAsString.substring(5, 7);
        this.state.patientBdateValid = true;
      } else if(personalCodeAsString.charAt(0) == 5 || personalCodeAsString.charAt(0) == 6 && currentYear >= (2000 + birthYearLastdigits)) {

        if(currentYear == (2000 + birthYearLastdigits) && currentMonth < birthMonth){
          this.state.patientBdate='Patikrinkite ar teisingai įvedėte pirmus 7 asmens kodo skaitmenis!';
          this.state.patientBdateValid = false;
        } else if(currentYear == (2000 + birthYearLastdigits) && currentMonth == birthMonth && currentDay < birthDay) {
          this.state.patientBdate='Patikrinkite ar teisingai įvedėte pirmus 7 asmens kodo skaitmenis!';
          this.state.patientBdateValid = false;
        } else {
          this.state.patientBdate = "20" + birthYearLastdigits + "-" + personalCodeAsString.substring(3, 5) + "-" + personalCodeAsString.substring(5, 7);
          this.state.patientBdateValid = true;
        }

      } else {
        this.state.patientBdate=''; 
        this.state.patientBdateValid=false;
      }   
  
    return this.state.patientBdate;
  }

  capitalizeFirstLetter(string) { 
      return string.charAt(0).toUpperCase() + string.slice(1);
  }

  handleSubmit() {
    // Do whatever you like with the data.
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let patientNameValid = this.state.patientNameValid;
    let patientSurnameValid = this.state.patientSurnameValid;
    let patientPCodeValid = this.state.patientPCodeValid;
  
    switch (fieldName) {
      case 'patientName':
        patientNameValid = value.match(/^[a-zA-ZĄČĘĖĮŠŲŪŽąčęėįšųūž]+( [a-zA-ZĄČĘĖĮŠŲŪŽąčęėįšųūž]+)*$/g);
        // ^ Tikrina ar įrašytos tik raidės. Tarp žodžių leidžiamas vienas tarpas.
        //Vėliau su XRegExp galima būtų padaryti kad atpažintų ir kitų kalbų raides;
        fieldValidationErrors.patientName = patientNameValid ? '' : 'Įveskite vardą.';
        break;
      case 'patientSurname':
        patientSurnameValid = value.match(/^[a-zA-ZĄČĘĖĮŠŲŪŽąčęėįšųūž]+( [a-zA-ZĄČĘĖĮŠŲŪŽąčęėįšųūž]+)*$/g);
        // ^ Tikrina ar įrašytos tik raidės. Tarp žodžių leidžiamas vienas tarpas.
        fieldValidationErrors.patientSurname = patientSurnameValid ? '' : 'Įveskite pavardę.';
        break;
      case 'patientPCode':
        patientPCodeValid = value.match(/^([3-6]{1})([0-9]{2})(([0]{1})([0-9]{1})|([1]{1})([0-2]{1}))(([0-2]{1})([0-9]{1})|([3]{1})([0-1]{1}))([0-9]{4})$/g);
        // ^ Tikrina ar įrašyta 11 skaitmenų. Pirmas skaičius gali būti tik 3, 4, 5 arba 6. Ketvirtas ir penktas - 00-12.  Šeštas ir septintas - 00-31.
        //Pastaba: asmens kodai, suteikiami vyresnio amžiaus žmonėms neprisimenantiems savo gimimo mėnesio ar dienos. Tokiuose koduose vietoje mėnesio ar dienos skaitmenų įrašomi 0. Tai labai reta išimtis.
        //patientNameValid = value.match(/^[0-9]{11}$/g);
        // ^ Tikrina ar įrašyta 11 skaitmenų.
        fieldValidationErrors.patientPCode = patientPCodeValid ? '': 'Įveskite taisyklingą asmens kodą.';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    patientNameValid: patientNameValid,
                    patientSurnameValid: patientSurnameValid,
                    patientPCodeValid: patientPCodeValid,
                  }, this.validateForm);
  }
  
  validateForm() {
    this.setState({formValid: this.state.patientNameValid && this.state.patientSurnameValid && this.state.patientPCodeValid && this.state.patientBdateValid});
  }


  errorClass(error) {
    return(error.length === 0 ? 'form-control is-valid' : 'form-control is-invalid');
 }
 

 render () {
   return (
     <form className="demoForm" onSubmit={this.handleSubmit}>
       <h2>Naujo paciento registravimo forma</h2>
       <div className="panel panel-default">
        <FormErrors formErrors={this.state.formErrors} />
       </div>
       <div className="form-group">
        <label htmlFor="InputName">Vardas*</label>
        <input type="text" className={this.errorClass(this.state.formErrors.patientName)} 
        id="InputName" name="patientName" placeholder="Paciento vardas" value={this.capitalizeFirstLetter(this.state.patientName)} required 
        onChange={(event) => this.handleUserInput(event)}/>
       </div>
       <div className="form-group">
        <label htmlFor="InputSurname">Pavardė*</label>
        <input type="text" className={this.errorClass(this.state.formErrors.patientSurname)} 
        id="InputSurname" name="patientSurname" placeholder="Paciento pavardė" value={this.capitalizeFirstLetter(this.state.patientSurname)} required 
         onChange={(event) => this.handleUserInput(event)}/>
       </div>
       <div className="form-group">
        <label htmlFor="InputPersonalCode">Asmens kodas*</label>
        <input type="text" className={this.errorClass(this.state.formErrors.patientPCode)} 
        id="InputPersonalCode" name="patientPCode" placeholder="Paciento AK" value={this.state.patientPCode} required maxlength="11"
         onChange={(event) => this.handleUserInput(event)}/>
       </div>
       <div className="form-group">
        <label htmlFor="BirthDate">Gimimo data</label>
        <input type="text" readonly className="form-control" id="BirthDate" name="patientBdate" value={this.inputBirthDate()} required/>
       </div>
       <div className="form-group">
        <label htmlFor="GeneratedTempPassword">Laikinas slaptažodis</label>
        <input type="text" readonly className="form-control" id="GeneratedTempPassword" name="patientTempPassw" value={this.generatePassword()} required/>
       </div>
       <button type="submit" className="btn btn-primary" disabled={!this.state.formValid}>
          Registruoti
       </button>
     </form>
   )
 }
}
export default CreatePatientForm;


