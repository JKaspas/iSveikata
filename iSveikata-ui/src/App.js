import React, { Component } from 'react';
import './App.css';
import CreatePatientForm from './components/create_patient_form';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CreatePatientForm />
      </div>
    );
  }
}

export default App;
