import {Component} from 'react'
import axios from 'axios'

import {connect} from 'react-redux'
import { userLoggedOut, patientLoggedOut } from './_action/index';

class LogoutContainer extends Component{

    componentWillMount = () =>{
        this.props.dispatch(userLoggedOut())
        this.props.dispatch(patientLoggedOut())
        this.logout()
        this.props.router.push('/');
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