import React, {Component} from 'react'
import axios from 'axios'

import DoctorListView from '../AdminComponent/DoctorListView'
import DoctorListingItem from '../AdminComponent/DoctorListingItem'
import {DoctorBindLink} from '../../Container/LinksAndButtons/DoctorBindLink'
import SearchFieldForm from '../DoctorComponent/SearchFieldForm';


export default class AdminBindDoctorPartContainer extends Component{
    constructor(props){
        super(props);
        this.timeOut=''
        this.state = {
            search:'',
            doctorList:'',
            listInfo:'',

            activePage:0,
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

        this.getAllDoctor(this.state.searchValue, this.state.activePage)
       
    }

    getAllDoctor = (searchValue, activePage) =>{

        let allDoctorRequestLink = 'http://localhost:8080/api/doctor?page='+activePage+'&size='+this.state.itemsPerPage
        let searchDoctorrequestLink = 'http://localhost:8080/api/doctor/'+searchValue+'/search?page='+activePage+'&size='+this.state.itemsPerPage
        let finalRequestLink = allDoctorRequestLink;

        if(searchValue.length > 2){
           finalRequestLink = searchDoctorrequestLink
        }else if(searchValue.length === 0){
           finalRequestLink = allDoctorRequestLink
        }else{
            this.setState({
                doctorList:(<h3>Įveskit bent 3 simbolius</h3>),
                listIsEmpty:true,
            })
            return ''
        }
        axios.get(finalRequestLink)
        .then((response)=>{
            if(response.data.content.length === 0){
                if(activePage !== 0){
                    this.setState({
                        activePage:activePage - 1
                    })
                    if(this.state.searchValue > 2){
                        this.setState({
                           doctorList:(<h3>Gydytojų nerasta</h3>)
                        })
                    }
                    return ''
                }
                this.setState({
                    doctorList:(<h3>Gydytojų nerasta</h3>),
                    listIsEmpty:true,
                })
            }else{
                this.setState({
                    doctorList:<DoctorListView doctors={response.data.content.map(this.composeDoctor)}/>,
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
                doctorBindLink={<DoctorBindLink index={index} userName={doctor.userName}/>}
            />)
    }
    
    
    fielddHandler = (e) =>{
        this.setState({
            searchValue:e.target.value
        })
    }

    
    
    searchdHandler = (e) =>{
        
        e.preventDefault();

        clearTimeout(this.timeOut)

        this.timeOut = setTimeout(() =>{
            this.getAllDoctor(
                (this.state.searchValue.charAt(0).toUpperCase() + this.state.searchValue.slice(1)).trim(),
                0)
         } , 1000 )
        
        this.setState({
            activePage:1
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
        this.getAllDoctor(this.state.searchValue, activePage)
        
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
                    <button className="btn btn-default">{this.state.activePage + 1}</button>
                    <button className="btn btn-default" id="nextPage" onClick={() => this.handlePageChange(this.state.activePage + 1)}>⟩</button>
                </div>
             
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


