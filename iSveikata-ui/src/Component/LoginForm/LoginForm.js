import React from 'react'


var LoginForm = (props) =>{
    return(
    <div className="container">
        <section>
            {props.infoState}
            <form onSubmit={props.submitHandler} className="form-signin">
                <h2 className="form-signin-heading">Prašome prisijungti</h2>
                <input className="form-control" type="text" name={props.loginValueName} 
                onChange={props.fieldHandler} placeholder={props.loginPlaceholder} required />
                <input className="form-control" type="password" name="password" 
                onChange={props.fieldHandler} placeholder="Slaptažodis" required
                autoComplete="off"/>
                <div className="checkbox">
                <label>
                </label>
                </div>
                <button className="btn btn-lg btn-primary btn-block" type="submit">Prisijungti</button>
            </form>
        </section>
    </div> 
    )
}

export default LoginForm