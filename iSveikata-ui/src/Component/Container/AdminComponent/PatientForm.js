import React from 'react'

const PatientForm = (props) => {
    return (
    <div className="col-sm-10"> 
        <form onSubmit={props.submitHandler} className="form-horizontal" >
        
            <div className="form-group">
                <label className="control-label col-sm-3">Asmens kodas:</label>
                <div className="col-sm-9">
                    <input type="text" className={props.errorClass(props.formErrors.patientId)} value={props.patientId} required maxLength="11" onChange={props.fieldHandler} placeholder="Asmens kodas" name="patientId" />
                </div>
            </div>
            <div className="form-group">
                <label className="control-label col-sm-3">Gimino data:</label>
                <div className="col-sm-9">
                    <input type="text" readOnly className="form-control" value={props.generateBirthDate()} required onChange={props.fieldHandler} placeholder="yyyy-MM-dd" name="birthDate" />
                </div>
            </div>
            <div className="form-group">
                <label className="control-label col-sm-3">Vardas:</label>
                <div className="col-sm-9">          
                    <input type="text" className={props.errorClass(props.formErrors.firstName)} value={props.capitalizeFirstLetter(props.firstName)} required onChange={props.fieldHandler} placeholder="Paciento vardas" name="firstName" />
                </div>
            </div>
            <div className="form-group">
                <label className="control-label col-sm-3" >Pavardė:</label>
                <div className="col-sm-9">          
                    <input type="text" className={props.errorClass(props.formErrors.lastName)} value={props.capitalizeFirstLetter(props.lastName)} required onChange={props.fieldHandler} placeholder="Paciento pavardė" name="lastName" />
                </div>
            </div>
            <div className="form-group">
                <label className="control-label col-sm-3" >Slaptažodis:</label>
                <div className="col-sm-9">          
                    <input type={props.passwordMasked ? "password" : "text"} readOnly className="form-control" value={props.generatePassword()} required onChange={props.fieldHandler} onClick={props.handlePasswordMasking} placeholder="Slaptažodis" name="password"/>
                </div>
            </div>
            <div className="form-group">        
                <div className="col-sm-offset-3 col-sm-9">
                    <button className="btn btn-default" type="submit" disabled={!props.formValid}>Registruoti</button>
                </div>
            </div>

        </form>
    </div>)  
}

export default PatientForm;