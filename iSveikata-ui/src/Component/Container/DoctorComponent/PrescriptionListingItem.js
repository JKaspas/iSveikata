import React from 'react'



const PrescriptionListingItem = (props) =>{

    return (
    <tr onClick={() => props.showDetails(props.id)}>
            <td>{props.prescriptionDate}</td>
            <td>{props.expirationDate}</td>
            <td>{props.ingredientName}</td>
            <td>{props.useAmount} kartų</td>
            {props.viewUsageLink}
            {props.markPrescription}
    </tr>
    )
}

export default PrescriptionListingItem;