import React from 'react'

const PatientListingItem = (props) =>{
    return (
    <tr >
            <td>{props.patientId}</td>
            <td>{props.birthDate}</td>
            <td>{props.firstName}</td>
            <td>{props.lastName}</td>
            {props.doctorViewPatient}
            {props.recordLink}
            {props.prescriptionLink}
            {props.patientBindLink}
<<<<<<< HEAD
            {props.druggistPrescriptionView}
=======
>>>>>>> patient

    </tr>)
}

export default PatientListingItem;