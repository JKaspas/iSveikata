import React from 'react'
import {Link} from 'react-router'

export const NewRecordLink = (props) =>{
    return(<Link to={'/doctor/patient/'+props.patientId+'/record'} className='btn btn-primary'>Naujas įrašas</Link>)
}

