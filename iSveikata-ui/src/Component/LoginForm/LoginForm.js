import React from 'react';
import { FormErrors } from '../Container/AdminComponent/Form_errors';
import '../../Form.css';


var LoginForm = (props) =>{
    return(
    <div className="container">
        <section>
            {props.infoState}
            <form onSubmit={props.submitHandler} className="form-signin">
                <h2 className="form-signin-heading">Prašome prisijungti</h2>
                <div> 
                    <FormErrors formErrors={props.formErrors}/>
                </div>
                <input className={'form-control ' + (props.loginValue.length === 0 ? 'is-empty' : props.errorClassLoginValue)} type="text" name={props.loginValueName} 
                placeholder={props.loginPlaceholder} value={props.loginValue} required
                onChange={props.fieldHandler}
                onBlur={props.fieldValidationHandler} />
                <br />
                <input className={'form-control ' + (props.password.length === 0 ? 'is-empty' : props.errorClassPassword)} type="password" name="password" 
                placeholder="Slaptažodis" value={props.password} required autoComplete="off"
                onChange={props.fieldHandler}
                onBlur={props.fieldValidationHandler} />

                <div className="checkbox">
                <label>
                </label>
                </div>
                <button className="btn btn-lg btn-primary btn-block" type="submit" disabled={!props.formValid}>Prisijungti</button>
            </form>
        </section>
    </div> 
    )
}

export default LoginForm