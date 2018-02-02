import React from 'react'


const PrescriptionUsageListView = (props) =>{


    return (
    <div> 
        <table  className="table table-hover">
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
            <tbody id="recorTableBody">
                {props.records}
            </tbody>
        </table>
        {props.notFound}
</div>)
}

export default PrescriptionUsageListView;