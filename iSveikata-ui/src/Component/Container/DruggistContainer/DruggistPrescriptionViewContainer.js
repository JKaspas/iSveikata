import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import Pagination from "react-js-pagination"

//import SearchFieldForm from '../DoctorComponent/SearchFieldForm'
import PrescriptionListView from '../DoctorComponent/PrescriptionListView';
import PrescriptionListingItem from '../DoctorComponent/PrescriptionListingItem';
import { DetailsModalView } from '../DoctorComponent/DetailsModalView';

// var backgroundStyle = {     height: '100%', width: '100%', zIndex: '3',
//                             position: 'fixed', top: '0', left: '0', background: 'rgba(255,255,255,0.8)', display:'none'}
// var recordDetailWindowStyle = {  height: '60%', width: '60%',  border: '2px solid black', zIndex: '4',
//                                 position: 'fixed', top: '20%', left: '20%', background: 'white', display:'block'}



class DruggistViewContainer extends Component{
    constructor(props){
        super(props)
        this.session = JSON.parse(sessionStorage.getItem('session'))
        this.patientInfo = JSON.parse(sessionStorage.getItem('patientInfo'))
        this.state = {
            prescriptions:null,
            infoState:'',
            info:(<h3>Pacientui išrašytų receptų nerasta</h3>),

            viewContent:'',
            allPrescription:null,
            contentType:'record',

            totalElements:'',

            activePage:1,
            itemsPerPage:8,
            listLength:'',
            listIsEmpty:false,

            infoDetails:null,
            infoHeader:"Recepto detali informacija",
            notActivePrescription:0
        }
    }


    componentWillMount = () =>{
        if(this.session === null || this.session.user.loggedIn !== true || this.session.user.userType !== 'druggist'){
            this.props.router.push('/vartotojams');
            return '';
        }  
        this.getPatientPrescriptions(this.state.activePage)       
    }

    getPatientPrescriptions = (activePage) =>{
        axios.get('http://localhost:8080/api/patient/'
        +this.props.params.patientId+'/prescription/druggist?page='
        +activePage+'&size='+this.state.itemsPerPage)
        .then((response)=>{
            if(response.data.content.length === 0){
                this.setState({
                    viewContent:this.state.info,
                    listIsEmpty:true
                })
            }else{
                this.setState({
                    viewContent:<PrescriptionListView prescription={response.data.content.map(this.composePrescription)}/>,
                    allPrescription:response.data.content,
                    totalElements:response.data.totalElements,
                    listLength:response.data.content.length,
                    listIsEmpty:false
                    })
            }
           
            console.log(response.status)
        })
        .catch((erorr) => {
            console.log(erorr)

        })
    }
    showDetails = (prescriptionId) =>{    
        if(document.getElementById('myModal').style.display === '' || document.getElementById('myModal').style.display === 'none'){
            document.getElementById('modalButton').click()
        }
        this.loadSpecificPrescription(prescriptionId)
    }

    composePrescription = (prescription, index) =>{
        // if(new Date(prescription.expirationDate) < new Date()){
        //     return null
        // }

        return(
            <PrescriptionListingItem 
                key={index}
                index={index}
                id={prescription.id}
                prescriptionDate={prescription.prescriptionDate}
                expirationDate={prescription.expirationDate}
                ingredientName={prescription.apiTitle}
                useAmount="NaN"
                showDetails={this.showDetails}
            />
        )
    }
    prescriptionUsageSubmit = (prescriptionId) =>{
        let currentDate = new Date();
        axios.post('http://localhost:8080/api/prescription/'+prescriptionId+'/new/usage',{
            usage:{
                usageDate:currentDate
            },
            userName:this.session.user.userName,
        })
        .then((response) => {
            this.setState({
                infoState:<div className="alert alert-success"><strong>{response.data}</strong></div>,
            })
            document.getElementById('modalButton').click()
            console.log(response.status)
        })
        .catch((erorr) =>{
            this.setState({
                infoState:<div className="alert alert-success"><strong>{erorr.response.data}</strong></div>,
            })
        })
    }


    loadSpecificPrescription = (prescriptionId) =>{
        axios.get('http://localhost:8080/api/prescription/'+prescriptionId)
        .then((response) => {
            this.setState({
                    infoDetails:this.composeSpecificPrescription(response.data, prescriptionId),
                })
            console.log(response.status)
        })
        .catch((erorr) =>{
            console.log(erorr)
        })
    }


    composeSpecificPrescription = (prescription, prescriptionId) => {
       
        return (<div>
                <p>Recepto išrašymo data: {prescription.prescriptionDate}</p>
                <p>Recepto galiojimo data: {prescription.expirationDate}</p>
                <p>Recepto panaudojimų skaičius: {prescription.useAmount}</p>
                <p>Vaisto aktyvioji medžiaga: {prescription.apiTitle}</p>
                <p>Aktyviosios medžiagos kiekis dozėje: {prescription.amount}</p>
                <p>Matavimo vienetai: {prescription.apiUnits}</p>
                <p>Vartojimo aprašymas: {prescription.description}</p>
                <button onClick={() => this.prescriptionUsageSubmit(prescriptionId) }className='btn btn-primary'>Pažymėti pirkimo faktą</button>
                
        </div>)
    }

    fielddHandler = (e) =>{
        this.setState({
            searchValue:e.target.value
        })
    }
    searchHandler = (e) =>{
        e.preventDefault()
       console.log("Searcrh search..."+ this.state.searchValue)
    }


    //handle paggination page changes 
    handlePageChange = (activePage) => {
    //by content type (record/prescription) send request for specific page
        this.getPatientPrescriptions(activePage);

        //change activePage state to new page number
        this.setState({
            activePage:activePage
        })  
    }

    //Show paggination div with props from state
    showPagination = () =>{
        if(this.state.listLength === this.state.totalElements || this.state.listIsEmpty){
            return ''
          }
        return (
            <div className="col-sm-5 col-sm-offset-4">
                <Pagination
                activePage={this.state.activePage}
                itemsCountPerPage={this.state.itemsPerPage}
                totalItemsCount={this.state.totalElements}
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
            <button onClick={() =>  this.props.router.goBack()} className="btn btn-primary"> Atgal </button>
            <p/>
                <div className="panel-group">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4>Klientas: {this.patientInfo.fullName}</h4>
                            <p>Gimimo data: {this.patientInfo.birthDate}</p>
                            <p>Asmens kodas: {this.patientInfo.id}</p>
                        </div>
                        <div className="panel-body">
                            <div className="col-sm-12">
                                {this.state.infoState}

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

const mapStateToProps = (state) =>{
    return{
        user:state.user
    }
}



export default connect(mapStateToProps)(DruggistViewContainer)

