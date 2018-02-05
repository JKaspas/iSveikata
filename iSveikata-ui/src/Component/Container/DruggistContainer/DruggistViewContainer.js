import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import Pagination from "react-js-pagination"


import PatientListingItem from '../AdminComponent/PatientListingItem'
import PatientListView from '../AdminComponent/PatientListView'
import SearchFieldForm from '../DoctorComponent/SearchFieldForm'
import { DruggistPrescriptionLink } from '../LinksAndButtons/DruggistPrescriptionLink';

class DruggistViewContainer extends Component{
    constructor(props){
        super(props)
        this.session = JSON.parse(sessionStorage.getItem('session'))
        this.state = {
            patients:null,
            searchValue:'',
            info:'',
            patientTypeName:'Visi pacientai',
            patientType:true,

            listBegin:0,
            listEnd:5,
            
            listInfo:'',

            activePage:1,
            itemsPerPage:8,
            listLength:'',
        }
    }


    componentWillMount = () =>{
        if(this.session === null || this.session.user.loggedIn !== true || this.session.user.userType !== 'druggist'){
            this.props.router.push('/vartotojams');
            return '';
        }  

        this.getAllPatient(this.state.activePage)
    }

    getAllPatient = (activePage) =>{
        axios.get('http://localhost:8080/api/patient/?page='+activePage+'&size='+this.state.itemsPerPage)
        .then((response)=>{
            this.setState({
                patients:response.data.content.map(this.composePatient),
                listInfo:response.data,
                listLength:response.data.content.length,
            })
            // this.setPatientAmount(this.state.patients,0, 20)

            if(response.data.length === 0){
                this.setState({
                    info:(<h3>Priskirtų pacientų nerasta</h3>)
                })
            }
                  
            console.log(response.data)
        })
        .catch((erorr) => {
            
            //console.log(erorr)
        })
    }


    composePatient = (patient, index) =>{
        

        return (
            <PatientListingItem
                key={index}
                patientId={patient.patientId}
                birthDate={patient.birthDate}
                firstName={patient.firstName}
                lastName={patient.lastName}

                druggistPrescriptionView={<td><DruggistPrescriptionLink patientId={patient.patientId}/></td>}
                  
                    
            />
        )
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
        //on page number change send request for new page of patient
        this.getAllPatient(activePage)
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
                            <button onClick={() =>  this.props.router.goBack()} className="btn btn-primary"> Atgal </button>
                            <h4>Pacientų sarašas</h4>
                        </div>
                        <div className="panel-body">
                            <div className="col-sm-12">
                                <SearchFieldForm 
                                    searchHandler={this.searchHandler}
                                    fielddHandler={this.fielddHandler}
                                    searchValue={this.state.searchValue}
                                />
                            </div>
                            
                            <div className="col-sm-12">
                                <PatientListView 
                                    patients={this.state.patients}
                                />
                                {this.showPagination()}                                
                                {this.state.info}
                                

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

