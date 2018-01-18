import React, { Component } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import RouteComponent from './Component/Navigation/RouterComponent'







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
