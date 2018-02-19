import React from 'react';
import '../../Form.css';



var LoginForm = (props) =>{
    return(
        <div className="container">
            <section>
                <div className="col-sm-4 col-sm-offset-4 signin-form">
                    {props.loginValueName === "userName" ? <i className="fas fa-medkit fa-5x"></i> : <i className="fas fa-user-circle fa-5x"></i>}
                    <h2>Prašome prisijungti</h2>
                    <form className="form-horizontal" onSubmit={props.submitHandler}>
                        <div className="form-group">        
                            {props.infoState}
                        </div>
                        <div className={'form-group form-group-lg has-feedback ' + (props.loginValue.length === 0 ? 'is-empty' : props.classNameLoginValue)}>
                            <input type="text" className="form-control" name={props.loginValueName} 
                            value={props.loginValue} placeholder={props.loginPlaceholder} maxLength="11" autoComplete="off"
                            onChange={props.fieldHandler}
                            onFocus={props.fieldOnFocusHandler}
                            onBlur={props.fieldValidationHandler} />
                            <span className=""></span>
                            <span className="help-block">{props.errorMessageLoginValue}</span>  
                        </div>
                        <div className={'form-group form-group-lg has-feedback ' + (props.password.length === 0 ? 'is-empty' : props.classNamePassword)}>
                            <input type="password" className="form-control" name="password"
                            value={props.password} placeholder="Slaptažodis" maxLength="15" autoComplete="off"
                            onChange={props.fieldHandler}
                            onFocus={props.fieldOnFocusHandler}
                            onBlur={props.fieldValidationHandler} />
                            <span className=""></span>
                            <span className="help-block">{props.errorMessagePassword}</span>  
                        </div>
                        <div className="form-group">        
                            <button className="btn btn-primary btn-lg btn-block" type="submit">Prisijungti</button>
                        </div>
                    </form>
                </div>
            </section>
        </div> 
    )
}

export default LoginForm;
