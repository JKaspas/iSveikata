import React from 'react'


const RecordListingItem = (props) =>{
    return (
    <tr  onClick={() => props.showDetails(props.id)}>
            <td>{props.appDate}</td>
            <td>{props.icd}</td>
            <td>{props.doctorName}</td>
            {/* <td>{props.appDescription.substring(0, 30)}...</td>
            <td>{props.appDuration} min</td>
            <td>{compensable}</td>
            <td>{repetitive}</td> */}
    </tr>)
}

export default RecordListingItem;