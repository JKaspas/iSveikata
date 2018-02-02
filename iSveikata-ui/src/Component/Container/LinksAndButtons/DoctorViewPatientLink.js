import React from 'react'
import {Link} from 'react-router'

export const DoctorViewPatientLink = (props) =>{
    return(<Link to={'/doctor/patient/'+props.patientId+'/view'} className='btn btn-primary'>Peržiūrėti</Link>)
}