import React, {Component} from 'react'
import axios from 'axios'
import Pagination from "react-js-pagination"

import RecordListingItem from '../DoctorComponent/RecordListingItem';
import RecordListView from '../DoctorComponent/RecordListView';
import { DetailsModalView } from '../DoctorComponent/DetailsModalView';

// var backgroundStyle = {     height: '100%', width: '100%', zIndex: '3',
//                             position: 'fixed', top: '0', left: '0', background: 'rgba(255,255,255,0.8)', display:'none'}
// var recordDetailWindowStyle = {  height: '60%', width: '60%',  border: '2px solid black', zIndex: '4',
//                                 position: 'fixed', top: '20%', left: '20%', background: 'white', display:'block'}


export default class PatientRecordContainer extends Component{
    constructor(props){
        super(props)
        this.session =  JSON.parse(sessionStorage.getItem('session'));
        this.patientInfo = JSON.parse(sessionStorage.getItem('patientInfo'))
        this.state = {
            records:null,
            notFoundRecord:(<h3>Ligos istorija tuščia</h3>),
            recordDetails:'',
            patient:'',
            opendRecordRow:'',
            viewContent:'',
            contentType:'record',
            patientName:'',

            listInfo:'',

            activePage:0,
            itemsPerPage:8,
            listLength:'',
            
            infoDetails:'',
            infoHeader:'',
            
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
            this.loadRecords(this.state.activePage);
    }


    //load all patient medical record and compose to view component
    loadRecords = (activePage) =>{
        axios.get('http://localhost:8080/api/patient/'
        +this.session.patient.patientId+'/record?page='
        +activePage+'&size='+this.state.itemsPerPage)
        .then((response) => {
            if(response.data.content.length === 0){
                if(activePage !== 0){
                    this.setState({
                        activePage:activePage - 1
                    })
                    if(this.state.searchValue > 2){
                        this.setState({
                            patientList:(<h3>Pacientų nėrasta</h3>)
                        })
                    }
                    return ''
                }
                this.setState({
                    viewContent:this.state.notFoundRecord
                })
            }else{
                this.setState({
                    viewContent:<RecordListView records={response.data.content.map(this.composeRecords)} />,
                    listInfo:response.data,
                    listLength:response.data.content.length,
                })
                console.log(response.status)
            }
           
        })
        .catch((erorr) =>{
            console.log(erorr)
        })
    }



    composeRecords = (record,index) =>{
         
    //     var date = new Date(record.appointment.date)
    //    var newDate =
    //    date.getFullYear()
    //    + '-'+ (date.getMonth()<10 ? 0+''+(date.getMonth()+1): (date.getMonth()+1))
    //    + '-' + (date.getDate()<10? 0+''+date.getDate(): date.getDate()); 
        return(
            <RecordListingItem
                key={index}
                id={record.id}
                appDate={record.appointmentDate}
                icd={record.icdCode}
                doctorName={record.doctorFullName }
                showDetails={this.showRecordDetails}
            />
        )
    }


    loadSpecificRecord = (recordId) =>{
        axios.get('http://localhost:8080/api/record/'+recordId)
            .then((response) => {
            this.setState({
                    infoDetails:this.composeSpecificRecord(response.data),
                    infoHeader: this.composeSpecificRecordHeader(response.data)
                })
            console.log(response.data)
        })
        .catch((erorr) =>{
            console.log(erorr)
        })
    }

    composeSpecificRecordHeader = (record) => {  
        return  (<div>
                    <p>"Ligos įrašo detali informacija"</p>
                </div>)
                
    }

    composeSpecificRecord = (record) => {
        var yesValue = 'Taip';
        var noValue = 'Ne';

        var compensable = record.compensable === true? yesValue:noValue;
        var repetitive = record.repetitive === true? yesValue:noValue;

        return (<div >
                <p>Ligos įrašo data: {record.appointmentDate}</p>
                <p>Ligos kodas: {record.icdCode}</p>
                <p>Ligos įrašą padaręs gydytojas: {record.doctorFullName} </p>
                <p>Vizito trukmė: {record.appoitmentDuration}</p>
                <p>Vizitas kompensuojamas? {compensable}</p>
                <p>Vizitas pakartotinis? {repetitive}</p>
                <p>Aprašymas: {record.appointmentDescription}</p>
        </div>)
    }

     //on medical record row click show record details
     showRecordDetails = (rowId) =>{
        if(document.getElementById('myModal').style.display === '' || document.getElementById('myModal').style.display === 'none'){
            document.getElementById('modalButton').click()
        }
        this.loadSpecificRecord(rowId);
        this.setState({
            
        })
    }


    //handle paggination page changes 
    handlePageChange = (activePage) => {
        if(activePage < 1 || this.state.listLength < this.state.itemsPerPage ){
            if(this.state.activePage > activePage && activePage > -1){
               
            }else{
                return ''
            }
        }
    
        //by content type (record/prescription) send request for specific page
        this.loadRecords(activePage);
        
        //change activePage state to new page number
        this.setState({
            activePage:activePage
        })
    }


    //Show paggination div with props from state
    showPagination = () =>{
        return (
            <div className="text-center">
                <div>
                    <button className="btn btn-default" id="previousPage" onClick={() => this.handlePageChange(this.state.activePage - 1)}>⟨</button>
                    <button className="btn btn-default" id="nextPage" onClick={() => this.handlePageChange(this.state.activePage + 1)}>⟩</button>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="container">
            <section>
                <div className="panel-group">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                        {/* <h4>Klientas: {this.patientInfo.fullName}</h4>
                        <p>Asmens kodas: {this.patientInfo.id}</p> */}
                            <h3> Ligos istorijos įrašai</h3>
                        </div>
                        <div className="panel-body">
                            <div className="col-sm-12">
                                {this.state.viewContent}
                                {this.showPagination()}
                                <p id="modalButton" data-toggle="modal" data-backdrop="false" data-target="#myModal" className="hidden" ></p>
                                <DetailsModalView
                                    infoHeader={this.state.infoHeader}
                                    infoDetails={this.state.infoDetails}
                                />
                           </div>
                        </div> 
                    </div> 
                </div>           
            </section>
        </div>)
    }
}