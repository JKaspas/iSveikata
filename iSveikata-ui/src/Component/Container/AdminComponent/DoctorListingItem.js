import React from 'react'
import {Link} from 'react-router'


const DoctorListingItem = (props) =>{
    return (
    <tr >
            <td>{props.firstName}</td>
            <td>{props.lastName}</td>
            <td>{props.userName}</td>
            <td>{props.specialization}</td>
            <td><Link to={'/admin/bind/'+props.userName} className='btn btn-primary'>View</Link></td>

    </tr>)
}

export default DoctorListingItem;