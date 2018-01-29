import React from 'react'


export const ChangePasswordForm = (props) =>{
    return(
    <div className="container">
        <section>
            {props.infoState}
            <form onSubmit={props.submitHandler} className="form-signin">
                <h2 className="form-signin-heading">Slaptažodžio keitimas</h2>
                <input className="form-control" type="password" 
                name="oldPassword" onChange={props.fieldHandler} 
                placeholder="Senas slaptažodis" required 
                autoComplete="off"/>
                <input className="form-control" type="password" 
                name="newPassword" onChange={props.fieldHandler} 
                placeholder="Naujas slaptažodis" required
                autoComplete="off"/>
                <input className="form-control" type="password" 
                name="newPasswordRepeat" onChange={props.fieldHandler} 
                placeholder="Naujas slaptažodis" required
                autoComplete="off" />
                <div className="checkbox">
                </div>
                <button className="btn btn-lg btn-primary btn-block" type="submit">Pakeisti</button>
            </form>
        </section>
    </div> 
    )
}

