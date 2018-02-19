import React from 'react'


const RecordListingItem = (props) =>{
    return (
    <tr  data-toggle="modal" data-target="#myModal" onClick={() => props.showDetails(props.id)} >
            <td>{props.appDate}</td>
            <td>{props.icd}</td>
            <td>{props.doctorName}</td>
            
    </tr>)
}

export default RecordListingItem;