import React from 'react'

const checkDate = (expirationDate) => {
    
    var style;
    return(
    new Date() > new Date (expirationDate) ? style={backgroundColor:'#EEE', color:'#BBB'}: style={color:'black'}
    )
}


const PrescriptionListingItem = (props) =>{

    return (
    <tr style={checkDate(props.expirationDate)}  data-toggle="modal" data-target="#myModal" onClick={() => props.showDetails(props.id)}>
            <td >{props.prescriptionDate}</td>
            <td>{props.expirationDate}</td>
            <td>{props.ingredientName}</td>
            <td>{props.useAmount} kartų</td>
            {props.viewUsageLink}
            
    </tr>
    )
}

export default PrescriptionListingItem;

333