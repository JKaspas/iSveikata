import React from 'react'
import {Link} from 'react-router'

export const NewPrescriptionLink = (props) =>{
    return(<Link id={"newPrescription" + props.index} to={'/doctor/patient/'+props.patientId+'/prescription'} className='btn btn-default'>Naujas receptas</Link>)
}

