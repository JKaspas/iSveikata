import React, {Component} from 'react'
import axios from 'axios'

import {connect} from 'react-redux'

import LoginForm from '../LoginForm/LoginForm'
import { userLoggedIn } from './_action/index';

class UserLoginContainer extends Component{
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
            this.props.dispatch(userLoggedIn(response.data, this.state.userName))
            console.log(response.data)            
            this.props.router.push('/'+response.data+'/');

        })
        .catch((error) => {
            console.log(error.response.data)
            //console.log(response)
        })
    }


    fieldHandler = (e) =>{
        this.setState({[e.target.name]: e.target.value})
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

const mapStateToProps = (state) =>{
    return{
        user:state.user
    }
}
  
export default connect(mapStateToProps)(UserLoginContainer);
  
  