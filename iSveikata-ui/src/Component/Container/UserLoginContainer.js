import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

import LoginForm from '../LoginForm/LoginForm';
import { userLoggedIn } from './_action/index';

class UserLoginContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
            userName:'',
            password:'',

            infoState:'',

            formErrors: {userName: '', password: ''},
            fieldState: {userName: 'is-empty', password: 'is-empty'},
            userNameValid: false,
            passwordValid: false,    
            formValid: false,
        };
    }

    submitHandler = (e) => {

        e.preventDefault();

        if(this.state.formValid){
            axios.post('http://localhost:8080/api/user/login', {
                userName:this.state.userName,
                password:this.state.password
            })
            .then((response) => {
                this.props.dispatch(userLoggedIn(response.data, this.state.userName))
                console.log(response.data)            
                this.props.router.push('/'+response.data+'/'); 
            })
            .catch((error) => {
                //console.log(error.response.data)
                this.setState({
                    infoState:(<div className="alert alert-danger"><strong>{error.response.data}</strong></div>)
                })
            })
        }else{
            this.setState({
                infoState:<div className="alert alert-danger"><strong>Prašome taisyklingai užpildyti visus laukus.</strong></div>
            })
        }
    }

    fieldHandler = (e) => {
        // e === event
        const name = e.target.name;
        const value = e.target.value;
    
        this.setState({[name]: value});
    }

    fieldOnFocusHandler = (e) => {
        // e === event
        const name = e.target.name;
 
        let fieldValidationState = this.state.fieldState;
      
        switch (name) {
            case 'userName':
                fieldValidationState.userName = 'is-empty';
                break;
            case 'password':
                fieldValidationState.password = 'is-empty';
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
                case 'userName':
                    fieldValidationErrors.userName = '';
                    break;
                case 'password':
                    fieldValidationErrors.password = '';
                    break;
                default:
                    break;
            }
            this.setState({[nameValid]: false,
                formErrors: fieldValidationErrors
                }, this.validateForm);
        }    
    }

    validateField = (fieldName, value) => {
        let fieldValidationErrors = this.state.formErrors;
        let fieldValidationState = this.state.fieldState;
        let userNameValid = this.state.userNameValid;
        let passwordValid = this.state.passwordValid;
      
        switch (fieldName) {
            case 'userName':
                //userNameValid = (value.length === 9) || (value === "root");
                //fieldValidationErrors.userName = userNameValid ? '' : 'Patikrinkite ar gerai įvedėte vartotojo vardą.';
                // ARBA
                userNameValid = value.match(/^(([A-Z]{1})([a-z]{2})){2}(\d{3})$/g) || (value === "root");
                // ^ Tikrina ar įrašytas teisingo formato vartotojo vardas. Sistemoje jis sudaromas iš trijų pirmų vardo raidžių, trijų pirmų pavardės raidžių ir atsitiktinio triženklio skaičiaus.
                //Išimtis: administratoriaus vartotojo vardas.
                fieldValidationErrors.userName = userNameValid ? '' : 'Patikrinkite ar gerai įvedėte vartotojo vardą. Atkreipkite dėmesį į didžiąsias raides.';
                
                fieldValidationState.userName = userNameValid ? 'has-success' : 'has-error';
                //Jei įvesties lauko rėmelis žalias - informacija įvesta teisingai, jei raudonas - neteisingai.
                //Čia "has-success" / "has-error" yra viena iš formos elemento klasių. 
                break;
            case 'password':
                passwordValid = (value.length >= 8) || (value === "123");
                // ^ Tikrina ar įrašyta ne mažiau kaip 8 (ir formoje leidžiama įvesti ne daugiau kaip 15 simbolių). Išimtis: administratoriaus slaptažodis.
                fieldValidationErrors.password = passwordValid ? '' : 'Slaptažodis per trumpas.';
                fieldValidationState.password = passwordValid ? 'has-success' : 'has-error';
                break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
                    fieldState: fieldValidationState,
                    userNameValid: userNameValid,
                    passwordValid: passwordValid,
                    }, this.validateForm);
    }

    //Jei bent vienas laukas neįvestas teisingai, paspaudus "submit" pasirodo perspėjimas.
    validateForm = () => {
        this.setState({formValid: this.state.userNameValid && this.state.passwordValid});
    }

    render() {
        return (
            <LoginForm 
            classNameLoginValue={this.state.fieldState.userName}
            classNamePassword={this.state.fieldState.password}
            errorMessageLoginValue={this.state.formErrors.userName}
            errorMessagePassword={this.state.formErrors.password}
            infoState={this.state.infoState}

            loginValue={this.state.userName}
            password={this.state.password}

            fieldValidationHandler={this.fieldValidationHandler}
            fieldHandler={this.fieldHandler}
            fieldOnFocusHandler={this.fieldOnFocusHandler}
            submitHandler={this.submitHandler}

            loginPlaceholder={"Vartotojo vardas"}
            loginValueName={"userName"} />
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        user:state.user
    }
}
  
export default connect(mapStateToProps)(UserLoginContainer);
  
  