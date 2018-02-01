import React from 'react'

const PatientListingItem = (props) =>{
    return (
    <tr >
            <td>{props.patientId}</td>
            <td>{props.birthDate}</td>
            <td>{props.firstName}</td>
            <td>{props.lastName}</td>
            <td>{props.doctorViewPatient}</td>
            <td>{props.recordLink}</td>
            <td>{props.patientBindLink}</td>
            <td>{props.prescriptionLink}</td>


    </tr>)
}

export default PatientListingItem;