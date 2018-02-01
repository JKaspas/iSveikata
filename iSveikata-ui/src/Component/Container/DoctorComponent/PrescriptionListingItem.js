import React from 'react'
import {Link} from 'react-router'



const PrescriptionListingItem = (props) =>{
    return (
    <tr >
            <td>{props.prescriptionDate}</td>
            <td>{props.expirationDate}</td>
            <td>{props.ingredientName}</td>
            <td>{props.ingredientAmount}</td>
            <td>{props.units}</td>
            <td>{props.description}</td>
            <td>{props.useAmount}</td>
            <td><Link to={'/gydytojas/pacientas/receptas/'+props.id+'/panaudojimai'} className='btn btn-primary'>Recepto panaudojimai</Link></td>
    </tr>
    )
}

export default PrescriptionListingItem;