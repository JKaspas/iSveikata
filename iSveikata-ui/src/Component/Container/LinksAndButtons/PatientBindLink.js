import React from 'react'

export const PatientBindLink = (props) =>{
    return (<p id={props.index} onClick={() => props.bindClick(props.patientId)} className='btn btn-primary'>Priskirti pacientą gydytojui</p>)
}