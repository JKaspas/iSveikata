import React ,{Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'

import LoginForm from '../LoginForm/LoginForm'
import { patientLoggedIn } from './_action/index';

class PatientLoginContainer extends Component{
    constructor(){
        super()
        this.state = {
            patientId:'',
            password:''
        }
    }
    componentDidCatch = (erorr, info) =>{
        console.log(erorr)
        console.log(info)
    }
    
    submitHandler = (e) =>{
        e.preventDefault();
        try{
            axios.post('http://localhost:8080/api/patient/login', {
                patientId:this.state.patientId,
                password:this.state.password
            })
            .then((response) => {
                this.props.dispatch(patientLoggedIn(this.state.patientId))
                this.props.router.push('/patient/');
                console.log(response.status)
            })
            .catch((error) => {
                console.log(error.response.data)
                console.log(error)
            })
        }catch(er){
            console.log("Erorr?")
        }
    }
    

    fieldHandler = (e) =>{
        this.setState({[e.target.name]: e.target.value})
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


const mapStateToProps = (state) =>{
    return{
        patient:state.patient
    }
}

export default connect(mapStateToProps)(PatientLoginContainer)