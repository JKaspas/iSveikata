import React from 'react'
import {Link} from 'react-router'

export const NewRecordLink = (props) =>{
    return(<Link to={'/doctor/'+props.userName+'/patient/'+props.patientId} className='btn btn-primary'>Naujas įrašas</Link>)
}

