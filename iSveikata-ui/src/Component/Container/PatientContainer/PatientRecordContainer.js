import React, {Component} from 'react'
import axios from 'axios'

import RecordListingItem from '../DoctorComponent/RecordListingItem';
import RecordListView from '../DoctorComponent/RecordListView';



export default class PatientRecordContainer extends Component{
    constructor(props){
        super(props)
        this.session =  JSON.parse(sessionStorage.getItem('session'));
        this.state = {
            records:null,
            notFound:'',
            notFoundRecord:'',
            recordDetails:'',
            patient:'',
            opendRecordRow:'',
            viewContent:'',
            
        }
    }
    componentDidCatch = (erorr, info) =>{
        console.log(erorr)
        console.log(info)
    }
   
    componentWillMount = () =>{
        
        if(this.session === null || this.session.patient.loggedIn !== true){
            this.props.router.push('/pacientams');
            return '';
        }
      
     
        axios.get('http://localhost:8080/api/patient/'+this.session.patient.patientId+'/record')
        .then((response) => {
            if(response.data.length === 0){
                this.setState({
                    notFound:(<h3>Ligos įrašų nėra</h3>)
                })
            }else{
                this.setState({
                   records:response.data.map(this.composeRecord),
                })
            }
            console.log(response.data)
        })
        .catch((erorr) =>{
            console.log(erorr)
        })
    }

    showRecordDetails = (rowId) =>{
        this.loadSpecificRecord(rowId);
        this.closeOpenDetails();
        console.log(rowId)
    }

    composeRecord = (record,index) =>{
         
        var date = new Date(record.appointment.date)
       var newDate =
       date.getFullYear()
       + '-'+ (date.getMonth()<10 ? 0+''+(date.getMonth()+1): (date.getMonth()+1))
       + '-' + (date.getDate()<10? 0+''+date.getDate(): date.getDate());
        
        return(
            <RecordListingItem
                key={index}
                id={record.id}
                appDate={newDate}
                icd={record.icd.icdCode}
                doctorName={record.doctor.firstName + ' ' +record.doctor.lastName }
                // appDescription={record.appointment.description}
                // appDuration={record.appointment.duration}
                // compensable={record.compensable}
                // repetitive={record.repetitive}
                showDetails={this.showRecordDetails}
            />
        )
    }

    loadSpecificRecord = (recordId) =>{
        axios.get('http://localhost:8080/api/record/'+recordId)
            .then((response) => {
            this.setState({
                    infoDetails:this.composeSpecificRecord(response.data)
                })
            console.log(response.data)
        })
        .catch((erorr) =>{
            console.log(erorr)
        })
    }

    
    composeSpecificRecord = (record) => {
        var yesValue = 'Taip';
        var noValue = 'Ne';

        var compensable = record.compensable === true? yesValue:noValue;
        var repetitive = record.repetitive === true? yesValue:noValue;

        return (<div style={{padding:'30px' }}>
                <p> Ligos įrašo data: {record.appointment.data}</p>
                <p>Ligos kodas: {record.icd.icdCode}</p>
                <p>Ligos įraša padares gydytojas: {record.doctor.firstName + ' ' +record.doctor.lastName} </p>
                <p>Vizito trukme: {record.appointment.duration}</p>
                <p>Vizitas komensuojamas? {compensable}</p>
                <p>Vizitas pakartotinas? {repetitive}</p>
                <p>Aprasymas: {record.appointment.description}</p>
        </div>)
    }

    closeOpenDetails = () =>{
        let el = document.getElementById("recordDetails")
        if(el.style.display === 'block'){
            el.style.display = 'none'
        }else{
            el.style.display = 'block'
        }
    }

    render() {
        return (
            <div className="container">
            <section>
                <div className="panel-group">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4> Ligos istorijos irasai</h4>
                        </div>
                        <div className="panel-body">
                            <div className="col-sm-12">
                                <RecordListView
                                    record={this.state.records}
                                />
                                {this.state.notFound}
                           <div id="recordDetails" style={{  height: '60%',
                                                width: '60%',
                                                border: '2px solid black',
                                                zIndex: '2',
                                                position: 'fixed',
                                                top: '20%',
                                                left: '20%',
                                                background: 'white',
                                                display:'none'}}>
                                <button onClick={this.closeOpenDetails} className="btn btn-success pull-right" >Uždaryti</button> 
                                {this.state.infoDetails}
                                </div>
                            </div>
                        </div> 
                    </div> 
                </div>           
            </section>
        </div>)
    }
}

