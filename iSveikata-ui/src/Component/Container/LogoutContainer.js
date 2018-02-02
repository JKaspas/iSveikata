import {Component} from 'react'

import {connect} from 'react-redux'
import { userLoggedOut, patientLoggedOut } from './_action/index';

class LogoutContainer extends Component{

    componentWillMount = () =>{
        this.props.dispatch(userLoggedOut())
        this.props.dispatch(patientLoggedOut())
        this.props.router.push('/');
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