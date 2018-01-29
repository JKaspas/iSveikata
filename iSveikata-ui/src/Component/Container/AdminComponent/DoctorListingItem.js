import React from 'react'


const DoctorListingItem = (props) =>{
    return (
    <tr >
            <td>{props.firstName}</td>
            <td>{props.lastName}</td>
            <td>{props.userName}</td>
            <td>{props.specialization}</td>
            <td>{props.doctorBindLink}</td>

    </tr>)
}

export default DoctorListingItem;