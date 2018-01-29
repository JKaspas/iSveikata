import React, {Component} from 'react'
import axios from 'axios'


import RecordListingItem from '../DoctorComponent/RecordListingItem';
import RecordListView from '../DoctorComponent/RecordListView';



export default class PatientViewContainer extends Component{
    constructor(props){
        super(props)
        this.state = {
            records:null,
            notFound:''
        }
    }
    componentDidCatch = (erorr, info) =>{
        console.log(erorr)
        console.log(info)
    }
   
    componentWillMount = () =>{
        var session =  JSON.parse(sessionStorage.getItem('session'));
        if(session === null || session.patient.loggedIn !== true){
            this.props.router.push('/pacientams');
            return '';
        }
      
     
        axios.get('http://localhost:8080/api/patient/'+session.patient.patientId+'/record')
        .then((response) => {
            if(response.data.length === 0){
                this.setState({
                    notFound:(<h3>No record found</h3>)
                })
            }else{
                this.setState({
                    records:response.data.map(this.composeRecord)
                })
            }
            console.log(response.status)
        })
        .catch((erorr) =>{
            console.log(erorr)
        })
    }

    composeRecord = (record,index) =>{
        var date = new Date(record.appointment.date)
        var newDate = date.getFullYear() + '-'+ date.getMonth()+1 + '-' + date.getDate();
        

        return(
            <RecordListingItem
                key={index}
                id={record.id}
                appDate={newDate}
                icd={record.icd.icdCode}
                doctorName={record.doctor.firstName + ' ' +record.doctor.lastName }
                appDescription={record.appointment.description}
                appDuration={record.appointment.duration}
                compensable={record.compensable}
                repetitive={record.repetitive}

            />
        )
    }

    
    render() {
        return (
            <div className="container">
            <section>
                <div className="panel-group">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4>Ligos istorijos irasai</h4>
                        </div>
                        <div className="panel-body">
                            <div className="col-sm-12">
                                <RecordListView
                                    records={this.state.records}
                                />
                                {this.state.notFound}
                                
                            </div>
                        </div> 
                    </div> 
                </div>           
            </section>
        </div>)
    }
}

