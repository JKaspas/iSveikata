import React from 'react'



const RecordListingItem = (props) =>{
    var yesValue = 'Taip';
    var noValue = 'Ne';

    var compensable = props.compensable === true? yesValue:noValue;
    var repetitive = props.repetitive === true? yesValue:noValue;

    return (
    <tr >
            <td>{props.appDate}</td>
            <td>{props.doctorName}</td>
            <td>{props.icd}</td>
            <td>{props.appDescription}...</td>
            <td>{props.appDuration} min</td>
            <td>{compensable}</td>
            <td>{repetitive}</td>
    </tr>)
}

export default RecordListingItem;