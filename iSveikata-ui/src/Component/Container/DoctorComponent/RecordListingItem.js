import React from 'react'
import {Link} from 'react-router'


const RecordListingItem = (props) =>{
    var yesValue = 'Taip';
    var noValue = 'Ne';

    var compensable = props.compensable === true? yesValue:noValue;
    var repetitive = props.repetitive === true? yesValue:noValue;

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