import React ,{Component} from 'react'
import axios from 'axios'
import {Router, Route, IndexRoute, hashHistory} from 'react-router';


import LoginForm from '../LoginForm/LoginForm'

export default class PatientLoginContainer extends Component{
    constructor(){
        super()
        this.state = {
            patientId:'',
            password:''
        }
    }
    submitHandler = (e) =>{
        e.preventDefault();
        axios.post('http://localhost:8080/api/patient/login', {
            patientId:this.state.patientId,
            password:this.state.password
        })
        .then((response) => {
            this.props.router.push('/patient/');
            console.log(response.status)
        })
        .catch((error) => {
            console.log(error.response.data)
            console.log(error)
        })
    }
    

    fieldHandler = (e) =>{
        this.setState({[e.target.name]: e.target.value})
        console.log("Input field name: " + e.target.name)
        console.log("Input field value: " + e.target.value)
    }

    
    
    render() {
        return (
            <LoginForm 
            fieldHandler={this.fieldHandler}
            submitHandler={this.submitHandler}

            loginPlaceholder={"Asmens kodas"}
            loginValueName={"patientId"}
            />
        )
    }
}

