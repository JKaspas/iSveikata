import React from 'react'



const RecordListingItem = (props) =>{
    return (
    <tr >
            <td>{props.id}</td>
            <td>{props.compensable}</td>
            <td>{props.repetitive}</td>
            <td>{props.lastName}</td>
            <td>{props.app}</td>

    </tr>)
}

export default RecordListingItem;