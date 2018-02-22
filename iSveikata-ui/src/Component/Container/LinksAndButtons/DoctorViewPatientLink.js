import React from 'react'
import {Link} from 'react-router'

export const DoctorViewPatientLink = (props) =>{
    return(<Link onClick={() => props.clickHandler(props.patientId, props.fullName, props.birthDate)} to={'/gydytojas/pacientas/perziura'} className='btn btn-primary'>Peržiūrėti</Link>)
}                           