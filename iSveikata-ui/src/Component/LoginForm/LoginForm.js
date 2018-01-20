import React from 'react'


var LoginForm = (props) =>{
    return(
    <div className="container">
        <section>
            <form onSubmit={props.submitHandler} className="form-signin">
                <h2 className="form-signin-heading">Prašome prisijungti</h2>
                <input className="form-control" type="text" name={props.loginValueName} onChange={props.fieldHandler} placeholder={props.loginPlaceholder} required />
                <input className="form-control" type="password" name="password" onChange={props.fieldHandler} placeholder="Slaptažodis" required/>
                <div className="checkbox">
                <label>
                </label>
                </div>
                <button className="btn btn-lg btn-primary btn-block" type="submit">Prisijungti</button>
            </form>
            <div className="col-sm-6 col-sm-offset-3">
            <a className="btn btn-default" href="#admin">Admin</a>
            <a className="btn btn-default" href="#doctor">Doctor</a>
            <a className="btn btn-default" href="#druggist">Druggist</a>
            <a className="btn btn-default" href="#patient">Patient</a>
            </div>
        </section>
    </div> 
    )
}

export default LoginForm