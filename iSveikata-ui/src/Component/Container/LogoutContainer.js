import {Component} from 'react'
import axios from 'axios'

import {connect} from 'react-redux'
import { userLoggedOut, patientLoggedOut } from './_action/index';

class LogoutContainer extends Component{
    

    componentWillMount = () =>{
        let logoutInfo = JSON.parse(sessionStorage.getItem("401"))
        this.props.dispatch(userLoggedOut())
        this.props.dispatch(patientLoggedOut())
        sessionStorage.setItem('doctor', null)
        sessionStorage.setItem('patientInfo', null)
        this.logout()
        
        if(logoutInfo.userName === "" && logoutInfo.patientId === ""){
            this.props.router.push('/');
        }else if(logoutInfo.patientId === ""){
            this.props.router.push('/vartotojams');
        }else if(logoutInfo.userName === ""){
            this.props.router.push('/pacientams');
        }
        
    }
    
    logout = () =>{
        axios.post("http://localhost:8080/logout")
   }

    render(){
        return '';
    }
}


const mapStateToProps = (state) =>{
    return{
        user:state.user,
        patient:state.patient
        
    }
}
export default connect(mapStateToProps)(LogoutContainer)