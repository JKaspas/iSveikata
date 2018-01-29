import React, {Component} from 'react'
import axios from 'axios'

import { ChangePasswordForm } from './ChangePasswordForm';

export default class PatientPasswordContainer extends Component{
    constructor(props){
        super(props)
        this.session =  JSON.parse(sessionStorage.getItem('session'))

        this.state = {
            oldPassword:'',
            newPassword:'',
            newPasswordRepeat:'',
            infoState:''
        }
    }
    componentWillMount = () =>{
        if(this.session.patient.loggedIn !== true){
            this.props.router.push('/pacientams');
            return '';
        }

    }
      

    fieldHandler = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = (e) =>{

        e.preventDefault();
        if(this.state.newPassword === this.state.newPasswordRepeat){
            axios.put('http://localhost:8080/api/patient/'+this.session.patient.patientId+'/password', {
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



    render(){
        return(
            <div>
                
                <ChangePasswordForm infoState={this.state.infoState} fieldHandler={this.fieldHandler} submitHandler={this.submitHandler} />
            </div>
        )
    }
}