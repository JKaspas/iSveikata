import React from 'react'



const RecordListingItemDemo = (props) =>{

    return (
    <tr  data-toggle="modal" data-target="#myModal" onClick={() => props.showDetails(props.id)} >
            <td>{props.appDate}</td>
            <td>{props.doctorName}</td>
            <td>{props.icd}</td>
    </tr>)
}

export default RecordListingItemDemo;