import React, {Component} from 'react'
import axios from 'axios'

import UsersForm from './AdminComponent/UsersForm'


export default class AdminCreateUserContainer extends Component{
    constructor(){
        super();
        this.state = {
            firstName:'',
            lastName:'',
            userName:'',
            password:'',

            drugStore:'', 
            specialization:'',
            type:'doctor'
        }
    }

    fieldHandler = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    }
    submitHandler = (e) =>{
        e.preventDefault();
        axios.post('http://localhost:8080/api/admin/new/user', {
            firstName:this.state.firstName,
            lastName:this.state.lastName,
            userName:this.state.userName,
            password:this.state.password,

            drugStore:this.state.drugStore, 
            //specialization:this.state.specialization,
            type:this.state.type
        })
        .then((response)=>{
            console.log(response.status)
        })
        .catch((erorr) => {
            console.log(erorr)
        })
        
    }
  

    
    render(){
        return(
        <div className="container">
            <section>
                
                <div className="panel-group">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4>Kurkite systemos vartotoja</h4>
                        </div>
                        <div className="panel-body">
                            <UsersForm 
                            fieldHandler={this.fieldHandler}
                            submitHandler={this.submitHandler}/>
                        </div> 
                    </div> 
                </div>           
            </section>
        </div>)
    }
}

