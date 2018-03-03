import React from 'react'
import {Link} from 'react-router'

export const DoctorBindLink = (props) =>{
    return (<Link id={props.index} to={'/admin/bind/'+props.userName} className='btn btn-primary'>Priskirti gydytojui pacientą</Link>)
}