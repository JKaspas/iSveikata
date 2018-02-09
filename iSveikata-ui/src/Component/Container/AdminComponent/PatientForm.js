import React from 'react'
import { FormErrors } from '../AdminComponent/Form_errors'
import '../../../Form.css'


const PatientForm = (props) => {
    return (
        <div className="container">
            <section>     
                <div className="panel-group">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4>Naujo paciento registravimo forma</h4>
                        </div>
                        <div className="panel-body">
                            <div className="col-sm-10">
                            {props.infoState}
                                <div className="col-sm-9 col-sm-offset-3"> 
                                <FormErrors formErrors={props.formErrors} />
                                </div>
                                <form onSubmit={props.submitHandler} className="form-horizontal" >
                                    <div className="form-group">
                                        <label className="control-label col-sm-3">Asmens kodas:</label>
                                        <div className="col-sm-9">
                                            <input type="text" className={'form-control ' + props.errorClassPatientId} name="patientId" 
                                            value={props.patientId} required maxLength="11" placeholder="Asmens kodas"
                                            onChange={props.fieldHandler}
                                            onBlur={props.fieldValidationHandler} />
                                        </div>
                                    </div>
                                    {/* id={this.errorClass(this.state.formErrors.patientId)}
                                    id={this.errorClass(this.state.formErrors.firstName)}
                                    id={this.errorClass(this.state.formErrors.lastName)} */}
                                    <div className="form-group">
                                        <label className="control-label col-sm-3">Gimimo data:</label>
                                        <div className="col-sm-9">
                                            <input type="text" readOnly className="form-control" name="birthDate"
                                            value={props.generateBirthDate} required placeholder="yyyy-MM-dd"
                                            onChange={props.fieldHandler} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-sm-3">Vardas:</label>
                                        <div className="col-sm-9">          
                                            <input type="text" className={'form-control ' + props.errorClassFirstName} name="firstName"
                                            value={props.firstName} required maxLength="225" placeholder="Paciento vardas"
                                            onChange={props.fieldHandler}
                                            onBlur={props.fieldValidationHandler} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-sm-3" >Pavardė:</label>
                                        <div className="col-sm-9">          
                                            <input type="text" className={'form-control ' + props.errorClassLastName} name="lastName"
                                            value={props.lastName} required maxLength="225" placeholder="Paciento pavardė"
                                            onChange={props.fieldHandler}
                                            onBlur={props.fieldValidationHandler} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label col-sm-3" >Slaptažodis:</label>
                                        <div className="col-sm-9">          
                                            <input type={props.passwordMasked ? "password" : "text"} readOnly className="form-control" name="password"
                                            value={props.generatePassword} required placeholder="Slaptažodis" autoComplete="off"
                                            onChange={props.fieldHandler}
                                            onClick={props.handlePasswordMasking} />
                                        </div>
                                    </div>
                                    <div className="form-group">        
                                        <div className="col-sm-offset-3 col-sm-9">
                                            <button className="btn btn-default" type="submit" disabled={!props.formValid}>Registruoti</button>
                                        </div>
                                    </div>
                                </form>
                            </div>   
                        </div> 
                    </div> 
                </div>           
            </section>
        </div>     )  
  }

export default PatientForm;

