import React from 'react'
import {Link} from 'react-router'

export const DruggistPrescriptionLink = (props) =>{
    return(<Link to={'/vaistininkas/pacientas/'+props.patientId+'/receptai'} className='btn btn-primary'>Peržiūrįti receptus</Link>)
}

