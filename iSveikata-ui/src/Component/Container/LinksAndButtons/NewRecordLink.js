import React from 'react'
import {Link} from 'react-router'

export const NewRecordLink = (props) =>{
    return(<Link id={"newRecord" + props.index} onClick={props.clickHandler} to={'/doctor/patient/record'} className='btn btn-default'>Naujas ligos įrašas</Link>)
}

