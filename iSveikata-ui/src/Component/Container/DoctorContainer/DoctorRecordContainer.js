import React, {Component} from 'react';
import axios from 'axios';

import PatientInfoCard from '../DoctorComponent/PatientInfoCard';
import Timer from '../DoctorComponent/Timer';
import { FormErrors } from '../Form_errors';
import '../Form.css';
export default class DoctorRecordContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            patient: '',
            patientFullName: '',

            icd: '',
            description: '',
            duration: '',
            isCompensable: false,
            isRepetitive: false,
            formErrors: {icd: '', description: '', duration: ''},
            icdValid: false,
            descriptionValid: false,
            durationValid: false,                   
            formValid: false,

            date: '2018-01-17',

            patientId: props.params.patientId,
            userName: ''
        };
        this.fieldHandler = this.fieldHandler.bind(this);
    }

    componentWillMount = () =>{
        this.loadPatient();
        this.setState({
            userName: this.props.params.userName
        })
    }

    loadPatient = () =>{
        axios.get('http://localhost:8080/api/patient/' + this.props.params.patientId)
        .then((response)=>{
            this.setState({
                patient: response.data,
                patientFullName: response.data.firstName + ' ' + response.data.lastName
            })
            console.log(response.status)
        })
        .catch((erorr) => {
            console.log(erorr)
        })
    }
    
    submitHandler = (e) =>{
        e.preventDefault();
        axios.post('http://localhost:8080/api/doctor/new/record', {
            appointment: {
                duration: this.state.duration,
                description: this.state.description,
                date: this.state.date
            },
            medicalRecord: {
                compensable: this.state.isCompensable,
                repetitive: this.state.isRepetitive
            },
            patientId: this.state.patientId,
            userName: this.state.userName
        })
        .then((response)=>{
            console.log(response.status)
        })
        .catch((erorr) =>{
            console.log(erorr)
        })
    }

    fieldHandler(e) {
        // e === event
        const name = e.target.name;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    
        this.setState({[name]: value},
          () => { this.validateField(name, value) });
        
        console.log("Input field name: " + name);
        console.log("Input field value: " + value);
    }

    //Formos laukų validacija:
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let icdValid = this.state.icdValid;
        let descriptionValid = this.state.descriptionValid;
        let durationValid = this.state.durationValid;
      
        switch (fieldName) {
            case 'icd':
                if(value.match(/^[a-zA-Z]\d{2}(\.[a-zA-Z0-9]{1,4})?$/g)) {
                    icdValid = true;
                } else if(value.match(/^[1-7]{1}$/g)) {
                    icdValid = true;
                } else if(value.match(/^[lL]\d{3}$/g)) {
                    icdValid = true;
                } else if(value.match(/^[8-9]{1}\d{0,1}(\d-[mM]\d{2})?$/g)) {
                    icdValid = true;
                } else {
                    icdValid = false;
                }
                // ^ [RAIDĖ][SKAIČIUS][SKAIČIUS](.)(SKAIČIUS*)(SKAIČIUS*)(SKAIČIUS*)(RAIDĖ ARBA SKAIČIUS). 
                //*rečiau, raidė, arba X -> jei yra 7-ta pozicija, o kitų pozicijų nėra, šios iki septintosios užpildomos raide X.
                //Specialūs kodai Lietuvoje - [RAIDĖ L][SKAIČIUS][SKAIČIUS][SKAIČIUS]. [SKAIČIUS NUO 1 IKI 7]. [SKAIČIUS 8 ARBA 9](SKAIČIUS)(SKAIČIUS -M SKAIČIUS SKAIČIUS). 
                fieldValidationErrors.icd = icdValid ? '' : 'Įveskite taisyklingą TLK-10 kodą.';
                break;
            case 'description':
                descriptionValid = value.length >= 3;
                // ^ Tikrina ar įrašyta bent kažkas.
                fieldValidationErrors.description = descriptionValid ? '' : 'Aprašykite vizitą.';
                break;
            case 'duration':
                durationValid = value.match(/^\d{1,3}$/g);
                // ^ Tikrina ar įrašytas teigiamas skaičius.
                fieldValidationErrors.duration = durationValid ? '': 'Įveskite vizito trukmę.';
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
                        icdValid: icdValid,
                        descriptionValid: descriptionValid,
                        durationValid: durationValid,
                      }, this.validateForm);
    }

    //Paspausti "submit" leidžiama tik jei visi laukai įvesti teisingai.
    validateForm() {
        this.setState({formValid: this.state.icdValid && this.state.descriptionValid && this.state.durationValid});
    }
    
    //Jei įvesties lauko rėmelis žalias - informacija įvesta teisingai, jei raudonas - neteisingai.
    //Čia "is-valid" ir "is-invalid" yra formos elemento id. Spalvinimas aprašytas Form.css faile. 
    errorClass(error) {
        return(error.length === 0 ? 'is-valid' : 'is-invalid');
    }

    createMedicalRecordForm() {
        return (
            <div className="col-sm-12">
                <div className="col-sm-10 col-sm-offset-2"> 
                    <FormErrors formErrors={this.state.formErrors}/>
                </div>
                <form className="form-horizontal" onSubmit={this.submitHandler}>
                    <div className="form-group">
                        <label className="control-label col-sm-2" >TLK-10 ligos kodas:</label>
                        <div className="col-sm-10">          
                            <input type="text" className="form-control" id={this.errorClass(this.state.formErrors.icd)} name="icd"
                            placeholder="X##(.###) arba specialus kodas" maxLength="8" value={(this.state.icd).toUpperCase()} required
                            onChange={(event) => this.fieldHandler(event)} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2">Vizito aprašymas:</label>
                        <div className="col-sm-10"> 
                            <textarea className="form-control" id={this.errorClass(this.state.formErrors.description)} name="description"
                            rows="3" maxLength="500" required 
                            onChange={(event) => this.fieldHandler(event)}>{this.state.description}</textarea>
                        </div> 
                    </div>
                    <div className="form-group">
                        <div className="form-check col-sm-10 col-sm-offset-2">
                            <input type="checkbox" className="form-check-input" id="CheckIfCompensable" name="isCompensable" checked={this.state.isCompensable} 
                            onChange={(event) => this.fieldHandler(event)}/>
                            <label className="form-check-label" htmlFor="CheckIfCompensable">Vizitas <strong>{this.state.isCompensable ? " kompensuojamas " : " nekompensuojamas "}</strong> Valstybinės ligonių kasos.</label>
                        </div>
                        <div className="form-check col-sm-10 col-sm-offset-2">
                            <input type="checkbox" className="form-check-input" id="CheckIfRepetitive" name="isRepetitive" checked={this.state.isRepetitive} 
                            onChange={(event) => this.fieldHandler(event)}/>
                            <label className="form-check-label" htmlFor="CheckIfRepetitive">Vizitas <strong>{this.state.isRepetitive ? " yra " : " nėra "}</strong> pakartotinis dėl tos pačios priežasties.</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-2">Vizito trukmė (minutėmis):</label>
                        <div className="col-sm-10">
                            <input type="number" className="form-control" id={this.errorClass(this.state.formErrors.duration)} name="duration"
                            placeholder="Trukmė" maxLength="3" value={this.state.duration} required 
                            onChange={(event) => this.fieldHandler(event)}/>
                        </div>
                    </div>
                    <div className="form-group">        
                        <div className="col-sm-offset-2 col-sm-10">
                            <button type="submit" className="btn btn-default" disabled={!this.state.formValid}>Sukurti įrašą</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }

    //Timer - rodo kiek minučių forma yra atverta. Gali padėti daktarui nustatyti vizito trukmę, jei jis šią formą atvertų tik vizitui prasidėjus. 
    render() {
        return (
            <div className='container'>
                <section>
                <h2>Naujas ligos įrašas</h2>
                <PatientInfoCard 
                patientFullName={this.state.patientFullName}
                patientId={this.state.patient.patientId}
                userName={this.state.userName}
                recordForm={this.createMedicalRecordForm()}
                />
                <Timer/>
                </section>
            </div>
        )
    }
}
