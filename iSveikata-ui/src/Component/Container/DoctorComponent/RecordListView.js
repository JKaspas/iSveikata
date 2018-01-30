import React from 'react'


const RecordListView = (props) =>{


    return (
    <div> 
        <table className="table table-hover">
            <thead>
                <tr>
                    <th>Įrašo data</th>
                    <th>Daktaras</th>
                    <th>Ligos kodas</th>
                    <th>Vizito aprašymas</th>
                    <th>Vizito trukmė</th>
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