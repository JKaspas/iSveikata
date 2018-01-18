import React, {Component} from 'react'
import axios from 'axios'

import PatientInfoCard from '../DoctorComponent/PatientInfoCard'
import RecordForm from '../DoctorComponent/RecordForm'

export default class DoctorRecordContainer extends Component{
    constructor(props){
        super(props)
        this.state = {
            patient:'',
            patientFullName:'',

            icd:'TLK-10-',
            isCompensable:false,
            isRepetitive:false,
            duration:'',
            description:'',
            date:'2018-01-17',

            patientId:props.params.patientId,
            userName:''

        }
    }

    componentWillMount = () =>{
        this.loadPatient();
        this.setState({
            userName:this.props.params.userName
        })
    }
    loadPatient = () =>{
        axios.get('http://localhost:8080/api/patient/'+ this.props.params.patientId)
        .then((response)=>{
            this.setState({
                patient:response.data,
                patientFullName:response.data.firstName + ' ' + response.data.lastName
            })
            console.log(response.status)
        })
        .catch((erorr) => {
            console.log(erorr)
        })
    }
    
    submitHandler = (e) =>{
        e.preventDefault();
        axios.post('http://localhost:8080/api/doctor/new/record', {
            appointment:{
                duration:this.state.duration,
                description:this.state.description,
                date:this.state.date
            },
            medicalRecord:{
                compensable:this.state.isCompensable,
                repetitive:this.state.isRepetitive
            },
            patientId:this.state.patientId,
            userName:this.state.userName
        })
        .then((response)=>{
            console.log(response.status)
        })
        .catch((erorr) => {
            console.log(erorr)
        })
    }


    fieldHandler = (e) =>{
        if(e.target.name ==='isCompensable'){
            this.setState({
                isCompensable:!this.state.isCompensable
            })
        }else if(e.target.name ==='isRepetitive'){
            this.setState({
                isRepetitive:!this.state.isRepetitive
            })
        }else{
            this.setState({[e.target.name]: e.target.value})
        }
   }

    



    render() {
        return (
            <div className='container'>
                <section>
                <h2>Naujas receptas</h2>
                <PatientInfoCard 
                patientFullName={this.state.patientFullName}
                patientId={this.state.patient.patientId}
                userName={this.state.userName}
                recordForm={
                <RecordForm 
                    icd={this.state.icd}
                    submitHandler={this.submitHandler}
                    fieldHandler={this.fieldHandler}
                />}
                />
                </section>
            </div>
        )
    }
}
