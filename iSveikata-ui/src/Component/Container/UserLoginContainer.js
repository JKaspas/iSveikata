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
    

    submitHandler = (e) =>{
        e.preventDefault();
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
        let userNameValid = this.state.userNameValid;
        let passwordValid = this.state.passwordValid;
      
        switch (fieldName) {
            case 'userName':
                userNameValid = value.match(/^(([A-Z]{1})([a-z]{2})){2}(\d{3})$/g) || (value === "root");
                // ^ Tikrina ar įrašytas teisingo formato vartotojo vardas. Sistemoje jis sudaromas iš trijų pirmų vardo raidžių, trijų pirmų pavardės raidžių ir atsitiktinio triženklio skaičiaus.
                //Išimtis: administratoriaus vartotojo vardas.
                fieldValidationErrors.userName = userNameValid ? '' : 'Patikrinkite ar gerai įvedėte vartotojo vardą. Atkreipkite dėmesį į didžiąsias raides.';
                fieldValidationState.userName = userNameValid ? 'is-valid' : 'is-invalid';
                //Jei įvesties lauko rėmelis žalias - informacija įvesta teisingai, jei raudonas - neteisingai.
                //Čia "is-valid" ir "is-invalid" yra formos elemento id. Spalvinimas aprašytas Form.css faile. 
                break;
            case 'password':
                passwordValid = ((value.length >= 8) && (value.length <= 15)) || (value === "123");
                // ^ Tikrina ar įrašyta ne mažiau kaip 8 ir ne daugiau kaip 15 simbolių. Išimtis: administratoriaus slaptažodis.
                fieldValidationErrors.password = passwordValid ? '' : (value.length < 8 ? 'Slaptažodis per trumpas.' : 'Slaptažodis per ilgas.');
                fieldValidationState.password = passwordValid ? 'is-valid' : 'is-invalid';
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

    //Paspausti "submit" leidžiama tik jei visi laukai įvesti teisingai.
    validateForm = () => {
        this.setState({formValid: this.state.userNameValid && this.state.passwordValid});
    }


    render() {
        return (
            <LoginForm 
            errorClassLoginValue={this.state.fieldState.userName}
            errorClassPassword={this.state.fieldState.password}
            infoState={this.state.infoState}
            formErrors={this.state.formErrors}
            formValid={this.state.formValid}

            loginValue={this.state.userName}
            password={this.state.password}

            fieldValidationHandler={this.fieldValidationHandler}
            fieldHandler={this.fieldHandler}
            submitHandler={this.submitHandler}

            loginPlaceholder={"Vartotojo vardas"}
            loginValueName={"userName"}
            />
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        user:state.user
    }
}
  
export default connect(mapStateToProps)(UserLoginContainer);
  
  