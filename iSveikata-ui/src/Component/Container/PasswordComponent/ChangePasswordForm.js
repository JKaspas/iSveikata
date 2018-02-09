import React from 'react';
import { FormErrors } from '../AdminComponent/Form_errors';
import '../../../Form.css';


export const ChangePasswordForm = (props) =>{
    return(
    <div className="col-sm-12">
        {props.infoState}
        <div className="col-sm-9 col-sm-offset-3">   
            <FormErrors formErrors={props.formErrors} />
        </div>
        <form className="form-horizontal" onSubmit={props.submitHandler}>
            <div className="form-group">
                <label className="control-label col-sm-3">Dabartinis slaptažodis:</label>
                <div className="col-sm-9">
                    <input type="password" className={'form-control ' + (props.oldPassword.length === 0 ? 'is-empty' : props.errorClassOldPassword)} name="oldPassword" 
                    value={props.oldPassword} required maxLength="15" autoComplete="off"
                    onChange={props.fieldHandler}
                    onBlur={props.fieldValidationHandler} />
                </div>
            </div>
            <div className="form-group">
                <label className="control-label col-sm-3">Naujas slaptažodis:</label>
                <div className="col-sm-9">
                    <input type="password" className={'form-control ' + (props.newPassword.length === 0 ? 'is-empty' : props.errorClassNewPassword)} name="newPassword" 
                    value={props.newPassword} required maxLength="15" autoComplete="off"
                    onChange={props.fieldHandler}
                    onBlur={props.fieldValidationHandler} />
                </div>
            </div>
            <div className="form-group">
                <label className="control-label col-sm-3">Pakartokite naują slaptažodį:</label>
                <div className="col-sm-9">
                    <input type="password" className={'form-control ' + (props.newPasswordRepeat.length === 0 ? 'is-empty' : props.errorClassNewPasswordRepeat)} name="newPasswordRepeat" 
                    value={props.newPasswordRepeat} required maxLength="15" autoComplete="off"
                    onChange={props.fieldHandler}
                    onBlur={props.fieldValidationHandler} />
                </div>
            </div>
            <div className="form-group">        
                <div className="col-sm-offset-3 col-sm-9">
                    <button className="btn btn-primary" type="submit" disabled={!props.formValid}>Pakeisti</button>
                </div>
            </div>
        </form>
    </div> 
    )
}



              
                   
                      
                                
                          
                       