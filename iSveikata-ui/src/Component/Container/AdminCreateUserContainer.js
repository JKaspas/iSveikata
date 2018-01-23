import React, {Component} from 'react'
import axios from 'axios'

import UsersForm from './AdminComponent/UsersForm'
import { UserFormSpecInput } from './AdminComponent/UserFormSpecInput';
import { UserFormDrugStoreInput } from './AdminComponent/UserFormDrugStoreInput';


export default class AdminCreateUserContainer extends Component{
    constructor(){
        super();
        this.session =  JSON.parse(sessionStorage.getItem('session'))
        this.state = {
            firstName:'Vardas',
            lastName:'Pavarde',
            userName:'VarPav123',
            password:'1970',

            drugStore:'', 
            specialization:null,
            title:'',

            type:'admin',

            infoState:''
            
        }
    }

    componentWillMount = () =>{
        if(this.session.user.loggedIn !== true || this.session.user.userType !== 'admin'){
            this.props.router.push('/vartotojams');
            return '';
        }
        this.getAllSpecialization();

    }

    getAllSpecialization = () =>{
        axios.get('http://localhost:8080/api/specialization')
        .then((response)=>{
            this.setState({
                specialization:response.data.map(this.composerSpecialization)
            })
            console.log(response.status)
        })
        .catch((erorr) => {
            console.log(erorr)
        })
    }

    composerSpecialization = (spec, index) =>{
        return(
            <option key={index} value={spec.title}/>
        )
    }

    fieldHandler = (e) =>{
        this.setState({[e.target.name]: e.target.value})
    }

    userObjectByType = () =>{
        if(this.state.type === "druggist"){
            return{ firstName:this.state.firstName,
                    lastName:this.state.lastName,
                    userName:this.state.userName,
                    password:this.state.password,
                    drugStore:this.state.drugStore,
                    type:this.state.type}
        }else{
            return{ firstName:this.state.firstName,
                    lastName:this.state.lastName,
                    userName:this.state.userName,
                    password:this.state.password,
                    type:this.state.type,}
        }
    }
               
   
    submitHandler = (e) =>{
        
        e.preventDefault();
        console.log(this.userObjectByType())
        axios.post('http://localhost:8080/api/admin/new/user', {
            employee:this.userObjectByType(),
            specialization:{
                title:this.state.title
            }, 
        })
        .then((response)=>{
            console.log(response.status)
            this.setState({
                infoState:<div className="alert alert-success"><strong>{response.data}</strong></div>
            })
        })
        .catch((erorr) => {
            console.log(erorr)
            this.setState({
                infoState:<div className="alert alert-danger"><strong>{erorr.response.data}</strong></div>
            })
        })
        
    }

    specializationInput = () =>{
        if(this.state.type === 'doctor'){
        return (<UserFormSpecInput 
            fieldHandler={this.fieldHandler} 
            specialization={this.state.specialization} 
        />)
        }else{
            return null;
        }
    }
    drugStoreInput = () =>{
        if(this.state.type === 'druggist'){
        return (<UserFormDrugStoreInput 
            fieldHandler={this.fieldHandler} 
            drugStore={this.state.drugStore} 
        />)
        }else{
            return null;
        }
    }
  

    
    render(){
        return(
        <div className="container">
            <section>
                
                <div className="panel-group">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4>Naujo vartotoja registravimo forma</h4>
                        </div>
                        <div className="panel-body">
                        {this.state.infoState}
                            <UsersForm 
                            firstName={this.state.firstName}
                            lastName={this.state.lastName}
                            userName={this.state.userName}
                            password={this.state.password}
                            title={this.state.title}

                            specializationInput={this.specializationInput()}
                            drugStoreInput={this.drugStoreInput()}

                            fieldHandler={this.fieldHandler}
                            submitHandler={this.submitHandler}/>
                        </div> 
                    </div> 
                </div>           
            </section>
        </div>)
    }
}

