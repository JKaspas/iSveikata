import React, {Component} from 'react'
import axios from 'axios'

import RecordListingItem from '../DoctorComponent/RecordListingItem'
import RecordListView from '../DoctorComponent/RecordListView'
import PrescriptionListingItem from '../DoctorComponent/PrescriptionListingItem';
import PrescriptionListView from '../DoctorComponent/PrescriptionListView';

export default class DoctorPatientViewContainer extends Component{
    constructor(props){
        super(props)
        this.state = {
            records:null,
            prescriptions:null,
            notFoundRecord:'',
            notFoundPrescription:'',
            viewContent:'',

            opendRecordRow:''
        }
    }

    componentWillMount = () =>{

        var session =  JSON.parse(sessionStorage.getItem('session'))
        if(session === null || session.user.loggedIn !== true || session.user.userType !== 'doctor'){
            this.props.router.push('/vartotojams');
            return '';
        } 

       this.loadRecords();
       this.loadPrescriptions();
    }

    loadRecords = () =>{
        axios.get('http://localhost:8080/api/patient/'+this.props.params.patientId+'/record')
        .then((response) => {
            if(response.data.length === 0){
                this.setState({
                    notFoundRecord:(<h3>Ligos istorija tuščia</h3>)
                })
            }
            this.setState({
                records:response.data.map(this.composeRecord),
                viewContent:<RecordListView records={response.data.map(this.composeRecord)} notFound={this.state.notFoundRecord}/>
            })
            console.log(response.status)
        })
        .catch((erorr) =>{
            console.log(erorr)
        })
    }
    showDetails = (rowIndex) =>{
        if(this.state.opendRecordRow !== rowIndex && this.state.opendRecordRow !== ''){
            let rowBefore = document.getElementsByClassName("record")[this.state.opendRecordRow]
            rowBefore.style.height = ''
            this.setState({
                opendRecordRow:rowIndex
            })
            let secondRow = document.getElementsByClassName("record")[rowIndex]
            secondRow.style.height = '250px'
        }else if(this.state.opendRecordRow === rowIndex){
            let rowBefore = document.getElementsByClassName("record")[this.state.opendRecordRow]
            rowBefore.style.height = ''
        }else{
            let row = document.getElementsByClassName("record")[rowIndex]
            row.style.height = '250px'
            this.setState({
                opendRecordRow:rowIndex
            })
        }
    
        

       
        console.log(rowIndex)
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
                index={index}
                appDate={newDate}
                icd={record.icd.icdCode}
                doctorName={record.doctor.firstName + ' ' +record.doctor.lastName }
                appDescription={record.appointment.description}
                appDuration={record.appointment.duration}
                compensable={record.compensable}
                repetitive={record.repetitive}
                showDetails={this.showDetails}
            />
        )
    }

    loadPrescriptions = () =>{
        axios.get('http://localhost:8080/api/patient/'+this.props.params.patientId+'/prescription')
        .then((response) => {
            if(response.data.length === 0){
                this.setState({
                    notFoundPrescription:(<h3>Išrašytu receptų nėra</h3>)
                })
            }
            this.setState({
                prescriptions:response.data.map(this.composePrescription)
            })
            console.log(response.status)
        })
        .catch((erorr) =>{
            console.log(erorr)
        })
    }
    
    
    composePrescription = (prescription, index) =>{
        return(
            <PrescriptionListingItem
                key={index}
                index={index}
                prescriptionDate={prescription.prescriptionDate}
                expirationDate={prescription.expirationDate}
                ingredientName={prescription.api.title}
                ingredientAmount={prescription.ingredientAmount}
                units={prescription.ingredientUnit}
                description={prescription.description}
                useAmount={prescription.useAmount}
            />
        )
    }


    

    showMedicalRecord = () =>{
        this.setState({
            viewContent:<RecordListView records={this.state.records} notFound={this.state.notFoundRecord}/>
        })
    }
    
    showPrescription = () =>{
        this.setState({
            viewContent:<PrescriptionListView prescription={this.state.prescriptions} notFound={this.state.notFoundPrescription}/>
        })
    }

    


    render() {
        return (
            <div className="container">
            <section>
                <div className="panel-group">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4>Paciento ligos istorija</h4>
                        </div>
                        <div className="panel-body">
                            <div className="col-sm-12">
                                 <ul className="nav nav-tabs">
                                    <li className="col-sm-6" ><a className="text-center" onClick={this.showMedicalRecord} data-toggle="pill" >Paciento ligos įrašai</a></li>
                                    <li className="col-sm-6" ><a className="text-center" onClick={this.showPrescription} data-toggle="pill" >Paciento receptai</a></li>
                                </ul>
                                {this.state.viewContent}
                                
                            </div>
                        </div> 
                    </div> 
                </div>           
            </section>
        </div>)
    }
}

