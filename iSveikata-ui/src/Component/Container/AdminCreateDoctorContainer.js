import React, {Component} from 'react'
import axios from 'axios'

import { FormErrors } from './Form_errors';
import './Form.css';

export default class AdminCreateDoctorContainer extends Component{

    constructor (props) {
        super(props);
        this.state = {
            type: 'doctor',
            firstName: '',
            lastName: '',
            userName: '',
            password: Math.random().toString(36).substr(2,8), //slaptažodis generuojamas iš 8 atsitiktinių skaitmenų ir raidžių.
            specialization: 'ŠEIMOS GYDYTOJAS',
            formErrors: {firstName: '', lastName: '', specialization: ''},
            firstNameValid: false,
            lastNameValid: false,
            specializationValid: true,                  
            formValid: false,
            passwordMasked: true,
            isOtherSpecialization: false,
            generatedNumericString: Math.random().toString().substr(2,3),
        };
        this.handlePasswordMasking = this.handlePasswordMasking.bind(this);
        this.fieldHandler = this.fieldHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    fieldHandler (e) {
        const name = e.target.name;
        const value = e.target.value;
        
        if(name === "specialization" && value === "kita") {
            this.setState({isOtherSpecialization: true, specialization: ''},
            () => { this.validateField(name, value) });
        } else if(name === "specialization") {
            this.setState({isOtherSpecialization: false, specialization: value});
        } else if(name === "specializationOther") {
            this.setState({isOtherSpecialization: true, specialization: value},
            () => { this.validateField(name, value) });
        } else {
            this.setState({[name]: value},
            () => { this.validateField(name, value) });
        }

        console.log("Input field name: " + name);
        console.log("Input field value: " + value);
    }

    submitHandler = (e) =>{
        e.preventDefault();
        axios.post('http://localhost:8080/api/admin/new/user', {
            type: this.state.type, 
            firstName: this.state.firstName,   
            lastName: this.state.lastName,    
            userName: this.state.userName,    //this.generateUsername(),  (?)
            password: this.state.password,    
            specialization: this.state.specialization
        })
        .then((response)=>{
            console.log(response.status)
        })
        .catch((erorr) => {
            console.log(erorr)
        })
    }

    //Užtikrina, kad vardas ir pavardė būtų iš didžiosios raidės, jei įvesta mažosiomis.
    capitalizeFirstLetter(string) { 
        return string.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }
    
    //Slapyvardis sudaromas iš trijų pirmų vardo raidžių, trijų pirmų pavardės raidžių ir atsitiktinio triženklio skaičiaus. 
    generateUsername() {
        let generatedUserName = ''; 
        if(this.state.firstNameValid && this.state.lastNameValid) {
            generatedUserName = this.state.firstName.substring(0, 3) + this.state.lastName.substring(0, 3) + this.state.generatedNumericString;    
        }
        return generatedUserName;
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
        let specializationValid = this.state.specializationValid;
      
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
            case 'specialization':
                specializationValid = value !== "kita";
                // ^ Tikrina ar įrašytos tik raidės. Tarp žodžių leidžiamas vienas tarpas.
                fieldValidationErrors.specialization = specializationValid ? '': 'Įveskite specializaciją.';
                break;
            case 'specializationOther':
                specializationValid = value.match(/^[a-zA-ZĄČĘĖĮŠŲŪŽąčęėįšųūž]+( [a-zA-ZĄČĘĖĮŠŲŪŽąčęėįšųūž]+)*$/g);
                // ^ Tikrina ar įrašytos tik raidės. Tarp žodžių leidžiamas vienas tarpas.
                fieldValidationErrors.specialization = specializationValid ? '': 'Įveskite specializaciją.';
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
                        firstNameValid: firstNameValid,
                        lastNameValid: lastNameValid,
                        specializationValid: specializationValid
                      }, this.validateForm);
    }
    
    //Paspausti "submit" leidžiama tik jei visi laukai įvesti teisingai.
    validateForm() {
        this.setState({formValid: this.state.firstNameValid && this.state.lastNameValid && this.state.specializationValid});
    }
    
    //Jei įvesties lauko rėmelis žalias - informacija įvesta teisingai, jei raudonas - neteisingai.
    //Čia "is-valid" ir "is-invalid" yra formos elemento id. Spalvinimas aprašytas Form.css faile. 
    errorClass(error) {
        return(error.length === 0 ? 'is-valid' : 'is-invalid');
    }
    
    render(){
        return(
            <div className="col-sm-10">
                <h4>Naujo gydytojo registravimo forma:</h4>  
                <div className="col-sm-9 col-sm-offset-3"> 
                    <FormErrors formErrors={this.state.formErrors}/>
                </div>
                <form onSubmit={this.submitHandler} className="form-horizontal" >
                    <div className="form-group">
                        <label className="control-label col-sm-3">Vardas:</label>
                        <div className="col-sm-9">          
                            <input type="text" className="form-control" id={this.errorClass(this.state.formErrors.firstName)} name="firstName"
                            placeholder="Paciento vardas" value={this.capitalizeFirstLetter(this.state.firstName)} required
                            onChange={(event) => this.fieldHandler(event)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-3">Pavardė:</label>
                        <div className="col-sm-9">          
                            <input type="text" className="form-control" id={this.errorClass(this.state.formErrors.lastName)} name="lastName"
                            placeholder="Paciento pavardė" value={this.capitalizeFirstLetter(this.state.lastName)} required
                            onChange={(event) => this.fieldHandler(event)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-3">Slapyvardis:</label>
                        <div className="col-sm-9">          
                            <input type="text" readOnly className="form-control" name="userName"
                            placeholder="Slapyvardis" value={this.generateUsername()} required
                            onChange={(event) => this.fieldHandler(event)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-3">Slaptažodis:</label>
                        <div className="col-sm-9">          
                            <input type={this.state.passwordMasked ? "password" : "text"} readOnly className="form-control" name="password"
                            placeholder="Slaptažodis" value={this.state.password} required
                            onChange={(event) => this.fieldHandler(event)} onClick={this.handlePasswordMasking} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-3">Specializacija:</label>
                        <div className="col-sm-9">          
                            <select className="form-control" name="specialization" value={this.state.value} onChange={(event) => this.fieldHandler(event)}>
                                <option value="ŠEIMOS GYDYTOJAS" selected>ŠEIMOS GYDYTOJAS</option>
                                <option value="PSICHOTERAPEUTAS">PSICHOTERAPEUTAS</option>
                                <option value="TERAPEUTAS">TERAPEUTAS</option>
                                <option value="VAIKŲ LIGŲ GYDYTOJAS">VAIKŲ LIGŲ GYDYTOJAS</option>
                                <option value="kita">KITA</option>
                            </select>
                        </div>
                    </div>
                    { this.state.isOtherSpecialization ? <OtherSpecialization errorClass = {this.errorClass(this.state.formErrors.specialization)}
                                                                            specialization={this.state.specialization.toUpperCase()}
                                                                            fieldHandler={(event) => this.fieldHandler(event)}/> : null }
                    <div className="form-group">        
                        <div className="col-sm-offset-3 col-sm-9">
                            <button className="btn btn-default" type="submit" disabled={!this.state.formValid}>Registruoti</button>
                        </div>
                    </div>
                </form>
            </div>   
        )
    }
}

class OtherSpecialization extends Component {
   
    render() {
      return (
        <div className="form-group">
            <label className="control-label col-sm-3">Įrašykite:</label>
            <div className="col-sm-9">          
                <input type="text" className="form-control" id={this.props.errorClass} name="specializationOther"
                placeholder="Specializacija" value={this.props.specialization} required
                onChange={this.props.fieldHandler} />
            </div>
        </div>
      );
    }
  }

