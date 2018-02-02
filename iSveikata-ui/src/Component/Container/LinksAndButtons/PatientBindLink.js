import React from 'react'

export const PatientBindLink = (props) =>{
    return (<p  onClick={() => props.bindClick(props.patientId)} className='btn btn-primary'>Priskirti pacientą gydytojui</p>)
}