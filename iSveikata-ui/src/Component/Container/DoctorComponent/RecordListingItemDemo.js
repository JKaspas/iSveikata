import React from 'react'



const RecordListingItemDemo = (props) =>{
    var yesValue = 'Taip';
    var noValue = 'Ne';

    var compensable = props.compensable === true? yesValue:noValue;
    var repetitive = props.repetitive === true? yesValue:noValue;

    return (
    <tr  className="record" onClick={() => props.showDetails(props.index)} >
            <td>{props.appDate}</td>
            <td>{props.doctorName}</td>
            <td>{props.icd}</td>
    </tr>)
}

export default RecordListingItemDemo;