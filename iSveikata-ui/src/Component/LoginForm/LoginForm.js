<<<<<<< HEAD
import React, {Component} from 'react'


var LoginForm = () =>{
    return(
    <div class="container">
        <section>
            <form class="form-signin">
                <h2 class="form-signin-heading">Prašome prisijungti</h2>
                <label for="inputEmail" class="sr-only">User name</label>
                <input type="userName" id="inputEmail" class="form-control" placeholder="Vartotojo vardas" required autofocus/>
                <label for="inputPassword" class="sr-only">Password</label>
                <input type="password" id="inputPassword" class="form-control" placeholder="Slaptažodis" required/>
                <div class="checkbox">
                <label>
                </label>
                </div>
                <button class="btn btn-lg btn-primary btn-block" type="submit">Prisijungti</button>
            </form>
            <a class="btn btn-default" href="#admin">Admin</a>
            <a class="btn btn-default" href="#doctor">Doctor</a>
            <a class="btn btn-default" href="#druggist">Druggist</a>
=======
import React from 'react'


var LoginForm = (props) =>{
    return(
    <div className="container">
        <section>
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
>>>>>>> 2d602e76cbc91ea456d59088c4f7f46af6c4c95c
        </section>
    </div> 
    )
}

export default LoginForm