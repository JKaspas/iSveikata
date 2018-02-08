import React from 'react';
import { FormErrors } from './Form_errors';
import '../../../Form.css';


const UsersForm = (props) => {
    return (       
    <div className="col-sm-10"> 
        <div className="col-sm-9 col-sm-offset-3"> 
            <FormErrors formErrors={props.formErrors}/>
        </div>
        <form onSubmit={props.submitHandler} className="form-horizontal" >
            <div className="form-group">
                <div className="radio col-sm-9 col-sm-offset-3">
                    <label><input onChange={props.fieldHandler} type="radio" value="doctor" name="type"/>Gydytojas</label>
                </div>
                <div className="radio col-sm-9 col-sm-offset-3">
                    <label><input onChange={props.fieldHandler} type="radio" value="admin" name="type"/>Administratorius</label>
                </div>
                <div className="radio col-sm-9 col-sm-offset-3">
                    <label><input onChange={props.fieldHandler} type="radio" value="druggist" name="type"/>Vaistininkas</label>
                </div>
            </div>
            <div className="form-group">
                <label className="control-label col-sm-3">Vardas:</label>
                <div className="col-sm-9">          
                    <input type="text" className="form-control"  name="firstName"
                    placeholder="Paciento vardas" value={props.firstName} required
                    onChange={props.fieldHandler} 
                    id={props.formErrorsFirstName} maxLength="225"/>
                </div>
            </div>
            <div className="form-group">
                <label className="control-label col-sm-3">Pavardė:</label>
                <div className="col-sm-9">          
                    <input type="text" className="form-control"  name="lastName"
                    placeholder="Paciento pavardė" value={props.lastName} required
                    onChange={props.fieldHandler} 
                    id={props.formErrorsLastName} maxLength="225" />
                </div>
            </div>
            <div className="form-group">
                <label className="control-label col-sm-3">Vartotojo vardas:</label>
                <div className="col-sm-9">          
                    <input type="text" readOnly className="form-control" name="userName"
                    placeholder="Vartotojo vardas" value={props.userName} required
                    onChange={props.fieldHandler} maxLength="225"/>
                </div>
            </div>
            <div className="form-group">
                <label className="control-label col-sm-3">Slaptažodis:</label>
                <div className="col-sm-9">          
                    <input type={props.passwordMasked ? "password" : "text"} readOnly className="form-control" name="password"
                    placeholder="Slaptažodis" value={props.password} required
                    onChange={props.fieldHandler} onClick={props.handlePasswordMasking} 
                    autoComplete='off' />
                </div>
            </div>
            {props.specializationInput}
            {props.drugStoreInput}
            <div className="form-group">        
                <div className="col-sm-offset-3 col-sm-9">
                    <button className="btn btn-default" type="submit" disabled={!props.formValid}>Registruoti</button>
                </div>
            </div>
        </form>
    </div>)  
  }

export default UsersForm;






