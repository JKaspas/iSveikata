import React, {Component} from 'react'
import axios from 'axios'
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import PropTypes from 'prop-types';


import LoginForm from '../LoginForm/LoginForm'

export default class UserLoginContainer extends Component{
    constructor(){
        super()
        this.state = {
            userName:'',
            password:''
        }
    }
    submitHandler = (e) =>{
        e.preventDefault();
        axios.post('http://localhost:8080/api/user/login', {
            userName:this.state.userName,
            password:this.state.password
        })
        .then((response) => {
            this.props.router.push('/'+response.data+'/');
            console.log(response.data)
        })
        .catch((error) => {
            console.log(error.response.data)
            //console.log(response)
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

            loginPlaceholder={"Vartotojo vardas"}
            loginValueName={"userName"}
            />
        )
    }
}


  