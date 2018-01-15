import React, {Component} from 'react'



export default class AdminCreateUserComponent extends Component{
    constructor(){
        super();
        this.state = {
            name:'',
            surname:'',
            username:'',
            password:'',

            DrugStore:'', 
            specialization:'',
            type:''
        }
    }

    fieldHandler = (e) =>{
        this.setState({[e.target.name]: e.target.value})
        console.log("Input field name: " + e.target.name)
        console.log("Input field value: " + e.target.value)
    }
    submitHandler = (e) =>{
        e.preventDefault();
        axios.post('http://localhost:8080/api/admin/', {
            name:this.state.name,
            surname:this.state.surname,
            username:this.state.username,
            password:this.state.password,

            DrugStore:this.state.DrugStore, 
            specialization:this.state.specialization,
            type:this.state.type
        })
        .then((response)=>{
            console.log(response.status)
            this.setState({
                name:'',
                surname:'',
                username:'',
                password:'',
    
                DrugStore:'', 
                specialization:'',
                type:''
            })
        })
        .catch((erorr) => {
            console.log(erorr)
        })
    }
    

    
    render(){
        return(<section>AdminCreateUserComponent</section>)
    }
}

