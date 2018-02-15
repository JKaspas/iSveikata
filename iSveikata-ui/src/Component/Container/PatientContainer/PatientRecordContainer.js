import React, {Component} from 'react'
import axios from 'axios'
import Pagination from "react-js-pagination"

import RecordListingItem from '../DoctorComponent/RecordListingItem';
import RecordListView from '../DoctorComponent/RecordListView';

var backgroundStyle = {     height: '100%', width: '100%', zIndex: '3',
                            position: 'fixed', top: '0', left: '0', background: 'rgba(255,255,255,0.8)', display:'none'}
var recordDetailWindowStyle = {  height: '60%', width: '60%',  border: '2px solid black', zIndex: '4',
                                position: 'fixed', top: '20%', left: '20%', background: 'white', display:'block'}


export default class PatientRecordContainer extends Component{
    constructor(props){
        super(props)
        this.session =  JSON.parse(sessionStorage.getItem('session'));
        this.state = {
            records:null,
            notFoundRecord:(<h3>Ligos istorija tuščia</h3>),
            recordDetails:'',
            patient:'',
            opendRecordRow:'',
            viewContent:'',
            contentType:'record',

            listInfo:'',

            activePage:1,
            itemsPerPage:8,
            listLength:'',
            
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
        this.loadSpecificRecord(rowId);
        this.closeOpenDetails();
       // console.log(rowId)
    }

  //onClick on (medicalRecord or pracription) show or hide div with details
  closeOpenDetails = () =>{
    let el = document.getElementById("recordDetails")
    if(el.style.display === 'block'){
        el.style.display = 'none'
    }else{
        el.style.display = 'block'
    }
}
 //handle paggination page changes 
 handlePageChange = (activePage) => {
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
        <div className="col-sm-5 col-sm-offset-4">
        <Pagination
        activePage={this.state.activePage}
        itemsCountPerPage={this.state.itemsPerPage}
        totalItemsCount={this.state.listInfo.totalElements}
        pageRangeDisplayed={5}
        onChange={this.handlePageChange}
        />
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
                            <h4>Mano ligos istorijos įrašai</h4>
                        </div>
                        <div className="panel-body">
                            <div className="col-sm-12">
                                {this.state.viewContent}
                                {this.showPagination()}
                                <div id="recordDetails" style={backgroundStyle}>
                                    <div  style={recordDetailWindowStyle}>
                                        <button onClick={this.closeOpenDetails} className="btn btn-success pull-right" >X</button> 
                                        {this.state.infoDetails}
                                    </div>
                                </div>

                            </div>
                        </div> 
                    </div> 
                </div>           
            </section>
        </div>)
    }
}