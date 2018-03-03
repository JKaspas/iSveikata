import React from 'react'
import {Link} from 'react-router'

export const NewRecordLink = (props) =>{
    return(<Link id={"newRecord" + props.index} to={'/doctor/patient/'+props.patientId+'/record'} className='btn btn-default'>Naujas ligos įrašas</Link>)
}

