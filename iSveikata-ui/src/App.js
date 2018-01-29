import React, { Component } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import RouteComponent from './Component/Navigation/RouterComponent'

<<<<<<< HEAD

=======
import {connect} from 'react-redux'
>>>>>>> 2d602e76cbc91ea456d59088c4f7f46af6c4c95c





class App extends Component {
  componentWillMount = () =>{
    
  }

  render() {
    return (
      <div>
        <RouteComponent />
      </div>
    );
  }
}

function mapStateToProps(state){
  return{
    user:state.user
  }
}


export default connect(mapStateToProps)(App);
