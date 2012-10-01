import React, {Component} from 'react'
import axios from 'axios'
import Pagination from "react-js-pagination"


import DoctorListView from '../AdminComponent/DoctorListView'
import DoctorListingItem from '../AdminComponent/DoctorListingItem'
import {DoctorBindLink} from '../../Container/LinksAndButtons/DoctorBindLink'
import SearchFieldForm from '../DoctorComponent/SearchFieldForm';


export default class AdminBindDoctorPartContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
            search:'',
            doctorList:'',
            listInfo:'',

            activePage:1,
            itemsPerPage:8,
            listLength:'',
            listIsEmpty:false,

            searchValue:''

        }
    }



    componentWillMount = () =>{

        var session =  JSON.parse(sessionStorage.getItem('session'))
        if(session === null || session.user.loggedIn !== true || session.user.userType !== 'admin'){
            this.props.router.push('/vartotojams');
            return '';
        }

        this.getAllDoctor(this.state.activePage)
       
    }

    getAllDoctor = (activeNumber) =>{
        axios.get('http://localhost:8080/api/doctor?page='+activeNumber+'&size='+this.state.itemsPerPage)
        .then((response)=>{
            if(response.data.content.length === 0){
                this.setState({
                    doctorList:(<h3>Sistemoje nesukurta nė viena gydytojo paskyra.</h3>),
                    listIsEmpty:true,
                })
            }else{
                this.setState({
                    doctorList:<DoctorListView doctors={response.data.content.map(this.composeDoctor)}/>,
                    listInfo:response.data,
                    listLength:response.data.content.length,
                    listIsEmpty:false,
                })
            }
            console.log(response.status)
        })
        .catch((erorr) => {
            console.log(erorr.response.data)
        })
    }
    getAllDoctorBySearchValue = (searchValue, activeNumber) =>{
        axios.get('http://localhost:8080/api/doctor/'+searchValue+'/search?page='+activeNumber+'&size='+this.state.itemsPerPage)
        .then((response)=>{
            if(response.data.content.length === 0){
                this.setState({
                    doctorList:(<h3>Tokio gydytojo nėra</h3>),
                    listIsEmpty:true,
                })
            }else{
                this.setState({
                    doctorList:<DoctorListView doctors={response.data.content.map(this.composeDoctor)}/>,
                    listInfo:response.data,
                    listLength:response.data.content.length,
                    listIsEmpty:false,
                })
            }
            console.log(response.status)
        })
        .catch((erorr) => {
            console.log(erorr.response.data)
        })
    }

    composeDoctor = (doctor, index) =>{
        return(
            <DoctorListingItem
                key={index}
                fullName={doctor.fullName}
                userName={doctor.userName}
                specialization={doctor.specialization}
                doctorBindLink={<DoctorBindLink userName={doctor.userName}/>}
            />)
    }
    
    
    fielddHandler = (e) =>{
        this.setState({
            searchValue:e.target.value
        })
    }
    
    searchdHandler = (e) =>{
        e.preventDefault();
        if(this.state.searchValue.length > 2){
            this.getAllDoctorBySearchValue(this.state.searchValue, 1)
        }else if(this.state.searchValue.length === 0){
            this.getAllDoctor(1)
        }else{
            this.setState({
                doctorList:(<h3>Įveskit bent 3 simbolius</h3>),
                listIsEmpty:true,
            })
        }
        this.setState({
            activePage:1
        })
    }

     //handle paggination page changes 
     handlePageChange = (activePage) => {
        if(this.state.searchValue.length > 2){
            //sen request for specific page when search value length more than 2
            this.getAllDoctorBySearchValue(this.state.searchValue, activePage)
        }else{
            //send request for specific page when there is not search value
            this.getAllDoctor(activePage);
        }
        
        //change activePage state to new page number
        this.setState({
            activePage:activePage
        })
      }

    //Show paggination div with props from state
    showPagination = () =>{
        if(this.state.listLength === this.state.listInfo.totalElements || this.state.listIsEmpty){
            return ''
        }
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


    
    render(){
        return(
        <div className="container">
            <section>  
                <div className="panel-group">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4>Priskirkite gydytojui pacientą</h4>
                        </div>
                        <div className="panel-body">
                            <div className="col-sm-12">
                            <h4 className="text-center" >Prašome įvesti bent 3 simbolius</h4>
                            <SearchFieldForm
                                    searchHandler={this.searchdHandler}
                                    fielddHandler={this.fielddHandler}
                                    searchValue={this.state.searchValue}
                                    searchPlaceHolder={"Gydytojų paieška"}
                                    searchType={"text"}
                                />
                            </div>
                            <div className="col-sm-12">
                                {this.state.doctorList}
                                {this.showPagination()}
                            </div>
                        </div> 
                    </div> 
                </div>           
            </section>
        </div>)
    }
}


