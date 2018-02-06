import React from 'react'

const PrescriptionListView = (props) =>{


    return (
    <div> 
        <table className="table table-hover">
            <thead>
                <tr>
                    <th>Išrašymo data</th>
                    <th>Galiojimo data</th>
                    <th>Vaisto aktyvioji medžiaga</th>
                    {/* <th>Aktyvios medžiagos kiekis</th>
                    <th>Aktyvios medžiagos matavimo vienetai</th> */}
                    {/* <th>Recepto aprašymas</th> */}
<<<<<<< HEAD
                    <th>Recepto panaudojimai</th>
=======
                    <th>Panaudojimai</th>
>>>>>>> patient
                </tr>
            </thead>
            <tbody>
       
                {props.prescription}
                
            </tbody>
        </table>
        {props.notFound}
</div>)
}

export default PrescriptionListView;