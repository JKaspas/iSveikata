import React, {Component} from 'react';
import axios from 'axios';

import { ChangePasswordForm } from './ChangePasswordForm';

export default class UserPasswordContainer extends Component{
    constructor(props){
        super(props);
        this.session =  JSON.parse(sessionStorage.getItem('session'))

        this.state = {
            oldPassword:'',
            newPassword:'',
            newPasswordRepeat:'',

            infoState:'',

            formErrors: {oldPassword: '', newPassword: '', newPasswordRepeat: ''},
            fieldState: {oldPassword: 'is-empty', newPassword: 'is-empty', newPasswordRepeat: 'is-empty'},
            oldPasswordValid: false,
            newPasswordValid: false, 
            newPasswordRepeatValid: false,
            formValid: false,
        };
    }

     componentWillMount = () =>{
        if(this.session.user.loggedIn !== true){
            this.props.router.push('/vartotojams');
            return '';
        }
    } 

    submitHandler = (e) =>{

        e.preventDefault();
        if(this.state.newPassword === this.state.newPasswordRepeat){
            axios.put('http://localhost:8080/api/'+this.session.user.userName+'/password', {
                oldPassword:this.state.oldPassword,
                newPassword:this.state.newPassword
            })
            .then((response)=>{
                console.log(response.status)
                this.setState({
                    infoState:<div className="alert alert-success"><strong>{response.data}</strong></div>
                })
            })
            .catch((erorr) => {
                console.log(erorr)
                this.setState({
                    infoState:<div className="alert alert-danger"><strong>{erorr.response.data}</strong></div>
                })
            })
        }else{
            this.setState({
                infoState:<div className="alert alert-danger"><strong>Naujai pateikti slaptažodžiai nesutampa</strong></div>
            })
        }
    }

    fieldHandler = (e) => {
        // e === event
        const name = e.target.name;
        const value = e.target.value;

       // if(name === 'newPassword' && this.state.newPasswordRepeat.length !== 0 && this.state.newPasswordRepeat !== value) {
       //     this.setState({newPassword: value, newPasswordRepeat: ''});
       // } else {
            this.setState({[name]: value});
       // }
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
        let oldPasswordValid = this.state.oldPasswordValid;
        let newPasswordValid = this.state.newPasswordValid;
        let newPasswordRepeatValid = this.state.newPasswordRepeatValid;
      
        switch (fieldName) {
            case 'oldPassword':
                oldPasswordValid = (value.length >= 8) || (value === "123");
                // ^ Tikrina ar įrašyta ne mažiau kaip 8 ir ne daugiau kaip 15 simbolių. Išimtis: administratoriaus slaptažodis.
                fieldValidationErrors.oldPassword = oldPasswordValid ? '' : 'Įvestas slaptažodis per trumpas.';
                fieldValidationState.oldPassword = oldPasswordValid ? 'is-valid' : 'is-invalid';
                break;
            case 'newPassword':
                if(value.length >= 8) { 

                    if(value !== this.state.oldPassword) {
                        newPasswordValid = true;
                        fieldValidationErrors.newPassword = '';

                        newPasswordRepeatValid = value === this.state.newPasswordRepeat ? true : false; 
                        fieldValidationErrors.newPasswordRepeat = newPasswordRepeatValid ? '' : (this.state.newPasswordRepeat.length === 0 ? '' : 'Slaptažodžiai nesutampa!');
                        fieldValidationState.newPasswordRepeat = newPasswordRepeatValid ? 'is-valid' : (this.state.newPasswordRepeat.length === 0 ? '' : 'is-invalid');   
                    } else {
                        newPasswordValid = false;
                        fieldValidationErrors.newPassword = 'Naujas slaptažodis sutampa su senuoju.'; 
                    }

                } else {
                    newPasswordValid = false;
                    fieldValidationErrors.newPassword = 'Naujas slaptažodis per trumpas.';
                }

                fieldValidationState.newPassword = newPasswordValid ? 'is-valid' : 'is-invalid';
                //Jei įvesties lauko rėmelis žalias - informacija įvesta teisingai, jei raudonas - neteisingai.
                //Čia "is-valid" ir "is-invalid" yra formos elemento id. Spalvinimas aprašytas Form.css faile. 
                break;
            case 'newPasswordRepeat':
                newPasswordRepeatValid = value === this.state.newPassword;
                // ^ Tikrina ar įrašyta ne mažiau kaip 8 ir ne daugiau kaip 15 simbolių. Išimtis: administratoriaus slaptažodis.
                fieldValidationErrors.newPasswordRepeat = newPasswordRepeatValid ? '' : 'Slaptažodžiai nesutampa!';
                fieldValidationState.newPasswordRepeat = newPasswordRepeatValid ? 'is-valid' : 'is-invalid';
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
                    fieldState: fieldValidationState,
                    oldPasswordValid: oldPasswordValid,
                    newPasswordValid: newPasswordValid,
                    newPasswordRepeatValid: newPasswordRepeatValid,
                    }, this.validateForm);
    }

    //Paspausti "submit" leidžiama tik jei visi laukai įvesti teisingai.
    validateForm = () => {
        this.setState({formValid: this.state.oldPasswordValid && this.state.newPasswordValid && this.state.newPasswordRepeatValid});
    }

    render(){
        return( 
            <div className='container'>
                <section>
                    <h2>Slaptažodžio keitimas</h2>      
                    <ChangePasswordForm
                    errorClassOldPassword={this.state.fieldState.oldPassword}
                    errorClassNewPassword={this.state.fieldState.newPassword}
                    errorClassNewPasswordRepeat={this.state.fieldState.newPasswordRepeat}
                    infoState={this.state.infoState}
                    formErrors={this.state.formErrors}
                    formValid={this.state.formValid}

                    oldPassword={this.state.oldPassword}
                    newPassword={this.state.newPassword}
                    newPasswordRepeat={this.state.newPasswordRepeat}

                    fieldValidationHandler={this.fieldValidationHandler}
                    fieldHandler={this.fieldHandler}
                    submitHandler={this.submitHandler} />
                 </section>
            </div>
        )
    }
}


              