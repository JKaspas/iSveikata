import React from 'react'



const PrescriptionListingItem = (props) =>{

    return (
<<<<<<< HEAD
=======
        
        
        
>>>>>>> patient
    <tr onClick={() => props.showDetails(props.id)}>
            <td>{props.prescriptionDate}</td>
            <td>{props.expirationDate}</td>
            <td>{props.ingredientName}</td>
<<<<<<< HEAD
            <td>{props.useAmount} kartų</td>
            {props.viewUsageLink}
            {props.markPrescription}
=======
            {/* <td>{props.ingredientAmount}</td>
            <td>{props.units}</td>
            <td>{props.description}</td> */}
            <td>{props.useAmount} kartų</td>
            <td>{props.viewUsageLink}</td>
            
>>>>>>> patient
    </tr>
    )
}

export default PrescriptionListingItem;