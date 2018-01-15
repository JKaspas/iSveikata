import React, { Component } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';

import PublicViewContainer from './Components/PublicViewContainer';



var InitialApp = (props) =>{
  return (
  <div>
    <NavigationComponent />
    {props.children}
  </div>)
}
var NoMatch = () =>{
  return (<div>URL no match</div>)
}

var RouteComponent = () =>{
  return (
    <Router history={hashHistory}  >
        <Route path="/" component={InitialApp} >
          <IndexRoute component={PublicViewContainer} />
          <Route path="/" component={PublicViewContainer} />
          <Route path="/pacientams" component={NoMatch} />
          <Route path="/vartotojams" component={NoMatch} />

          {/* <Route path="/accounts" component={AccountViewContainer} />
          <Route path="/client/:client_id" component={ClientCard} />
          <Route path="/account/:account_id" component={AccountCard} />
          <Route path="/account/:account_id/transaction" component={TransactionContainer} /> */}
          <Route path="*" component={NoMatch}/>
        </Route>
    </Router>)
}

var NavigationComponent = (props) =>{
    return (
      <nav class="navbar  navbar-inverse navbar-fixed-top" id="mainNav">
      <div class="container">
        <a class="navbar-brand" href="#">iSveikata</a>
        <ul class="nav navbar-nav navbar-right">
        	<li><a class="" href="#pacientams">Prisijungimas pacientams</a></li>
	        <li><a class="" href="#vartotojams">Prisijungimas sistemos vartotojams</a></li>
      </ul>
      </div>
    </nav>
    )
}


class App extends Component {
  render() {
    return (
      <div>
        <RouteComponent />
      </div>
    );
  }
}

export default App;
