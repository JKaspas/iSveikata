import React from 'react'
import {Link} from 'react-router'

export const NewPrescriptionLink = (props) =>{
    return(<Link to={'/doctor/patient/'+props.patientId+'/prescription'} className='btn btn-primary'>Naujas receptas</Link>)
}

