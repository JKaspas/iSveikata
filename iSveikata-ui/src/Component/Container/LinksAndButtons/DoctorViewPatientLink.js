import React from 'react'
import {Link} from 'react-router'

export const DoctorViewPatientLink = (props) =>{
    return(<Link id={"viewPatien" + props.index} onClick={props.clickHandler} to={'/gydytojas/pacientas/perziura'} className='btn btn-default'>Peržiūrėti</Link>)
}                           