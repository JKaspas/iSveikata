import React from 'react'
import {Link} from 'react-router'



const RecordListingItemDemo = (props) =>{

    return (
    <tr  onClick={() => props.showDetails(props.id)} >
            <td>{props.appDate}</td>
            <td>{props.doctorName}</td>
            <td>{props.icd}</td>
    </tr>)
}

export default RecordListingItemDemo;