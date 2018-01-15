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
        </section>
    </div> 
    )
}

export default LoginForm