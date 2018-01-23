import React from 'react'


var PatientInfoCard = (props) =>{
    return (
        <div className="panel-group">
            <div className="panel panel-default">
            <div className="panel-heading">
            <p>Patient: {props.patientFullName}</p>
            <p>Asmens kodas: {props.patientId}</p>
            </div>
                <div className="panel-body">
                
                    <div>
                        {props.recordForm}
                    </div>
                </div>
            </div>
        </div>
   
    )
}

export default PatientInfoCard;