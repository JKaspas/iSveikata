import React from 'react'


const RecordListView = (props) =>{


    return (
    <div> 
        <table className="table table-hover">
            <thead>
                <tr>
                    <th>Iraso data</th>
                    <th>Daktaras</th>
                    <th>Lygos kodas</th>
                    <th>Vizito aprasymas</th>
                    <th>Vizito trukme</th>
                    <th>Vizitas kompensuojamas</th>
                    <th>Vizitas pakartotinas</th>
                </tr>
            </thead>
            <tbody>
                {props.records}
            </tbody>
        </table>
</div>)
}

export default RecordListView;