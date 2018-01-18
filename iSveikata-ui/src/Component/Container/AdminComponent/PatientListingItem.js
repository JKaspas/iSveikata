import React from 'react'
import {Link} from 'react-router'


const PatientListingItem = (props) =>{
    return (
    <tr >
            <td>{props.patientId}</td>
            <td>{props.birthDate}</td>
            <td>{props.firstName}</td>
            <td>{props.lastName}</td>
            <td><Link to={'/doctor/patient/'+props.patientId+'/view'} style={props.patientLinkStatus} className='btn btn-primary'>{props.patientLinkValue}</Link></td>
            <td><Link to={'/doctor/'+props.userName+'/patient/'+props.patientId} style={props.recordLinkStatus} className='btn btn-primary'>{props.recordLinkValue}</Link></td>
            <td><p style={props.bindLinkStatus} onClick={() => props.bindClick(props.patientId)} className='btn btn-primary'>{props.bindLinkValue}</p></td>


    </tr>)
}

export default PatientListingItem;