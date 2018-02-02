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
            password:'',
            infoState:''
        }
    }
    
    
    submitHandler = (e) =>{
        e.preventDefault();
            axios.post('http://localhost:8080/api/patient/login', {
                patientId:this.state.patientId,
                password:this.state.password
            })
            .then((response) => {
                this.props.dispatch(patientLoggedIn(this.state.patientId))
                this.props.router.push('/patient/');
                console.log(this.props)
                console.log(response.status)
            })
            .catch((error) => {
                //console.log(error.response.data)
                this.setState({
                    infoState:(<div className="alert alert-danger"><strong>{error.response.data}</strong></div>)
                })
            })
        
    }
    

    fieldHandler = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    }

    
    
    render() {
        return (
            <LoginForm 
            infoState={this.state.infoState}
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