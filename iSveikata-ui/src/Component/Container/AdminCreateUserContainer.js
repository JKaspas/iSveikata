import React, {Component} from 'react'
import axios from 'axios'

import AdminCreateAdminContainer from './AdminCreateAdminContainer'
import AdminCreateDoctorContainer from './AdminCreateDoctorContainer'
import AdminCreateDruggistContainer from './AdminCreateDruggistContainer'



export default class AdminCreateUserContainer extends Component{

    constructor(props) {
        super(props);
        this.state = {value: 'administrator'};
    
        this.handleChange = this.handleChange.bind(this);
        
    }
    
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    
    render() {
        return(
        <div className="container">
            <section>     
                <div className="panel-group">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4>Naujo sistemos vartotojo registravimas</h4>
                            <p>Pasirinkite vartotojų grupę:</p>
                            <select className="form-control" value={this.state.value} onChange={this.handleChange}>
                                <option value="administrator" selected>administratorius</option>
                                <option value="doctor">daktaras</option>
                                <option value="druggist">vaistininkas</option>
                            </select>
                        </div>
                        <div className="panel-body">    
                        { this.state.value === "administrator" ? <AdminCreateAdminContainer/> : null } 
                        { this.state.value === "doctor" ? <AdminCreateDoctorContainer/> : null }
                        { this.state.value === "druggist" ? <AdminCreateDruggistContainer/> : null }         
                        </div> 
                    </div> 
                </div>           
            </section>
        </div>     
        )
    }
}

